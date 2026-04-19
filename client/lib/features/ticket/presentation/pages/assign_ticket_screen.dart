import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/assignee_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_detail_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

class AssignTicketScreen extends ConsumerStatefulWidget {
  final String ticketId;

  const AssignTicketScreen({super.key, required this.ticketId});

  @override
  ConsumerState<AssignTicketScreen> createState() => _AssignTicketScreenState();
}

class _AssignTicketScreenState extends ConsumerState<AssignTicketScreen> {
  bool _isLoading = false;

  Future<void> _assignTicket(String assigneeId) async {
    final user = ref.read(currentUserProvider);
    if (user == null) return;

    setState(() => _isLoading = true);
    try {
      final repository = ref.read(ticketRepositoryProvider);
      await repository.assignTicket(widget.ticketId, assigneeId, user.id);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Tiket berhasil di-assign.')),
        );
        ref.invalidate(ticketDetailProvider(widget.ticketId));
        ref.invalidate(ticketListProvider);
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal assign tiket: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    final assigneesAsync = ref.watch(assigneeListProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Pilih Assignee'),
      ),
      body: assigneesAsync.when(
        data: (assignees) {
          if (assignees.isEmpty) {
            return const Center(child: Text('Tidak ada assignee tersedia.'));
          }
          return ListView.separated(
            itemCount: assignees.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final assignee = assignees[index];
              return ListTile(
                leading: CircleAvatar(
                  backgroundImage: assignee.avatarUrl != null
                      ? NetworkImage(assignee.avatarUrl!)
                      : null,
                  child: assignee.avatarUrl == null
                      ? const Icon(Icons.person)
                      : null,
                ),
                title: Text(assignee.fullName),
                trailing: const Icon(Icons.chevron_right),
                onTap: () => _assignTicket(assignee.id),
              );
            },
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