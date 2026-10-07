import CloudKit
import Foundation

final class CloudSyncEngineStore {
  private let defaults: UserDefaults
  private let stateFile: URL
  private let accountKey: String
  private let accountChangePendingKey: String

  init(
    defaults: UserDefaults = .standard,
    stateFile: URL = CloudSyncEngineStore.defaultStateFile,
    accountKey: String = "musarrif.cloudSync.accountRecordName.v2",
    accountChangePendingKey: String = "musarrif.cloudSync.accountChangePending.v2"
  ) {
    self.defaults = defaults
    self.stateFile = stateFile
    self.accountKey = accountKey
    self.accountChangePendingKey = accountChangePendingKey
  }

  static var defaultStateFile: URL {
    let directory = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
    try? FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
    return directory.appendingPathComponent("musarrif-cloud-sync-state.json")
  }

  func load() throws -> CKSyncEngine.State.Serialization? {
    guard let data = try? Data(contentsOf: stateFile) else { return nil }
    return try JSONDecoder().decode(CKSyncEngine.State.Serialization.self, from: data)
  }

  func save(_ serialization: CKSyncEngine.State.Serialization) throws {
    try JSONEncoder().encode(serialization).write(to: stateFile, options: .atomic)
  }

  func clearEngineState() {
    try? FileManager.default.removeItem(at: stateFile)
  }

  /// Clears the engine state whenever the iCloud identity changes; a returning device has to confirm the new account.
  @discardableResult
  func activateAccount(_ recordName: String) -> Bool {
    let previousAccount = defaults.string(forKey: accountKey)
    guard previousAccount != recordName else { return false }
    clearEngineState()
    defaults.set(previousAccount != nil, forKey: accountChangePendingKey)
    defaults.set(recordName, forKey: accountKey)
    return true
  }

  func requiresAccountConfirmation() -> Bool {
    defaults.bool(forKey: accountChangePendingKey)
  }

  func confirmAccountSwitch() {
    defaults.set(false, forKey: accountChangePendingKey)
  }
}
