import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_histories_provider.dart';

class TicketHistoriesList extends ConsumerWidget {
  final String ticketId;

  const TicketHistoriesList({required this.ticketId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final historiesAsync = ref.watch(ticketHistoriesProvider(ticketId));

    return historiesAsync.when(
      data: (histories) {
        if (histories.isEmpty) {
          return const Text('Belum ada riwayat perubahan.');
        }

        return ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: histories.length,
          itemBuilder: (context, index) {
            final history = histories[index];
            final isStatus = history.field == 'status';
            final isAssignee = history.field == 'assignee';
            final isAddAttachment = history.field == 'add_attachment';
            final isDeleteAttachment = history.field == 'delete_attachment';

            final iconColor = isStatus
                ? Colors.blue
                : isAssignee
                ? Colors.orange
                : isAddAttachment
                ? Colors.green
                : isDeleteAttachment
                ? Colors.red
                : Colors.grey;

            final icon = isStatus
                ? Icons.published_with_changes
                : isAssignee
                ? Icons.person_add
                : isAddAttachment
                ? Icons.attach_file
                : isDeleteAttachment
                ? Icons.delete
                : Icons.history;

            return IntrinsicHeight(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: iconColor.withOpacity(0.1),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(icon, color: iconColor, size: 20),
                      ),
                      if (index != histories.length - 1)
                        Expanded(
                          child: Container(
                            width: 2,
                            color: Colors.grey.shade300,
                          ),
                        ),
                    ],
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 24.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${history.changedBy?.fullName ?? 'Sistem'} ${history.description}',
                            style: const TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                          if (history.note != null &&
                              history.note!.isNotEmpty) ...[
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.all(8.0),
                              decoration: BoxDecoration(
                                color: Colors.grey.shade100,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: Colors.grey.shade300),
                              ),
                              child: Text(
                                '"${history.note!}"',
                                style: TextStyle(
                                  fontStyle: FontStyle.italic,
                                  color: Colors.grey.shade700,
                                  fontSize: 13,
                                ),
                              ),
                            ),
                          ],
                          const SizedBox(height: 4),
                          Text(
                            history.createdAt.toLocal().toString().split(
                              '.',
                            )[0],
                            style: TextStyle(
                              color: Colors.grey.shade500,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
      loading: () => const Center(child: CircularProgressIndicator()),
      error: (err, stack) => Text('Gagal memuat riwayat: $err'),
    );
  }
}
