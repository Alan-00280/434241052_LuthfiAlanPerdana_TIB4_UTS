/// Role pengguna dalam sistem helpdesk.
/// Nilai sesuai dengan API: ADMIN, HELPDESK, USER
enum UserRole {
  admin,
  helpdesk,
  user;

  static UserRole fromString(String? value) {
    switch (value?.toUpperCase()) {
      case 'ADMIN':
        return UserRole.admin;
      case 'HELPDESK':
        return UserRole.helpdesk;
      default:
        return UserRole.user;
    }
  }

  String get value {
    switch (this) {
      case UserRole.admin:
        return 'ADMIN';
      case UserRole.helpdesk:
        return 'HELPDESK';
      case UserRole.user:
        return 'USER';
    }
  }

  String get displayName {
    switch (this) {
      case UserRole.admin:
        return 'System Admin';
      case UserRole.helpdesk:
        return 'Helpdesk Officer';
      case UserRole.user:
        return 'User';
    }
  }

  /// Apakah role ini memiliki hak (ADMIN atau HELPDESK)
  bool get isAdmin =>
      this == UserRole.admin || this == UserRole.helpdesk;

  /// Apakah role ini memiliki hak (ADMIN)
  bool get isTrueAdmin =>
      this == UserRole.admin;

  /// Apakah role ini adalah user biasa
  bool get isUser => this == UserRole.user;
}
