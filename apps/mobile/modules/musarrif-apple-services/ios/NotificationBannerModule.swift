import ExpoModulesCore
import UIKit

public final class NotificationBannerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MusarrifNotificationBanner")

    AsyncFunction("show") { (kind: String, message: String, color: String) async in
      await MainActor.run { BannerPresenter.shared.show(kind: kind, message: message, color: UIColor(hex: color)) }
    }
  }
}

@MainActor
private final class BannerPresenter {
  static let shared = BannerPresenter()

  private let displayDuration: TimeInterval = 4
  private lazy var stack: UIStackView = {
    let stack = UIStackView()
    stack.axis = .vertical
    stack.spacing = 8
    stack.translatesAutoresizingMaskIntoConstraints = false
    return stack
  }()

  func show(kind: String, message: String, color: UIColor) {
    guard let window = UIApplication.shared.connectedScenes
      .compactMap({ $0 as? UIWindowScene }).first?.keyWindow else { return }
    if stack.superview !== window {
      window.addSubview(stack)
      NSLayoutConstraint.activate([
        stack.topAnchor.constraint(equalTo: window.safeAreaLayoutGuide.topAnchor, constant: 8),
        stack.leadingAnchor.constraint(equalTo: window.leadingAnchor, constant: 16),
        stack.trailingAnchor.constraint(equalTo: window.trailingAnchor, constant: -16),
      ])
    }
    window.bringSubviewToFront(stack)

    let banner = makeBanner(kind: kind, message: message, color: color)
    let reduceMotion = UIAccessibility.isReduceMotionEnabled
    banner.alpha = 0
    banner.transform = reduceMotion ? .identity : CGAffineTransform(translationX: 0, y: -24)
    stack.addArrangedSubview(banner)
    UIAccessibility.post(notification: .announcement, argument: message)
    let appear = {
      banner.alpha = 1
      banner.transform = .identity
    }
    if reduceMotion {
      UIView.animate(withDuration: 0.2, animations: appear)
    } else {
      UIView.animate(withDuration: 0.45, delay: 0, usingSpringWithDamping: 0.82, initialSpringVelocity: 0.4, animations: appear)
    }
    DispatchQueue.main.asyncAfter(deadline: .now() + displayDuration) { [weak self, weak banner] in
      guard let banner else { return }
      self?.dismiss(banner)
    }
  }

  private func dismiss(_ banner: UIView) {
    guard banner.superview != nil else { return }
    let reduceMotion = UIAccessibility.isReduceMotionEnabled
    UIView.animate(withDuration: 0.25, animations: {
      banner.alpha = 0
      if !reduceMotion { banner.transform = CGAffineTransform(translationX: 0, y: -16) }
    }) { _ in
      banner.removeFromSuperview()
    }
  }

  private func makeBanner(kind: String, message: String, color: UIColor) -> UIView {
    let symbol =
      switch kind {
      case "success": "lock.open.fill"
      case "warning": "arrow.down.circle.fill"
      default: "flame.fill"
      }

    let icon = UIImageView(image: UIImage(systemName: symbol))
    icon.tintColor = color
    icon.setContentHuggingPriority(.required, for: .horizontal)
    icon.preferredSymbolConfiguration = UIImage.SymbolConfiguration(textStyle: .title3)

    let label = UILabel()
    label.text = message
    label.numberOfLines = 0
    label.font = UIFont.preferredFont(forTextStyle: .subheadline).withWeight(.semibold)
    label.adjustsFontForContentSizeCategory = true
    label.textColor = .label

    let row = UIStackView(arrangedSubviews: [icon, label])
    row.axis = .horizontal
    row.alignment = .center
    row.spacing = 12
    row.isLayoutMarginsRelativeArrangement = true
    row.layoutMargins = UIEdgeInsets(top: 14, left: 18, bottom: 14, right: 18)
    row.translatesAutoresizingMaskIntoConstraints = false

    let background = UIVisualEffectView(effect: UIGlassEffect())
    background.cornerConfiguration = .capsule()
    background.contentView.addSubview(row)
    NSLayoutConstraint.activate([
      row.topAnchor.constraint(equalTo: background.contentView.topAnchor),
      row.bottomAnchor.constraint(equalTo: background.contentView.bottomAnchor),
      row.leadingAnchor.constraint(equalTo: background.contentView.leadingAnchor),
      row.trailingAnchor.constraint(equalTo: background.contentView.trailingAnchor),
    ])
    background.isAccessibilityElement = true
    background.accessibilityLabel = message
    background.addGestureRecognizer(BannerTap { [weak self, weak background] in
      if let background { self?.dismiss(background) }
    })
    return background
  }
}

private final class BannerTap: UITapGestureRecognizer {
  private let handler: () -> Void

  init(handler: @escaping () -> Void) {
    self.handler = handler
    super.init(target: nil, action: nil)
    addTarget(self, action: #selector(fire))
  }

  @objc private func fire() { handler() }
}

private extension UIColor {
  /// Parses `#rrggbb`; the app's theme tokens are the single source of these colours.
  convenience init(hex: String) {
    let digits = hex.hasPrefix("#") ? String(hex.dropFirst()) : hex
    let value = UInt32(digits, radix: 16) ?? 0
    self.init(
      red: CGFloat((value >> 16) & 0xff) / 255,
      green: CGFloat((value >> 8) & 0xff) / 255,
      blue: CGFloat(value & 0xff) / 255,
      alpha: 1
    )
  }
}

private extension UIFont {
  func withWeight(_ weight: UIFont.Weight) -> UIFont {
    UIFont.systemFont(ofSize: pointSize, weight: weight)
  }
}
