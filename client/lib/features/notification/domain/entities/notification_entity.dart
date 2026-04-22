import 'package:helpdesk_ticketing/core/enums/notification_type.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';

class NotificationEntity {
  final String id;
  final String userId;
  final String ticketId;
  final NotificationType type;
  final String title;
  final String body;
  final bool isRead;
  final DateTime? readAt;
  final DateTime createdAt;
  final SimplifiedTicketEntity? ticket;

  NotificationEntity({
    required this.id,
    required this.userId,
    required this.ticketId,
    required this.type,
    required this.title,
    required this.body,
    required this.isRead,
    this.readAt,
    required this.createdAt,
    this.ticket,
  });
}

class SimplifiedTicketEntity {
  final String id;
  final String title;
  final TicketStatus status;

  SimplifiedTicketEntity({
    required this.id,
    required this.title,
    required this.status,
  });
}
