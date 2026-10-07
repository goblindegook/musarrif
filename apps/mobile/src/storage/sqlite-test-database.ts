import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

interface TestSqliteDatabase {
  execAsync(sql: string): Promise<void>
  runAsync(sql: string, ...params: unknown[]): Promise<{ changes: number; lastInsertRowId: number }>
  getFirstAsync<T>(sql: string, ...params: unknown[]): Promise<T | null>
  getAllAsync<T>(sql: string, ...params: unknown[]): Promise<T[]>
  withExclusiveTransactionAsync<T>(task: (transaction: TestSqliteDatabase) => Promise<T>): Promise<T>
  closeAsync(): Promise<void>
}

export class RealSqliteTestDatabase implements TestSqliteDatabase {
  private database: DatabaseSync
  private failSqlFragment?: string

  constructor(readonly filename = ':memory:') {
    this.database = new DatabaseSync(filename)
  }

  failOnceWhenSqlContains(fragment: string): void {
    this.failSqlFragment = fragment
  }

  async execAsync(sql: string): Promise<void> {
    this.throwIfInjected(sql)
    this.database.exec(sql)
  }

  async runAsync(sql: string, ...params: unknown[]): Promise<{ changes: number; lastInsertRowId: number }> {
    this.throwIfInjected(`${sql} ${JSON.stringify(params)}`)
    const result = this.database.prepare(sql).run(...(params as never[]))
    return { changes: Number(result.changes), lastInsertRowId: Number(result.lastInsertRowid) }
  }

  async getFirstAsync<T>(sql: string, ...params: unknown[]): Promise<T | null> {
    const result = this.database.prepare(sql).get(...(params as never[]))
    return (result as T | undefined) ?? null
  }

  async getAllAsync<T>(sql: string, ...params: unknown[]): Promise<T[]> {
    return this.database.prepare(sql).all(...(params as never[])) as T[]
  }

  async withExclusiveTransactionAsync<T>(task: (transaction: TestSqliteDatabase) => Promise<T>): Promise<T> {
    this.database.exec('BEGIN EXCLUSIVE')
    try {
      const result = await task(this)
      this.database.exec('COMMIT')
      return result
    } catch (error) {
      this.database.exec('ROLLBACK')
      throw error
    }
  }

  async closeAsync(): Promise<void> {
    this.database.close()
  }

  private throwIfInjected(sql: string): void {
    if (this.failSqlFragment && sql.includes(this.failSqlFragment)) {
      const fragment = this.failSqlFragment
      this.failSqlFragment = undefined
      throw new Error(`Injected SQLite failure at: ${fragment}`)
    }
  }
}

export function createSqliteTestFile(): { filename: string; cleanup: () => void } {
  const directory = mkdtempSync(join(tmpdir(), 'musarrif-sqlite-'))
  return {
    filename: join(directory, 'user-data.sqlite'),
    cleanup: () => rmSync(directory, { recursive: true, force: true }),
  }
}
