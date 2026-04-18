/// Prioritas tiket helpdesk.
/// Nilai sesuai dengan API: LOW, MEDIUM, HIGH
enum TicketPriority {
  low,
  medium,
  high;

  static TicketPriority fromString(String? value) {
    switch (value?.toUpperCase()) {
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
    }
  }
}
