/// Sistem border radius global untuk seluruh aplikasi.
/// Sudut sedikit rounded — teknis & clean, tidak berlebihan.
/// DILARANG hardcode BorderRadius di widget — gunakan AppRadius.*.
class AppRadius {
  AppRadius._();

  /// 4.0 — untuk elemen kecil (chip, badge, input kecil)
  static const double sm = 4.0;

  /// 8.0 — default untuk elemen medium (card, button, input)
  static const double md = 8.0;

  /// 12.0 — untuk elemen besar (bottom sheet, dialog)
  static const double lg = 12.0;
}
