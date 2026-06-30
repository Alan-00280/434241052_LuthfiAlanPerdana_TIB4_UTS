import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/theme/app_colors.dart';
import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

class TicketListScreen extends ConsumerStatefulWidget {
  const TicketListScreen({super.key});

  @override
  ConsumerState<TicketListScreen> createState() => _TicketListScreenState();
}

class _TicketListScreenState extends ConsumerState<TicketListScreen> {
  final _searchController = TextEditingController();
  final _scrollController = ScrollController();
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _searchController.text = ref.read(ticketFilterProvider).search;
    });
    
    _scrollController.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    _searchController.dispose();
    _debounce?.cancel();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent * 0.9) {
      ref.read(ticketListProvider.notifier).fetchMore();
    }
  }

  void _onSearchChanged(String query) {
    if (_debounce?.isActive ?? false) _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), () {
      ref.read(ticketFilterProvider.notifier).setSearch(query.trim());
    });
  }

  void _showFilterModal() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return Consumer(
          builder: (context, ref, child) {
            final filter = ref.watch(ticketFilterProvider);
            final user = ref.watch(currentUserProvider);
            final isUserRole = user?.role.isUser ?? true;

            return SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Filter Tiket',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    const Text('Status Tiket', style: TextStyle(fontWeight: FontWeight.w600)),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: [
                        _buildStatusChip(ref, null, 'Semua', filter.status == null),
                        _buildStatusChip(ref, TicketStatus.open, 'Open', filter.status == TicketStatus.open),
                        _buildStatusChip(ref, TicketStatus.inProgress, 'In Progress', filter.status == TicketStatus.inProgress),
                        _buildStatusChip(ref, TicketStatus.pending, 'Pending', filter.status == TicketStatus.pending),
                        _buildStatusChip(ref, TicketStatus.resolved, 'Resolved', filter.status == TicketStatus.resolved),
                        _buildStatusChip(ref, TicketStatus.closed, 'Closed', filter.status == TicketStatus.closed),
                      ],
                    ),
                    if (!isUserRole) ...[
                      const SizedBox(height: 24),
                      SwitchListTile(
                        title: const Text('Hanya Tiket Saya (Assigned to Me)'),
                        subtitle: const Text('Tampilkan tiket yang ditugaskan ke Anda'),
                        contentPadding: EdgeInsets.zero,
                        value: filter.isAssignedToMe,
                        onChanged: (val) {
                          ref.read(ticketFilterProvider.notifier).toggleAssignedToMe(val);
                        },
                      ),
                    ],
                    const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () => Navigator.pop(ctx),
                      style: ElevatedButton.styleFrom(
                        foregroundColor: Theme.of(context).brightness == Brightness.dark ? Colors.white : null,
                      ),
                      child: const Text('Tutup'),
                    ),
                    SizedBox(height: 20.0)
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildStatusChip(WidgetRef ref, TicketStatus? status, String label, bool isSelected) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (_) {
        ref.read(ticketFilterProvider.notifier).setStatus(status);
      },
      selectedColor: isDark ? AppColors.primary.withOpacity(0.3) : AppColors.primaryLight,
      labelStyle: TextStyle(
        color: isSelected
            ? (isDark ? Colors.amber.shade200 : AppColors.primaryDark)
            : (isDark ? Colors.grey.shade300 : AppColors.grey700),
        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ticketListAsync = ref.watch(ticketListProvider);

    return Scaffold(
      appBar: const CustomAppBar(
        title: 'Daftar Tiket',
      ),
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Column(
        children: [
          // Bar Pencarian & Filter
          Container(
            padding: const EdgeInsets.all(16.0),
            color: Theme.of(context).colorScheme.surface,
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    onChanged: _onSearchChanged,
                    decoration: InputDecoration(
                      hintText: 'Cari nama atau deskripsi...',
                      prefixIcon: const Icon(Icons.search, color: Colors.grey),
                      contentPadding: const EdgeInsets.symmetric(vertical: 0),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.grey.shade300),
                      ),
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                        borderSide: BorderSide(color: Colors.grey.shade300),
                      ),
                      filled: true,
                      fillColor: Theme.of(context).scaffoldBackgroundColor,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                InkWell(
                  onTap: _showFilterModal,
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.primaryLight,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.primary),
                    ),
                    child: const Icon(Icons.filter_list, color: AppColors.primary),
                  ),
                ),
              ],
            ),
          ),
          
          const Divider(height: 1, thickness: 1),

          // Daftar Tiket
          Expanded(
            child: ticketListAsync.when(
              data: (tickets) {
                if (tickets.isEmpty) {
                  return const Center(child: Text('Tidak ada tiket yang ditemukan.'));
                }
                return RefreshIndicator(
                  onRefresh: () async {
                    ref.invalidate(ticketListProvider);
                  },
                  child: ListView.separated(
                    controller: _scrollController,
                    padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
                    itemCount: tickets.length + 1, // +1 untuk loading indicator di bawah
                    separatorBuilder: (context, index) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      if (index == tickets.length) {
                        return Consumer(
                          builder: (context, ref, child) {
                            // Cek jika sedang load data baru via _isFetchingMore
                            final isFetching = ref.watch(ticketListProvider.notifier).isFetchingMore;
                            if (isFetching) {
                              return const Padding(
                                padding: EdgeInsets.all(16.0),
                                child: Center(child: CircularProgressIndicator()),
                              );
                            }
                            return const SizedBox.shrink();
                          },
                        );
                      }
                      return _TicketCard(ticket: tickets[index]);
                    },
                  ),
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Center(child: Text('Error: $error')),
            ),
          ),
          SizedBox(height: 20.0)
        ],
      ),
    );
  }
}

class _TicketCard extends StatelessWidget {
  final TicketEntity ticket;

  const _TicketCard({required this.ticket});

  Color _getStatusColor(TicketStatus status) {
    switch (status) {
      case TicketStatus.open:
        return Colors.blue;
      case TicketStatus.inProgress:
        return Colors.orange;
      case TicketStatus.pending:
        return Colors.amber;
      case TicketStatus.resolved:
        return Colors.green;
      case TicketStatus.closed:
        return Colors.grey.shade700;
    }
  }

  @override
  Widget build(BuildContext context) {
    final statusColor = _getStatusColor(ticket.status);

    return InkWell(
      onTap: () {
        context.pushNamed(
          AppRoutes.ticketDetailName,
          pathParameters: {AppRoutes.paramId: ticket.id},
        );
      },
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Theme.of(context).dividerColor.withOpacity(0.1)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top Row: Status Pill + Date
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: statusColor.withOpacity(0.5)),
                  ),
                  child: Text(
                    ticket.status.displayName,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: statusColor,
                    ),
                  ),
                ),
                Text(
                  ticket.createdAt.toLocal().toString().split('.')[0],
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade500),
                ),
              ],
            ),
            const SizedBox(height: 12),
            
            // Title
            Text(
              ticket.title,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: Theme.of(context).colorScheme.onSurface,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 16),
            
            // Bottom Row: Priority & Assignee
            Row(
              children: [
                Icon(Icons.flag, size: 16, color: Colors.grey.shade600),
                const SizedBox(width: 4),
                Text(
                  'Priority: ${ticket.priority.displayName}',
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade700, fontWeight: FontWeight.w500),
                ),
                const Spacer(),
                Icon(Icons.person_outline, size: 16, color: Colors.grey.shade600),
                const SizedBox(width: 4),
                Text(
                  ticket.assignee?.fullName ?? 'Belum Ter-assign',
                  style: TextStyle(
                    fontSize: 12,
                    color: ticket.assignee == null ? Colors.red.shade400 : Colors.blue.shade700,
                    fontWeight: FontWeight.w600,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}