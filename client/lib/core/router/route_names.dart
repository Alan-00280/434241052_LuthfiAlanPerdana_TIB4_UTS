/// Konstanta nama dan path route untuk seluruh aplikasi.
/// Gunakan selalu konstanta ini — DILARANG hardcode string path di widget.
class AppRoutes {
  AppRoutes._();

  // ─── Paths ──────────────────────────────────────────────────────────────
  static const String login = '/login';
  static const String dashboard = '/dashboard';
  static const String tickets = '/tickets';
  static const String ticketDetail = '/tickets/:id';
  static const String createTicket = '/create-ticket';
  static const String assignTicket = '/assign-ticket/:id';
  static const String profile = '/profile';
  static const String resetPassword = '/reset-password';
  static const String userManagement = '/user-management';
  static const String addUser = '/user-management/add';
  static const String notifications = '/notifications';
  static const String settings = '/settings';
  static const String notFound = '/404';

  // ─── Named Routes ────────────────────────────────────────────────────────
  static const String loginName = 'login';
  static const String dashboardName = 'dashboard';
  static const String ticketsName = 'tickets';
  static const String ticketDetailName = 'ticket-detail';
  static const String createTicketName = 'create-ticket';
  static const String assignTicketName = 'assign-ticket';
  static const String profileName = 'profile';
  static const String resetPasswordName = 'reset-password';
  static const String userManagementName = 'user-management';
  static const String addUserName = 'add-user';
  static const String notificationsName = 'notifications';
  static const String settingsName = 'settings';
  static const String notFoundName = 'not-found';

  // ─── Parameter Keys ──────────────────────────────────────────────────────
  static const String paramId = 'id';

  // ─── Path Builders ───────────────────────────────────────────────────────
  static String ticketDetailPath(String id) => '/tickets/$id';
  static String assignTicketPath(String id) => '/assign-ticket/$id';
}
