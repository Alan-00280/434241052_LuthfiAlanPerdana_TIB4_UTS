import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

final ticketDetailProvider = FutureProvider.family.autoDispose<TicketEntity, String>((ref, ticketId) async {
  final repository = ref.watch(ticketRepositoryProvider);
  return repository.getTicketById(ticketId);
});
