/// Role pengguna dalam sistem helpdesk.
/// Nilai sesuai dengan API: ADMIN, HELPDESK, USER
enum UserRole {
  admin,
  helpdesk,
  techsupport,
  user;

  static UserRole fromString(String? value) {
    switch (value?.toUpperCase()) {
      case 'ADMIN':
        return UserRole.admin;
      case 'HELPDESK':
        return UserRole.helpdesk;
      case 'TECHSUPPORT':
        return UserRole.techsupport;
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
      case UserRole.techsupport:
        return 'TECHSUPPORT';
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
      case UserRole.techsupport:
        return 'Technical Support';
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

  /// Apakah role ini adalah tech support
  bool get isTechSupport => this == UserRole.techsupport;
}
