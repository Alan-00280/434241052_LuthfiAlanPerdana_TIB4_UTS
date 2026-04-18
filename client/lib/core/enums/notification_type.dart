/// Tipe notifikasi dari API
enum NotificationType {
  ticketCreated,
  ticketAssigned,
  ticketStatusChanged,
  commentAdded,
  other;

  static NotificationType fromString(String? value) {
    switch (value?.toUpperCase()) {
      case 'TICKET_CREATED':
        return NotificationType.ticketCreated;
      case 'TICKET_ASSIGNED':
        return NotificationType.ticketAssigned;
      case 'TICKET_STATUS_CHANGED':
        return NotificationType.ticketStatusChanged;
      case 'COMMENT_ADDED':
        return NotificationType.commentAdded;
      default:
        return NotificationType.other;
    }
  }
}
