import 'package:helpdesk_ticketing/core/enums/user_role.dart';

/// Entitas pengguna yang sudah terautentikasi.
/// Field sesuai dengan response API: /api/users
class UserEntity {
  final String id;
  final String username;
  final String email;
  final String fullName;
  final UserRole role;
  final String? phone;
  final String? avatarUrl;
  final bool isActive;

  const UserEntity({
    required this.id,
    required this.username,
    required this.email,
    required this.fullName,
    required this.role,
    this.phone,
    this.avatarUrl,
    this.isActive = true,
  });

  /// Apakah pengguna memiliki hak admin (ADMIN atau HELPDESK)
  bool get isAdmin => role.isAdmin;

  /// Apakah pengguna adalah user biasa
  bool get isUser => role.isUser;

  /// Apakah pengguna adalah tech support
  bool get isTechSupport => role.isTechSupport;

  /// Nama tampilan — gunakan fullName, fallback ke username
  String get displayName => fullName.isNotEmpty ? fullName : username;
}
