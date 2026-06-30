import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/assignee_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/tech_support_provider.dart';
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

  Future<void> _assignTicket(String techSupportId) async {
    final user = ref.read(currentUserProvider);
    if (user == null) return;

    setState(() => _isLoading = true);
    try {
      final repository = ref.read(ticketRepositoryProvider);

      // Alur yang benar:
      // widget.ticketId -> ID Tiket
      // user.id         -> assigneeId (Helpdesk yang sedang login)
      // user.id         -> changedById (Orang yang melakukan perubahan)
      // techSupportId   -> techSupportId (Teknisi yang dipilih dari list)
      await repository.assignTicket(
        widget.ticketId,
        user.id, // Sebagai assigneeId
        user.id, // Sebagai changedById
        techSupportId,
      );

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Tiket berhasil di-assign ke Tech Support.'),
          ),
        );
        ref.invalidate(ticketDetailProvider(widget.ticketId));
        ref.invalidate(ticketListProvider);
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(SnackBar(content: Text('Gagal assign tiket: $e')));
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final assigneesAsync = ref.watch(techSupportListProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Pilih Tech Support')),
      body: assigneesAsync.when(
        data: (techSupportList) {
          if (techSupportList.isEmpty) {
            return const Center(
              child: Text('Tidak ada tech support tersedia.'),
            );
          }
          return ListView.separated(
            itemCount: techSupportList.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final techSupport = techSupportList[index];
              final isSupportActive = techSupport.isActive;

              return ListTile(
                leading: Opacity(
                  opacity: isSupportActive ? 1.0 : 0.5,
                  child: CircleAvatar(
                    backgroundImage: techSupport.avatarUrl != null
                        ? NetworkImage(techSupport.avatarUrl!)
                        : null,
                    child: techSupport.avatarUrl == null
                        ? const Icon(Icons.person)
                        : null,
                  ),
                ),
                title: Text(
                  isSupportActive
                      ? techSupport.fullName
                      : '${techSupport.fullName} (inactivated)',
                  style: TextStyle(
                    color: isSupportActive ? null : Colors.grey.shade400,
                    fontWeight: isSupportActive ? null : FontWeight.w400,
                  ),
                ),
                subtitle: Text(
                  techSupport.speciality ?? 'Umum / No Speciality',
                  style: TextStyle(
                    color: isSupportActive ? Colors.grey[600] : Colors.grey.shade400,
                    fontSize: 13,
                  ),
                ),
                trailing: isSupportActive
                    ? const Icon(Icons.chevron_right)
                    : const Icon(Icons.block, color: Colors.grey, size: 16),
                onTap: (!isSupportActive || _isLoading)
                    ? null
                    : () => _assignTicket(techSupport.id),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (e, _) => Center(child: Text('Gagal memuat data: $e')),
      ),
    );
  }
}
