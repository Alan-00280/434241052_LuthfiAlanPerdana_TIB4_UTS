import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/data/repositories/ticket_repository_impl.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/repositories/ticket_repository_contract.dart';

final ticketRepositoryProvider = Provider<TicketRepository>((ref) {
  return TicketRepositoryImpl();
});

final ticketListProvider = FutureProvider.autoDispose<List<TicketEntity>>((ref) async {
  final user = ref.watch(currentUserProvider);
  if (user == null) {
    return [];
  }

  final repository = ref.watch(ticketRepositoryProvider);
  
  // Jika user adalah USER, hanya lihat tiket miliknya.
  // Jika ADMIN / HELPDESK, lihat semua tiket (parameternya tidak diisi).
  final creatorId = user.role.isUser ? user.id : null;

  final result = await repository.getTickets(
    creatorId: creatorId,
  );
  
  return result.items;
});
