import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/widgets/loading_skeleton.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

class TicketListScreen extends ConsumerWidget {
  const TicketListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ticketListAsync = ref.watch(ticketListProvider);
    final user = ref.watch(currentUserProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Daftar Tiket'),
      ),
      body: ticketListAsync.when(
        data: (tickets) {
          if (tickets.isEmpty) {
            return const Center(
              child: Text('Tidak ada tiket yang ditemukan.'),
            );
          }
          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(ticketListProvider);
            },
            child: ListView.builder(
              itemCount: tickets.length,
              itemBuilder: (context, index) {
                final ticket = tickets[index];
                return ListTile(
                  title: Text(ticket.title),
                  subtitle: Text(
                    'Status: ${ticket.status.displayName} | Prioritas: ${ticket.priority.displayName}\nAssignee: ${ticket.assignee?.fullName ?? 'Belum ter-assign'}',
                  ),
                  isThreeLine: true,
                  trailing: Text(
                    ticket.createdAt.toLocal().toString().split(' ')[0],
                  ),
                  onTap: () {
                    context.pushNamed(
                      AppRoutes.ticketDetailName,
                      pathParameters: {AppRoutes.paramId: ticket.id},
                    );
                  },
                );
              },
            ),
          );
        },
        loading: () => const Center(child: StatCardSkeleton()),
        error: (error, stack) => Center(
          child: Text('Terjadi kesalahan: $error'),
        ),
      ),
    );
  }
}