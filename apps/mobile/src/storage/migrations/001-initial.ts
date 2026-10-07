const DATA_TABLES = ['settings', 'favorites', 'srs_cards', 'exercise_dates', 'adaptive_dimensions', 'local_state']

export const INITIAL_SCHEMA_STATEMENTS = [
  ...DATA_TABLES.map((table) => `CREATE TABLE ${table} (key TEXT PRIMARY KEY NOT NULL, value_json TEXT NOT NULL)`),
  `CREATE TABLE entry_clock (
  key TEXT PRIMARY KEY NOT NULL,
  modified_at INTEGER NOT NULL,
  deleted INTEGER NOT NULL CHECK (deleted IN (0, 1)),
  dirty INTEGER NOT NULL CHECK (dirty IN (0, 1))
)`,
]
