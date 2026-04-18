import 'package:flutter/material.dart';
import 'app_colors.dart';

/// Standar ukuran dan warna icon di seluruh aplikasi.
/// Icon lebih dominan dibanding text — sesuai design rules.
class AppIcon {
  AppIcon._();

  // ─── Sizes ──────────────────────────────────────────────────────────────
  /// 16.0 — icon kecil (inline, label)
  static const double sizeSmall = 16.0;

  /// 24.0 — ukuran default
  static const double sizeMedium = 24.0;

  /// 32.0 — icon besar (empty state, header)
  static const double sizeLarge = 32.0;

  // ─── Colors ─────────────────────────────────────────────────────────────
  /// Warna icon utama — Amber brand color
  static const Color colorPrimary = AppColors.primary;

  /// Warna icon secondary — untuk navigasi / action sekunder
  static const Color colorSecondary = AppColors.grey700;

  /// Warna icon disabled
  static const Color colorDisabled = AppColors.grey300;
}
