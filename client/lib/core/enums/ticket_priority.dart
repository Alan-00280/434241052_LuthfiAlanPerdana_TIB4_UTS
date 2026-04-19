/// Prioritas tiket helpdesk.
/// Nilai sesuai dengan API: LOW, MEDIUM, HIGH, CRITICAL
enum TicketPriority {
  low,
  medium,
  high,
  critical;

  static TicketPriority fromString(String? value) {
    switch (value?.toUpperCase()) {
      case 'CRITICAL':
        return TicketPriority.critical;
      case 'HIGH':
        return TicketPriority.high;
      case 'MEDIUM':
        return TicketPriority.medium;
      default:
        return TicketPriority.low;
    }
  }

  String get value {
    switch (this) {
      case TicketPriority.low:
        return 'LOW';
      case TicketPriority.medium:
        return 'MEDIUM';
      case TicketPriority.high:
        return 'HIGH';
      case TicketPriority.critical:
        return 'CRITICAL';
    }
  }

  String get displayName {
    switch (this) {
      case TicketPriority.low:
        return 'Low';
      case TicketPriority.medium:
        return 'Medium';
      case TicketPriority.high:
        return 'High';
      case TicketPriority.critical:
        return 'Critical';
    }
  }
}
