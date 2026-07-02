/// Status tiket helpdesk.
/// Nilai sesuai dengan API: OPEN, IN_PROGRESS, PENDING, RESOLVED, CLOSED
enum TicketStatus {
  open,
  assigned,
  inProgress,
  pending,
  resolved,
  closed;

  static TicketStatus fromString(String? value) {
    switch (value?.toUpperCase()) {
      case 'ASSIGNED':
        return TicketStatus.assigned;
      case 'IN_PROGRESS':
        return TicketStatus.inProgress;
      case 'PENDING':
        return TicketStatus.pending;
      case 'RESOLVED':
        return TicketStatus.resolved;
      case 'CLOSED':
        return TicketStatus.closed;
      default:
        return TicketStatus.open;
    }
  }

  /// Nilai string yang dikirim ke API
  String get value {
    switch (this) {
      case TicketStatus.open:
        return 'OPEN';
      case TicketStatus.assigned:
        return 'ASSIGNED';
      case TicketStatus.inProgress:
        return 'IN_PROGRESS';
      case TicketStatus.pending:
        return 'PENDING';
      case TicketStatus.resolved:
        return 'RESOLVED';
      case TicketStatus.closed:
        return 'CLOSED';
    }
  }

  String get displayName {
    switch (this) {
      case TicketStatus.open:
        return 'Open';
      case TicketStatus.assigned:
        return 'Assigned';
      case TicketStatus.inProgress:
        return 'In Progress';
      case TicketStatus.pending:
        return 'Pending';
      case TicketStatus.resolved:
        return 'Resolved';
      case TicketStatus.closed:
        return 'Closed';
    }
  }
}
