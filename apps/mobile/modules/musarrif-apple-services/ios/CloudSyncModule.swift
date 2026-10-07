import ExpoModulesCore
import Foundation

public final class CloudSyncModule: Module {
  private let session = CloudSyncSession()

  public func definition() -> ModuleDefinition {
    Name("MusarrifAppleServices")
    Events("onSyncEvent")

    OnCreate {
      Task {
        await self.session.setAccountChangeHandler { [weak self] change in
          var event: [String: Any] = [
            "type": "accountChange",
            "accountStatus": change.accountStatus,
            "requiresConfirmation": change.requiresConfirmation,
          ]
          if let identifier = change.accountIdentifier { event["accountIdentifier"] = identifier }
          self?.sendEvent("onSyncEvent", event)
        }
      }
    }

    AsyncFunction("accountStatus") { () async -> String in
      await self.session.accountStatusName()
    }

    AsyncFunction("accountIdentity") { () async throws -> String? in
      try await self.mapFailures { try await self.session.accountIdentity() }
    }

    AsyncFunction("confirmAccountSwitch") { (accountIdentifier: String) async throws in
      try await self.mapFailures { try await self.session.confirmAccountSwitch(accountIdentifier) }
    }

    AsyncFunction("fetchChanges") { () async throws -> [[String: Any]] in
      try await self.mapFailures { try await self.session.fetchChanges() }.map(Self.dictionary)
    }

    AsyncFunction("sendChanges") { (records: [[String: Any]]) async throws -> [String: Any] in
      let result = try await self.mapFailures { try await self.session.sendChanges(records.compactMap(Self.entry)) }
      return [
        "acknowledged": result.acknowledged.map { ["key": $0.key, "modifiedAtMillis": $0.modifiedAtMillis] },
        "conflicts": result.conflicts.map(Self.dictionary),
      ]
    }
  }

  /// The only failure JS tells apart is an account change that needs the user's confirmation.
  private func mapFailures<T>(_ work: () async throws -> T) async throws -> T {
    do {
      return try await work()
    } catch CloudSyncFailure.accountChanged {
      throw Exception(
        name: "CloudAccountChanged",
        description: "Confirm this iCloud account change before syncing local data.",
        code: "ERR_CLOUD_ACCOUNT_CHANGED"
      )
    }
  }

  private static func entry(_ record: [String: Any]) -> CloudEntry? {
    guard let key = record["key"] as? String,
      let modifiedAtMillis = (record["modifiedAtMillis"] as? NSNumber)?.int64Value
    else { return nil }
    var valueJSON: Data?
    if let value = record["value"], !(value is NSNull) {
      valueJSON = try? JSONSerialization.data(withJSONObject: value, options: [.fragmentsAllowed, .sortedKeys])
    }
    return CloudEntry(
      key: key,
      valueJSON: valueJSON,
      deleted: (record["deleted"] as? NSNumber)?.boolValue ?? false,
      modifiedAtMillis: modifiedAtMillis
    )
  }

  private static func dictionary(_ entry: CloudEntry) -> [String: Any] {
    var result: [String: Any] = [
      "key": entry.key,
      "deleted": entry.deleted,
      "modifiedAtMillis": entry.modifiedAtMillis,
    ]
    if let data = entry.valueJSON,
      let value = try? JSONSerialization.jsonObject(with: data, options: [.fragmentsAllowed])
    {
      result["value"] = value
    }
    return result
  }
}
