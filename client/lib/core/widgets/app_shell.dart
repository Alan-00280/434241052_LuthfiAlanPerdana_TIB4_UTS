import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/theme/theme.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';

/// Shell utama aplikasi yang menampilkan bottom navigation bar.
/// Membungkus semua main screen (Dashboard, Tickets, Profile).
class AppShell extends ConsumerWidget {
  final StatefulNavigationShell navigationShell;

  const AppShell({super.key, required this.navigationShell});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authControllerProvider);
    final user = authState.hasValue ? authState.value : null;
    final isUser = user?.isUser ?? false;

    return Scaffold(
      body: navigationShell,
      // FAB hanya untuk role User
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: isUser
          ? FloatingActionButton(
              shape: const CircleBorder(),
              onPressed: () => context.push(AppRoutes.createTicket),
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              tooltip: 'Buat Tiket Baru',
              elevation: 4,
              child: const Icon(Icons.add),
            )
          : null,
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        notchMargin: 8.0,
        color: Theme.of(context).colorScheme.surface,
        elevation: 8,
        padding: EdgeInsets.zero,
        child: SizedBox(
          height: 65,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(context, 0, Icons.dashboard_outlined, Icons.dashboard, 'Dashboard'),
              _buildNavItem(context, 1, Icons.confirmation_number_outlined, Icons.confirmation_number, 'Tiket'),
              if (isUser) const SizedBox(width: 48), // Space for FAB
              _buildNavItem(context, 2, Icons.notifications_none, Icons.notifications, 'Notif'),
              _buildNavItem(context, 3, Icons.person_outline, Icons.person, 'Profil'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(BuildContext context, int index, IconData icon, IconData activeIcon, String label) {
    final isSelected = navigationShell.currentIndex == index;
    final color = isSelected ? AppColors.primaryDark : AppColors.grey500;

    return InkWell(
      onTap: () => _onTabTapped(index, context),
      customBorder: const CircleBorder(),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(isSelected ? activeIcon : icon, color: color, size: 24),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: color,
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal,
            ),
          ),
        ],
      ),
    );
  }

  void _onTabTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go(AppRoutes.dashboard);
        break;
      case 1:
        context.go(AppRoutes.tickets);
        break;
      case 2:
        context.go(AppRoutes.notifications);
        break;
      case 3:
        context.go(AppRoutes.profile);
        break;
    }
  }
}
