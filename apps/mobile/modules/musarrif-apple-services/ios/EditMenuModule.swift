import ExpoModulesCore
import SwiftUI
import Translation
import UIKit

public final class EditMenuModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MusarrifEditMenu")

    AsyncFunction("present") { (x: Double, y: Double, titles: [String]) async -> Int? in
      await EditMenuPresenter.shared.present(at: CGPoint(x: x, y: y), titles: titles)
    }

    AsyncFunction("lookUp") { (term: String) in
      await MainActor.run { SystemSheets.lookUp(term) }
    }

    AsyncFunction("translate") { (text: String) in
      await MainActor.run { SystemSheets.translate(text) }
    }
  }
}

@MainActor
private enum SystemSheets {
  static func topViewController() -> UIViewController? {
    let scene = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first
    var top = scene?.keyWindow?.rootViewController
    while let presented = top?.presentedViewController { top = presented }
    return top
  }

  static func lookUp(_ term: String) {
    topViewController()?.present(UIReferenceLibraryViewController(term: term), animated: true)
  }

  static func translate(_ text: String) {
    guard let top = topViewController() else { return }
    let host = UIHostingController(rootView: TranslationHost(text: text, dismiss: { [weak top] in
      top?.dismiss(animated: false)
    }))
    host.view.backgroundColor = .clear
    host.modalPresentationStyle = .overFullScreen
    top.present(host, animated: false)
  }
}

private struct TranslationHost: View {
  let text: String
  let dismiss: () -> Void
  @State private var isPresented = true

  var body: some View {
    Color.clear
      .translationPresentation(isPresented: $isPresented, text: text)
      .onChange(of: isPresented) { _, presented in
        if !presented { dismiss() }
      }
  }
}

@MainActor
private final class EditMenuPresenter: NSObject, UIEditMenuInteractionDelegate {
  static let shared = EditMenuPresenter()

  private var interaction: UIEditMenuInteraction?
  private weak var host: UIView?
  private var titles: [String] = []
  private var continuation: CheckedContinuation<Int?, Never>?

  func present(at point: CGPoint, titles: [String]) async -> Int? {
    finish(nil)
    guard let host = SystemSheets.topViewController()?.view else { return nil }
    self.titles = titles
    let interaction = UIEditMenuInteraction(delegate: self)
    host.addInteraction(interaction)
    self.interaction = interaction
    self.host = host
    return await withCheckedContinuation { continuation in
      self.continuation = continuation
      let configuration = UIEditMenuConfiguration(identifier: nil, sourcePoint: host.convert(point, from: nil))
      configuration.preferredArrowDirection = .down
      interaction.presentEditMenu(with: configuration)
    }
  }

  func editMenuInteraction(
    _ interaction: UIEditMenuInteraction,
    menuFor configuration: UIEditMenuConfiguration,
    suggestedActions: [UIMenuElement]
  ) -> UIMenu? {
    UIMenu(
      options: .displayInline,
      children: titles.enumerated().map { index, title in
        UIAction(title: title) { [weak self] _ in self?.finish(index) }
      })
  }

  func editMenuInteraction(
    _ interaction: UIEditMenuInteraction,
    willDismissMenuFor configuration: UIEditMenuConfiguration,
    animator: any UIEditMenuInteractionAnimating
  ) {
    animator.addCompletion { [weak self] in self?.finish(nil) }
  }

  private func finish(_ index: Int?) {
    continuation?.resume(returning: index)
    continuation = nil
    if let interaction { host?.removeInteraction(interaction) }
    interaction = nil
  }
}
