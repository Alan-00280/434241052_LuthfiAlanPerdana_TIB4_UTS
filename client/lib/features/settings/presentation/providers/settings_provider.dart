import 'package:flutter/material.dart';
import 'package:flutter_riverpod/legacy.dart';

/// Provider untuk mengelola Tema Aplikasi (Light, Dark, System)
final themeModeProvider = StateProvider<ThemeMode>((ref) {
  return ThemeMode.system;
});


/// Provider untuk mengelola Pilihan Bahasa Aplikasi (Bahasa Indonesia atau English)
final languageProvider = StateProvider<String>((ref) {
  return 'id'; // Default: Bahasa Indonesia
});

/// Provider untuk mengaktifkan atau menonaktifkan Notifikasi Aplikasi
final notificationsEnabledProvider = StateProvider<bool>((ref) {
  return true; // Default: Aktif
});
