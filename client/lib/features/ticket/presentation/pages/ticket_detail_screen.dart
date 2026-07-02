import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/ticket_histories_list.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/ticket_comments_list.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/update_status_dialog.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/widgets/ticket_attachments_modal.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_detail_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

class TicketDetailScreen extends ConsumerStatefulWidget {
  final String ticketId;

  const TicketDetailScreen({super.key, required this.ticketId});

  @override
  ConsumerState<TicketDetailScreen> createState() => _TicketDetailScreenState();
}

class _TicketDetailScreenState extends ConsumerState<TicketDetailScreen> {
  bool _isAutoUpdating = false;
  bool _isActionLoading = false;

  Future<void> _handleUpdateStatus(
    String ticketId,
    TicketStatus newStatus,
    String userId,
    String note,
  ) async {
    if (_isActionLoading) return;
    setState(() => _isActionLoading = true);
    try {
      final repo = ref.read(ticketRepositoryProvider);
      await repo.updateStatus(ticketId, newStatus, userId, note: note);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Status tiket berhasil diubah menjadi ${newStatus.displayName}')),
        );
      }

      ref.invalidate(ticketDetailProvider(widget.ticketId));
      ref.invalidate(ticketListProvider);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal mengubah status: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isActionLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final ticketAsync = ref.watch(ticketDetailProvider(widget.ticketId));
    final user = ref.watch(currentUserProvider);

    return Scaffold(
      appBar: CustomAppBar(
        title: 'Detail Tiket',
        actions: [
          if (user?.role.isAdmin ?? false)
            ticketAsync
                    .whenData(
                      (ticket) => IconButton(
                        icon: const Icon(Icons.edit_note, color: Colors.blue),
                        tooltip: 'Ubah Status',
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (ctx) => UpdateStatusDialog(
                              ticketId: widget.ticketId,
                              initialStatus: ticket.status,
                              userId: user!.id,
                            ),
                          ).then((_) {
                            ref.invalidate(ticketDetailProvider(widget.ticketId));
                            ref.invalidate(ticketListProvider);
                          });
                        },
                      ),
                    )
                    .value ??
                const SizedBox.shrink(),
        ],
      ),
      floatingActionButton: (user?.role.isAdmin ?? false)
          ? FloatingActionButton.extended(
              onPressed: () {
                context.pushNamed(
                  AppRoutes.assignTicketName,
                  pathParameters: {AppRoutes.paramId: widget.ticketId},
                );
              },
              label: const Text('Assign Tiket'),
              icon: const Icon(Icons.assignment_ind),
            )
          : null,
      body: ticketAsync.when(
        data: (ticket) {
          // Jika tech support membuka tiket yang statusnya ASSIGNED, otomatis ubah ke IN_PROGRESS
          if (user != null &&
              user.role.isTechSupport &&
              ticket.status == TicketStatus.assigned &&
              !_isAutoUpdating) {
            _isAutoUpdating = true;
            WidgetsBinding.instance.addPostFrameCallback((_) async {
              try {
                final repo = ref.read(ticketRepositoryProvider);
                await repo.updateStatus(
                  widget.ticketId,
                  TicketStatus.inProgress,
                  user.id,
                  note: 'Otomatis diubah ke In Progress oleh Teknisi',
                );
                // Refresh data setelah update
                ref.invalidate(ticketDetailProvider(widget.ticketId));
                ref.invalidate(ticketListProvider);
              } catch (e) {
                debugPrint('Gagal mengubah status ke IN_PROGRESS secara otomatis: $e');
              } finally {
                if (mounted) {
                  setState(() {
                    _isAutoUpdating = false;
                  });
                }
              }
            });
          }

          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(ticketDetailProvider(widget.ticketId));
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
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.blue.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.blue.withOpacity(0.5)),
                      ),
                      child: Text(
                        ticket.status.displayName,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: Colors.blue,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.red.withOpacity(0.15),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.red.withOpacity(0.5)),
                      ),
                      child: Text(
                        ticket.priority.displayName,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: Colors.red,
                        ),
                      ),
                    ),
                    if (ticket.category != null) ...[
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 12,
                          vertical: 6,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.grey.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: Colors.grey.withOpacity(0.5),
                          ),
                        ),
                        child: Text(
                          ticket.category!.name,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                    ],
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
                          builder: (context) =>
                              TicketAttachmentsModal(ticketId: widget.ticketId),
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
                ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: const CircleAvatar(
                    backgroundColor: Colors.amber,
                    child: Icon(Icons.build, color: Colors.white),
                  ),
                  title: const Text('Tech Support'),
                  subtitle: Text(
                    ticket.techSupport != null
                        ? '${ticket.techSupport!.fullName}${ticket.techSupport!.isActive == false ? ' (inactivated)' : ''} (${ticket.techSupport!.speciality})'
                        : 'Belum ditugaskan',
                  ),
                ),

                // Action Buttons for TechSupport and User
                if (user != null) ...[
                  if (user.role.isTechSupport && ticket.status == TicketStatus.inProgress) ...[
                    const SizedBox(height: 16),
                    _isActionLoading
                        ? const Center(child: CircularProgressIndicator())
                        : SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.green,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 14),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              onPressed: () => _handleUpdateStatus(
                                widget.ticketId,
                                TicketStatus.resolved,
                                user.id,
                                'Tiket ditandai SELESAI oleh Teknisi',
                              ),
                              icon: const Icon(Icons.check_circle_outline),
                              label: const Text(
                                'DONE',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ),
                  ],
                  if (user.role.isUser && ticket.status == TicketStatus.resolved) ...[
                    const SizedBox(height: 16),
                    _isActionLoading
                        ? const Center(child: CircularProgressIndicator())
                        : SizedBox(
                            width: double.infinity,
                            child: ElevatedButton.icon(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.blue,
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 14),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              onPressed: () => _handleUpdateStatus(
                                widget.ticketId,
                                TicketStatus.closed,
                                user.id,
                                'Konfirmasi penyelesaian oleh User',
                              ),
                              icon: const Icon(Icons.rate_review),
                              label: const Text(
                                'CONFIRM',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ),
                  ],
                ],

                const Divider(height: 32),
                Text(
                  'Komentar',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 16),
                TicketCommentsList(ticketId: widget.ticketId),
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
                  data: Theme.of(
                    context,
                  ).copyWith(dividerColor: Colors.transparent),
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
                        child: TicketHistoriesList(ticketId: widget.ticketId),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 75)
              ],
            ),
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) =>
            Center(child: Text('Terjadi kesalahan: $error')),
      ),
    );
  }
}
