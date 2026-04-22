import 'package:helpdesk_ticketing/features/notification/domain/entities/notification_entity.dart';

abstract class NotificationRepository {
  /// GET /api/notifications
  Future<({List<NotificationEntity> notifications, int unreadCount})> getNotifications({
    required String userId,
    bool? unread,
  });

  /// PATCH /api/notifications/:id/read
  Future<NotificationEntity> markAsRead(String id);

  /// PATCH /api/notifications/read-all
  Future<void> markAllAsRead(String userId);
}
