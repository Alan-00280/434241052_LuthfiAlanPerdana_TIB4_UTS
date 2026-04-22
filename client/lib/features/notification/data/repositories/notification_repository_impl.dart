import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/notification/data/models/notification_model.dart';
import 'package:helpdesk_ticketing/features/notification/domain/entities/notification_entity.dart';
import 'package:helpdesk_ticketing/features/notification/domain/repositories/notification_repository_contract.dart';

class NotificationRepositoryImpl implements NotificationRepository {
  @override
  Future<({List<NotificationEntity> notifications, int unreadCount})> getNotifications({
    required String userId,
    bool? unread,
  }) async {
    final query = <String, String>{
      'userId': userId,
      if (unread != null) 'unread': unread.toString(),
    };

    final response =
        await ApiClient.instance.get('/api/notifications', query: query);

    final List<NotificationEntity> notificationsList =
        (response['notifications'] as List?)
                ?.map((e) =>
                    NotificationModel.fromJson(e as Map<String, dynamic>))
                .toList() ??
            [];

    final unreadCount = response['unreadCount'] as int? ?? 0;

    return (
      notifications: notificationsList,
      unreadCount: unreadCount,
    );
  }

  @override
  Future<NotificationEntity> markAsRead(String id) async {
    final response = await ApiClient.instance.patch('/api/notifications/$id/read');
    return NotificationModel.fromJson(response['notification'] as Map<String, dynamic>);
  }

  @override
  Future<void> markAllAsRead(String userId) async {
    final body = {'userId': userId};
    await ApiClient.instance.patch('/api/notifications/read-all', body: body);
  }
}
