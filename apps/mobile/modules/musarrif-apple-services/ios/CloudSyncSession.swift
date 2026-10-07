import CloudKit
import Foundation

struct CloudEntry: Sendable {
  let key: String
  let valueJSON: Data?
  let deleted: Bool
  let modifiedAtMillis: Int64
}

struct CloudAcknowledgement: Sendable {
  let key: String
  let modifiedAtMillis: Int64
}

struct CloudSendResult: Sendable {
  let acknowledged: [CloudAcknowledgement]
  let conflicts: [CloudEntry]
}

struct CloudAccountChange: Sendable {
  let accountStatus: String
  let accountIdentifier: String?
  let requiresConfirmation: Bool
}

enum CloudSyncFailure: Error {
  case notAuthenticated
  case accountChanged
}

actor CloudSyncSession: CKSyncEngineDelegate {
  private static let recordType = "MusarrifUserDataV1"
  private static let valueField = "valueJSON"

  private let container: CKContainer
  private let store = CloudSyncEngineStore()
  private let zoneID = CKRecordZone.ID(zoneName: "MusarrifUserData")
  private var engine: CKSyncEngine?
  private var onAccountChange: (@Sendable (CloudAccountChange) -> Void)?

  private var outgoing: [String: CloudEntry] = [:]
  private var fetched: [CloudEntry] = []
  private var acknowledged: [CloudAcknowledgement] = []
  private var conflicts: [CloudEntry] = []
  private var serverRecords: [String: CKRecord] = [:]

  init() {
    container = CKContainer(identifier: "iCloud.\(Bundle.main.bundleIdentifier ?? "com.musarrif.mobile")")
  }

  func setAccountChangeHandler(_ handler: @escaping @Sendable (CloudAccountChange) -> Void) {
    onAccountChange = handler
  }

  // MARK: Account

  func accountStatusName() async -> String {
    name(of: await currentAccountStatus())
  }

  func accountIdentity() async throws -> String? {
    guard await currentAccountStatus() == .available else { return nil }
    let recordName = try await container.userRecordID().recordName
    activate(recordName)
    return recordName
  }

  func confirmAccountSwitch(_ accountIdentifier: String) async throws {
    guard await currentAccountStatus() == .available else { throw CloudSyncFailure.notAuthenticated }
    let recordName = try await container.userRecordID().recordName
    guard recordName == accountIdentifier else {
      activate(recordName)
      throw CloudSyncFailure.accountChanged
    }
    store.confirmAccountSwitch()
  }

  // MARK: Sync

  func fetchChanges() async throws -> [CloudEntry] {
    let engine = try await readyEngine()
    fetched.removeAll()
    // A new engine still has to create the record zone before there is anything to fetch.
    if !engine.state.pendingDatabaseChanges.isEmpty { try await engine.sendChanges() }
    try await engine.fetchChanges()
    return fetched
  }

  func sendChanges(_ entries: [CloudEntry]) async throws -> CloudSendResult {
    let engine = try await readyEngine()
    acknowledged.removeAll()
    conflicts.removeAll()
    outgoing = entries.reduce(into: [:]) { $0[recordName(for: $1.key)] = $1 }
    engine.state.add(pendingRecordZoneChanges: entries.map { .saveRecord(recordID(for: $0.key)) })
    try await engine.sendChanges()
    return CloudSendResult(acknowledged: acknowledged, conflicts: conflicts)
  }

  private func readyEngine() async throws -> CKSyncEngine {
    guard await currentAccountStatus() == .available else { throw CloudSyncFailure.notAuthenticated }
    activate(try await container.userRecordID().recordName)
    if store.requiresAccountConfirmation() { throw CloudSyncFailure.accountChanged }
    if let engine { return engine }

    let saved = try store.load()
    var configuration = CKSyncEngine.Configuration(
      database: container.privateCloudDatabase,
      stateSerialization: saved,
      delegate: self
    )
    configuration.automaticallySync = false
    let engine = CKSyncEngine(configuration)
    if saved == nil { engine.state.add(pendingDatabaseChanges: [.saveZone(CKRecordZone(zoneID: zoneID))]) }
    self.engine = engine
    return engine
  }

  private func activate(_ recordName: String) {
    guard store.activateAccount(recordName) else { return }
    engine = nil
    serverRecords.removeAll()
    if store.requiresAccountConfirmation() {
      onAccountChange?(
        CloudAccountChange(accountStatus: "available", accountIdentifier: recordName, requiresConfirmation: true)
      )
    }
  }

  // MARK: CKSyncEngineDelegate

  func handleEvent(_ event: CKSyncEngine.Event, syncEngine: CKSyncEngine) async {
    switch event {
    case .stateUpdate(let update):
      try? store.save(update.stateSerialization)
    case .accountChange:
      let status = await currentAccountStatus()
      var identifier: String?
      if status == .available, let recordName = try? await container.userRecordID().recordName {
        identifier = recordName
        activate(recordName)
      }
      onAccountChange?(
        CloudAccountChange(
          accountStatus: name(of: status),
          accountIdentifier: identifier,
          requiresConfirmation: store.requiresAccountConfirmation()
        )
      )
    case .fetchedRecordZoneChanges(let changes):
      for modification in changes.modifications {
        serverRecords[modification.record.recordID.recordName] = modification.record
        if let entry = decode(modification.record) { fetched.append(entry) }
      }
    case .sentRecordZoneChanges(let changes):
      for record in changes.savedRecords {
        serverRecords[record.recordID.recordName] = record
        if let entry = decode(record) {
          acknowledged.append(CloudAcknowledgement(key: entry.key, modifiedAtMillis: entry.modifiedAtMillis))
        }
      }
      for failure in changes.failedRecordSaves {
        switch failure.error.code {
        case .serverRecordChanged:
          if let server = failure.error.serverRecord {
            serverRecords[server.recordID.recordName] = server
            if let entry = decode(server) { conflicts.append(entry) }
          }
        case .zoneNotFound:
          syncEngine.state.add(pendingDatabaseChanges: [.saveZone(CKRecordZone(zoneID: zoneID))])
          syncEngine.state.add(pendingRecordZoneChanges: [.saveRecord(failure.record.recordID)])
        default:
          break
        }
      }
    default:
      break
    }
  }

  func nextRecordZoneChangeBatch(
    _ context: CKSyncEngine.SendChangesContext,
    syncEngine: CKSyncEngine
  ) async -> CKSyncEngine.RecordZoneChangeBatch? {
    var records: [CKRecord.ID: CKRecord] = [:]
    var stale: [CKSyncEngine.PendingRecordZoneChange] = []
    var sendable: [CKSyncEngine.PendingRecordZoneChange] = []
    for change in syncEngine.state.pendingRecordZoneChanges where context.options.scope.contains(change) {
      guard case .saveRecord(let id) = change else { continue }
      // A change left over from an earlier session has no entry this time; the next sync queues what is still pending.
      if let entry = outgoing[id.recordName] {
        records[id] = encode(entry, id: id)
        sendable.append(change)
      } else {
        stale.append(change)
      }
    }
    if !stale.isEmpty { syncEngine.state.remove(pendingRecordZoneChanges: stale) }
    let ready = records
    return await CKSyncEngine.RecordZoneChangeBatch(pendingChanges: sendable) { ready[$0] }
  }

  // MARK: Records

  private func encode(_ entry: CloudEntry, id: CKRecord.ID) -> CKRecord {
    let record = serverRecords[id.recordName] ?? CKRecord(recordType: Self.recordType, recordID: id)
    record["key"] = entry.key as CKRecordValue
    record["deleted"] = NSNumber(value: entry.deleted)
    record["modifiedAtMillis"] = NSNumber(value: entry.modifiedAtMillis)
    record[Self.valueField] = entry.valueJSON.map { $0 as CKRecordValue }
    return record
  }

  private func decode(_ record: CKRecord) -> CloudEntry? {
    guard record.recordType == Self.recordType,
      let key = record["key"] as? String,
      let modifiedAtMillis = (record["modifiedAtMillis"] as? NSNumber)?.int64Value,
      let deleted = (record["deleted"] as? NSNumber)?.boolValue
    else { return nil }
    return CloudEntry(
      key: key,
      valueJSON: record[Self.valueField] as? Data,
      deleted: deleted,
      modifiedAtMillis: modifiedAtMillis
    )
  }

  private func recordID(for key: String) -> CKRecord.ID {
    CKRecord.ID(recordName: recordName(for: key), zoneID: zoneID)
  }

  private func recordName(for key: String) -> String {
    "mu_" + Data(key.utf8).base64EncodedString()
      .replacingOccurrences(of: "+", with: "-")
      .replacingOccurrences(of: "/", with: "_")
      .replacingOccurrences(of: "=", with: "")
  }

  // MARK: Account status

  private func currentAccountStatus() async -> CKAccountStatus {
    (try? await container.accountStatus()) ?? .couldNotDetermine
  }

  private func name(of status: CKAccountStatus) -> String {
    switch status {
    case .available: return "available"
    case .noAccount: return "noAccount"
    case .restricted: return "restricted"
    case .temporarilyUnavailable: return "temporarilyUnavailable"
    case .couldNotDetermine: return "couldNotDetermine"
    @unknown default: return "couldNotDetermine"
    }
  }
}
