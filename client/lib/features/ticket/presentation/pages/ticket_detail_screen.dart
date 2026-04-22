import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/ticket_histories_list.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/ticket_comments_list.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/update_status_dialog.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/ticket_attachments_modal.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_detail_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

class TicketDetailScreen extends ConsumerWidget {
  final String ticketId;

  const TicketDetailScreen({super.key, required this.ticketId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final ticketAsync = ref.watch(ticketDetailProvider(ticketId));
    final user = ref.watch(currentUserProvider);

    return Scaffold(
      appBar: CustomAppBar(
        title: 'Detail Tiket',
        actions: [
          if (user?.role.isAdmin ?? false)
            ticketAsync.whenData((ticket) => IconButton(
                  icon: const Icon(Icons.edit_note, color: Colors.blue),
                  tooltip: 'Ubah Status',
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (ctx) => UpdateStatusDialog(
                        ticketId: ticketId,
                        initialStatus: ticket.status,
                        userId: user!.id,
                      ),
                    ).then((_) {
                      ref.invalidate(ticketDetailProvider(ticketId));
                      ref.invalidate(ticketListProvider);
                    });
                  },
                )).value ?? const SizedBox.shrink(),
        ],
      ),
      floatingActionButton: (user?.role.isAdmin ?? false)
          ? FloatingActionButton.extended(
              onPressed: () {
                context.pushNamed(
                  AppRoutes.assignTicketName,
                  pathParameters: {AppRoutes.paramId: ticketId},
                );
              },
              label: const Text('Assign Tiket'),
              icon: const Icon(Icons.assignment_ind),
            )
          : null,
      body: ticketAsync.when(
        data: (ticket) {
          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(ticketDetailProvider(ticketId));
            },
            child: ListView(
              padding: const EdgeInsets.all(16.0),
              children: [
                Text(
                  ticket.title,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Chip(
                      label: Text(ticket.status.displayName),
                      backgroundColor: Colors.blue.shade100,
                    ),
                    const SizedBox(width: 8),
                    Chip(
                      label: Text(ticket.priority.displayName),
                      backgroundColor: Colors.red.shade100,
                    ),
                    if (ticket.category != null) ...[
                      const SizedBox(width: 8),
                      Chip(
                        label: Text(ticket.category!.name),
                        backgroundColor: Colors.grey.shade200,
                      ),
                    ]
                  ],
                ),
                const Divider(height: 32),
                Text(
                  'Deskripsi',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 8),
                Text(ticket.description),
                const Divider(height: 32),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Lampiran',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    OutlinedButton.icon(
                      onPressed: () {
                        showModalBottomSheet(
                          context: context,
                          isScrollControlled: true,
                          builder: (context) => TicketAttachmentsModal(ticketId: ticketId),
                        );
                      },
                      icon: const Icon(Icons.attachment),
                      label: const Text('Buka Berkas'),
                    ),
                  ],
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const CircleAvatar(child: Icon(Icons.person)),
                  title: const Text('Pembuat'),
                  subtitle: Text(ticket.creator?.fullName ?? ticket.creatorId),
                ),
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const CircleAvatar(child: Icon(Icons.support_agent)),
                  title: const Text('Assignee'),
                  subtitle: Text(ticket.assignee?.fullName ?? 'Belum ada'),
                ),
                const Divider(height: 32),
                Text(
                  'Komentar',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 16),
                TicketCommentsList(ticketId: ticketId),
                const Divider(height: 32),
                Text(
                  'Dibuat pada: ${ticket.createdAt.toLocal().toString().split('.')[0]}',
                ),
                if (ticket.updatedAt.isAfter(ticket.createdAt))
                  Text(
                    'Diperbarui pada: ${ticket.updatedAt.toLocal().toString().split('.')[0]}',
                  ),
                const Divider(height: 32),
                Theme(
                  data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    title: Text(
                      'Riwayat Perubahan',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(top: 8.0),
                        child: TicketHistoriesList(ticketId: ticketId),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(
          child: Text('Terjadi kesalahan: $error'),
        ),
      ),
    );
  }
}

