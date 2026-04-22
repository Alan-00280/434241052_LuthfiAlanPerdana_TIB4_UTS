import 'package:helpdesk_ticketing/core/enums/notification_type.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/features/notification/domain/entities/notification_entity.dart';

class NotificationModel extends NotificationEntity {
  NotificationModel({
    required super.id,
    required super.userId,
    required super.ticketId,
    required super.type,
    required super.title,
    required super.body,
    required super.isRead,
    super.readAt,
    required super.createdAt,
    super.ticket,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      id: json['id'] as String,
      userId: json['userId'] as String,
      ticketId: json['ticketId'] as String,
      type: NotificationTypeExtension.fromString(json['type'] as String),
      title: json['title'] as String,
      body: json['body'] as String,
      isRead: json['isRead'] as bool? ?? false,
      readAt: json['readAt'] != null ? DateTime.parse(json['readAt'] as String).toLocal() : null,
      createdAt: DateTime.parse(json['createdAt'] as String).toLocal(),
      ticket: json['ticket'] != null
          ? SimplifiedTicketModel.fromJson(json['ticket'] as Map<String, dynamic>)
          : null,
    );
  }
}

class SimplifiedTicketModel extends SimplifiedTicketEntity {
  SimplifiedTicketModel({
    required super.id,
    required super.title,
    required super.status,
  });

  factory SimplifiedTicketModel.fromJson(Map<String, dynamic> json) {
    return SimplifiedTicketModel(
      id: json['id'] as String,
      title: json['title'] as String,
      status: TicketStatus.fromString(json['status'] as String),
    );
  }
}
