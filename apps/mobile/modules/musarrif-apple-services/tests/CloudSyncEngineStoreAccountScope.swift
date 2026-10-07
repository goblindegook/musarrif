import Foundation

@main
enum CloudSyncEngineStoreAccountScopeTest {
  static func main() {
    let suiteName = "MusarrifCloudSyncAccountScopeTests.\(UUID().uuidString)"
    guard let defaults = UserDefaults(suiteName: suiteName) else {
      fatalError("Could not create isolated test defaults.")
    }
    let stateFile = FileManager.default.temporaryDirectory.appendingPathComponent("\(suiteName).json")
    defer {
      defaults.removePersistentDomain(forName: suiteName)
      try? FileManager.default.removeItem(at: stateFile)
    }

    let store = CloudSyncEngineStore(defaults: defaults, stateFile: stateFile)
    precondition(store.activateAccount("account-a"), "First account activation must establish a scope.")
    precondition(!store.requiresAccountConfirmation(), "The first account does not require a switch confirmation.")
    precondition(!store.activateAccount("account-a"), "The same account keeps its scope.")
    precondition(store.activateAccount("account-b"), "A different iCloud account must establish a new scope.")
    precondition(store.requiresAccountConfirmation(), "An account switch must block CloudKit until explicitly confirmed.")
    store.confirmAccountSwitch()
    precondition(!store.requiresAccountConfirmation(), "Explicit confirmation must release the account-switch barrier.")
  }
}
