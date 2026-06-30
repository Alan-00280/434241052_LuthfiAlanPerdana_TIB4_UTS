import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/enums/notification_type.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/theme/app_colors.dart';
import 'package:helpdesk_ticketing/features/notification/domain/entities/notification_entity.dart';
import 'package:helpdesk_ticketing/features/notification/presentation/providers/notification_provider.dart';

import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

class NotificationScreen extends ConsumerWidget {
  const NotificationScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(notificationProvider);
    final notifier = ref.read(notificationProvider.notifier);

    return Scaffold(
      appBar: CustomAppBar(
        title: 'Notifikasi',
        actions: [
          if (state.unreadCount > 0)
            Padding(
              padding: const EdgeInsets.only(right: 8.0),
              child: TextButton.icon(
                onPressed: () => notifier.markAllAsRead(),
                icon: const Icon(Icons.done_all, color: AppColors.white, size: 20),
                label: const Text('Baca Semua', style: TextStyle(color: AppColors.white)),
                style: TextButton.styleFrom(
                  backgroundColor: AppColors.white.withOpacity(0.2),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Unread: ${state.unreadCount}',
                  style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.grey700),
                ),
                Row(
                  children: [
                    const Text('Hanya Unread', style: TextStyle(fontSize: 14)),
                    Switch(
                      value: state.filterUnread,
                      onChanged: (val) => notifier.toggleFilter(),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: state.isLoading && state.notifications.isEmpty
                ? const Center(child: CircularProgressIndicator())
                : state.error != null
                    ? Center(child: Text('Gagal memuat: ${state.error}'))
                    : state.notifications.isEmpty
                        ? const Center(child: Text('Tidak ada notifikasi.'))
                        : RefreshIndicator(
                            onRefresh: () => notifier.fetchNotifications(),
                            child: ListView.separated(
                              itemCount: state.notifications.length,
                              separatorBuilder: (context, index) => const Divider(height: 1),
                              itemBuilder: (context, index) {
                                final notif = state.notifications[index];
                                return _NotificationTile(notif: notif);
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}

class _NotificationTile extends ConsumerWidget {
  final NotificationEntity notif;

  const _NotificationTile({required this.notif});

  IconData _getIconData() {
    switch (notif.type) {
      case NotificationType.ticketCreated:
        return Icons.fiber_new;
      case NotificationType.ticketAssigned:
        return Icons.assignment_ind;
      case NotificationType.ticketStatusUpdated:
        return Icons.update;
      case NotificationType.ticketCommentAdded:
        return Icons.comment;
      case NotificationType.ticketResolved:
        return Icons.check_circle_outline;
      case NotificationType.ticketClosed:
        return Icons.lock_outline;
    }
  }

  Color _getIconColor() {
    switch (notif.type) {
      case NotificationType.ticketCreated:
        return Colors.green;
      case NotificationType.ticketAssigned:
        return Colors.blue;
      case NotificationType.ticketStatusUpdated:
        return Colors.orange;
      case NotificationType.ticketCommentAdded:
        return Colors.purple;
      case NotificationType.ticketResolved:
        return Colors.teal;
      case NotificationType.ticketClosed:
        return Colors.grey.shade600;
    }
  }

  void _showModal(BuildContext context, WidgetRef ref) {
    if (!notif.isRead) {
      ref.read(notificationProvider.notifier).markAsRead(notif.id);
    }
    
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      builder: (ctx) {
        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Icon(_getIconData(), color: _getIconColor(), size: 28),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        notif.title,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Text(notif.body, style: const TextStyle(fontSize: 16)),
                const SizedBox(height: 16),
                Text(
                  '${notif.createdAt.toLocal().toString().split('.')[0]}',
                  style: TextStyle(color: Colors.grey.shade600, fontSize: 13),
                ),
                if (notif.ticket != null) ...[
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.grey.shade300),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Tiket Terkait:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                        const SizedBox(height: 4),
                        Text(notif.ticket!.title, style: const TextStyle(fontWeight: FontWeight.w500)),
                        const SizedBox(height: 4),
                        Text('Status: ${notif.ticket!.status.name.toUpperCase()}', style: TextStyle(color: Colors.grey.shade700, fontSize: 12)),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    context.pushNamed(
                      AppRoutes.ticketDetailName,
                      pathParameters: {AppRoutes.paramId: notif.ticketId},
                    );
                  },
                  child: const Text('Buka Tiket', style: TextStyle(color: Colors.white)),
                ),
                SizedBox(height: 20.0)
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return ListTile(
      onTap: () => _showModal(context, ref),
      tileColor: notif.isRead ? Colors.transparent : (isDark ? Colors.blue.withOpacity(0.15) : Colors.blue.shade50.withOpacity(0.5)),
      leading: CircleAvatar(
        backgroundColor: _getIconColor().withOpacity(0.2),
        child: Icon(_getIconData(), color: _getIconColor()),
      ),
      title: Text(
        notif.title,
        style: TextStyle(fontWeight: notif.isRead ? FontWeight.normal : FontWeight.bold),
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 4),
          Text(
            notif.body,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            notif.createdAt.toLocal().toString().split('.')[0],
            style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
          ),
        ],
      ),
      trailing: notif.isRead
          ? null
          : Container(
              width: 10,
              height: 10,
              decoration: const BoxDecoration(
                color: Colors.red,
                shape: BoxShape.circle,
              ),
            ),
    );
  }
}
