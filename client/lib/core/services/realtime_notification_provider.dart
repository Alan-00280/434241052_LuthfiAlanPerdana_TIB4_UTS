import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:helpdesk_ticketing/core/services/noti_service.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';

final notificationServiceProvider = Provider<NotiService>((ref) {
  final notiService = NotiService();
  notiService.initNotification();
  return notiService;
});

final realtimeNotificationProvider = Provider.autoDispose<void>((ref) {
  final user = ref.watch(currentUserProvider);
  if (user == null) return;

  final notiService = ref.read(notificationServiceProvider);
  final supabaseClient = Supabase.instance.client;

  // Berlangganan ke perubahan tabel notifications untuk userId pengguna saat ini
  final channel = supabaseClient
      .channel('public:notifications:userId=eq.${user.id}')
      .onPostgresChanges(
        event: PostgresChangeEvent.insert,
        schema: 'public',
        table: 'notifications',
        filter: PostgresChangeFilter(
          type: PostgresChangeFilterType.eq,
          column: 'userId',
          value: user.id,
        ),
        callback: (payload) {
          final newRecord = payload.newRecord;
          final title = newRecord['title'] as String?;
          final body = newRecord['body'] as String?;
          
          if (title != null && body != null) {
            notiService.showNotification(
              title: title,
              body: body,
            );
          }
        },
      );

  channel.subscribe();

  ref.onDispose(() {
    supabaseClient.removeChannel(channel);
  });
});
