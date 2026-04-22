import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/widgets/loading_skeleton.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/dashboard/presentation/providers/dashboard_provider.dart';
import 'package:helpdesk_ticketing/core/theme/theme.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_stats_entity.dart';

import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    final statsAsync = ref.watch(dashboardStatsProvider);

    return Scaffold(
      appBar: const CustomAppBar(
        title: 'Dashboard',
        showLogout: true,
      ),
      body: authState.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stackTrace) => Center(child: Text('Error: $error')),
        data: (user) {
          if (user == null) {
            return const Center(child: Text('User not found'));
          }
          return RefreshIndicator(
            onRefresh: () async {
              ref.invalidate(dashboardStatsProvider);
            },
            child: ListView(
              padding: const EdgeInsets.all(AppSpacing.lg),
              children: [
                Text(
                  'Halo, Selamat datang!',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                Text(
                  user.fullName.isNotEmpty ? user.fullName : user.username,
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: AppColors.primaryDark,
                      ),
                ),
                Text(
                  'Role: ${user.role.displayName}',
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppColors.grey700,
                      ),
                ),
                const SizedBox(height: AppSpacing.xl),
                Text(
                  'Statistik Tiket',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: AppSpacing.sm),
                statsAsync.when(
                  loading: () => const StatCardSkeleton(),
                  error: (error, stackTrace) => Center(child: Text('Gagal Load Statistik: $error')),
                  data: (stats) => _buildStatsGrid(stats),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildStatsGrid(TicketStatsEntity stats) {
    return GridView.count(
      physics: const NeverScrollableScrollPhysics(),
      shrinkWrap: true,
      crossAxisCount: 2,
      crossAxisSpacing: AppSpacing.md,
      mainAxisSpacing: AppSpacing.md,
      childAspectRatio: 1.5,
      children: [
        _buildStatCard('Total', stats.total, Colors.grey),
        _buildStatCard('Open', stats.open, Colors.blue),
        _buildStatCard('In Progress', stats.inProgress, Colors.orange),
        _buildStatCard('Pending', stats.pending, Colors.amber),
        _buildStatCard('Resolved', stats.resolved, Colors.green),
        _buildStatCard('Closed', stats.closed, Colors.black54),
      ],
    );
  }

  Widget _buildStatCard(String title, int count, Color color) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppSpacing.md)),
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.md),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              count.toString(),
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              title,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}