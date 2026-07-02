import 'package:flutter/material.dart';

/// Sistem warna global untuk seluruh aplikasi.
/// Semua warna HARUS diambil dari sini — dilarang hardcode di widget.
class AppColors {
  AppColors._();

  // ─── Primary (Amber / Gold) ─────────────────────────────────────────────
  /// Brand color utama — Amber/Gold
  static const Color primary = Color(0xFFFFC107);

  /// Varian primary lebih terang
  static const Color primaryLight = Color(0xFFFFD54F);

  /// Varian primary lebih gelap
  static const Color primaryDark = Color(0xFFFFA000);

  // ─── Dark Mode Colors ───────────────────────────────────────────────────
  static const Color darkPrimary = Color(0xFFFFCA28);
  static const Color darkPrimaryLight = Color(0xFFFFE082);
  static const Color darkBackground = Color(0xFF121212);
  static const Color darkOnSurface = Color(0xFFE1E1E1);
  static const Color darkSurface = Color(0xFF1E1E1E);

  // ─── Neutral ────────────────────────────────────────────────────────────
  static const Color white = Color(0xFFFFFFFF);
  static const Color black = Color(0xFF000000);

  /// Digunakan untuk background ringan
  static const Color grey100 = Color(0xFFF5F5F5);

  /// Digunakan untuk border / divider
  static const Color grey300 = Color(0xFFE0E0E0);

  /// Digunakan untuk secondary text
  static const Color grey500 = Color(0xFF9E9E9E);

  /// Digunakan untuk primary text
  static const Color grey700 = Color(0xFF616161);

  // ─── Status ─────────────────────────────────────────────────────────────
  /// Open → Biru
  static const Color info = Color(0xFF2196F3);

  /// In Progress → Orange
  static const Color warning = Color(0xFFFF9800);

  /// Resolved → Hijau
  static const Color success = Color(0xFF4CAF50);

  /// Closed / Error → Merah
  static const Color error = Color(0xFFF44336);

  // ─── Background ─────────────────────────────────────────────────────────
  /// Background utama halaman
  static const Color background = Color(0xFFF5F5F5);

  /// Warna surface / card
  static const Color surface = Color(0xFFFFFFFF);
}

// ─── Status Color Mapping ──────────────────────────────────────────────────
/// Kembalikan warna yang sesuai berdasarkan status tiket.
/// Digunakan di seluruh app — jangan definisikan ulang di luar theme.
Color getStatusColor(String status) {
  switch (status.toLowerCase()) {
    case 'open':
      return AppColors.info;
    case 'assigned':
      return Colors.indigo;
    case 'in progress':
      return AppColors.warning;
    case 'resolved':
      return AppColors.success;
    case 'closed':
      return AppColors.error;
    default:
      return AppColors.grey500;
  }
}
