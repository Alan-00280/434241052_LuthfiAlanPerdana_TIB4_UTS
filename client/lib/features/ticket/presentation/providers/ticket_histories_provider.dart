import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/history_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

final ticketHistoriesProvider = FutureProvider.family.autoDispose<List<HistoryEntity>, String>((ref, ticketId) async {
  final repository = ref.watch(ticketRepositoryProvider);
  return repository.getHistories(ticketId);
});
