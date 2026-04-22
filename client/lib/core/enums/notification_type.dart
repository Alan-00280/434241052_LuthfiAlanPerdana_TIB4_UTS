enum NotificationType {
  ticketCreated,
  ticketAssigned,
  ticketStatusUpdated,
  ticketCommentAdded,
  ticketResolved,
  ticketClosed,
}

extension NotificationTypeExtension on NotificationType {
  String get value {
    switch (this) {
      case NotificationType.ticketCreated:
        return 'TICKET_CREATED';
      case NotificationType.ticketAssigned:
        return 'TICKET_ASSIGNED';
      case NotificationType.ticketStatusUpdated:
        return 'TICKET_STATUS_UPDATED';
      case NotificationType.ticketCommentAdded:
        return 'TICKET_COMMENT_ADDED';
      case NotificationType.ticketResolved:
        return 'TICKET_RESOLVED';
      case NotificationType.ticketClosed:
        return 'TICKET_CLOSED';
    }
  }

  static NotificationType fromString(String val) {
    switch (val) {
      case 'TICKET_CREATED':
        return NotificationType.ticketCreated;
      case 'TICKET_ASSIGNED':
        return NotificationType.ticketAssigned;
      case 'TICKET_STATUS_UPDATED':
        return NotificationType.ticketStatusUpdated;
      case 'TICKET_COMMENT_ADDED':
        return NotificationType.ticketCommentAdded;
      case 'TICKET_RESOLVED':
        return NotificationType.ticketResolved;
      case 'TICKET_CLOSED':
        return NotificationType.ticketClosed;
      default:
        return NotificationType.ticketCreated;
    }
  }
}
