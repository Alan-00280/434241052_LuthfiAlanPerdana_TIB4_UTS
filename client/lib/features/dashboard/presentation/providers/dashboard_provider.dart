import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_stats_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

final dashboardStatsProvider = FutureProvider.autoDispose<TicketStatsEntity>((ref) async {
  final user = ref.watch(currentUserProvider);
  if (user == null) {
    throw Exception('User is required to fetch stats');
  }

  // Jika ADMIN/HELPDESK, fetch semua stats. Jika USER, filter menggunakan user.id
  final fetchUserId = user.role.isUser ? user.id : null;
  final repository = ref.watch(ticketRepositoryProvider);
  return repository.getStats(userId: fetchUserId);
});
