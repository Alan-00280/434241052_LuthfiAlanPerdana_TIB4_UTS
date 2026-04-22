import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/notification/data/repositories/notification_repository_impl.dart';
import 'package:helpdesk_ticketing/features/notification/domain/entities/notification_entity.dart';
import 'package:helpdesk_ticketing/features/notification/domain/repositories/notification_repository_contract.dart';

final notificationRepositoryProvider = Provider<NotificationRepository>((ref) {
  return NotificationRepositoryImpl();
});

class NotificationState {
  final bool isLoading;
  final List<NotificationEntity> notifications;
  final int unreadCount;
  final String? error;
  final bool filterUnread;

  NotificationState({
    this.isLoading = false,
    this.notifications = const [],
    this.unreadCount = 0,
    this.error,
    this.filterUnread = false,
  });

  NotificationState copyWith({
    bool? isLoading,
    List<NotificationEntity>? notifications,
    int? unreadCount,
    String? error,
    bool? filterUnread,
  }) {
    return NotificationState(
      isLoading: isLoading ?? this.isLoading,
      notifications: notifications ?? this.notifications,
      unreadCount: unreadCount ?? this.unreadCount,
      error: error ?? this.error,
      filterUnread: filterUnread ?? this.filterUnread,
    );
  }
}

class NotificationNotifier extends StateNotifier<NotificationState> {
  final NotificationRepository _repository;
  final String _userId;

  NotificationNotifier(this._repository, this._userId) : super(NotificationState()) {
    fetchNotifications();
  }

  Future<void> fetchNotifications() async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final result = await _repository.getNotifications(
        userId: _userId,
        unread: state.filterUnread ? true : null,
      );
      state = state.copyWith(
        isLoading: false,
        notifications: result.notifications,
        unreadCount: result.unreadCount,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  void toggleFilter() {
    state = state.copyWith(filterUnread: !state.filterUnread);
    fetchNotifications();
  }

  Future<void> markAsRead(String notificationId) async {
    try {
      await _repository.markAsRead(notificationId);
      // Optimistic upate or refetch
      fetchNotifications();
    } catch (e) {
      // Ignore or handle
    }
  }

  Future<void> markAllAsRead() async {
    state = state.copyWith(isLoading: true);
    try {
      await _repository.markAllAsRead(_userId);
      fetchNotifications();
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }
}

final notificationProvider = StateNotifierProvider<NotificationNotifier, NotificationState>((ref) {
  final user = ref.watch(currentUserProvider);
  if (user == null) {
    return NotificationNotifier(ref.watch(notificationRepositoryProvider), '');
  }
  return NotificationNotifier(ref.watch(notificationRepositoryProvider), user.id);
});
