import 'package:flutter/material.dart';
import 'app_colors.dart';

/// Typography global untuk seluruh aplikasi.
/// Clean & teknis — tidak dekoratif.
/// Semua TextStyle HARUS dari sini.
class AppTextStyles {
  AppTextStyles._();

  /// Judul besar — halaman utama / hero text
  static const TextStyle headline = TextStyle(
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: AppColors.black,
    letterSpacing: -0.5,
  );

  /// Title — section header / app bar
  static const TextStyle title = TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: AppColors.black,
    letterSpacing: 0,
  );

  /// Body — konten utama
  static const TextStyle body = TextStyle(
    fontSize: 14,
    fontWeight: FontWeight.normal,
    color: AppColors.grey700,
    letterSpacing: 0.1,
  );

  /// Caption — label kecil, metadata, timestamp
  static const TextStyle caption = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.normal,
    color: AppColors.grey500,
    letterSpacing: 0.2,
  );

  /// Label — badge, chip, tombol kecil
  static const TextStyle label = TextStyle(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    color: AppColors.grey700,
    letterSpacing: 0.5,
  );
}
