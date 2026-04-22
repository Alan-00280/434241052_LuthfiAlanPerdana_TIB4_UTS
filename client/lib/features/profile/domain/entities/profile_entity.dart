import 'package:helpdesk_ticketing/core/enums/user_role.dart';

class ProfileEntity {
  final String id;
  final String username;
  final String email;
  final String fullName;
  final UserRole role;
  final String? phone;
  final String? avatarUrl;
  final bool isActive;
  final DateTime createdAt;
  final DateTime? lastLoginAt;

  const ProfileEntity({
    required this.id,
    required this.username,
    required this.email,
    required this.fullName,
    required this.role,
    this.phone,
    this.avatarUrl,
    required this.isActive,
    required this.createdAt,
    this.lastLoginAt,
  });
}
