import AudioToolbox
import ExpoModulesCore

public final class KeyClickModule: Module {
  private static let keyboardClickSound: SystemSoundID = 1104

  public func definition() -> ModuleDefinition {
    Name("MusarrifKeyClick")

    Function("play") {
      AudioServicesPlaySystemSound(Self.keyboardClickSound)
    }
  }
}
