import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/widgets/app_shell.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/pages/auth_page.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/core/theme/theme.dart';
import 'package:helpdesk_ticketing/features/dashboard/presentation/pages/dashboard_screen.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/pages/ticket_list_screen.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/pages/ticket_detail_screen.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/pages/create_ticket_screen.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/pages/assign_ticket_screen.dart';
import 'package:helpdesk_ticketing/features/profile/presentation/pages/profile_screen.dart';
import 'package:helpdesk_ticketing/features/notification/presentation/pages/notification_screen.dart';

/// Provider GoRouter yang reaktif terhadap perubahan auth state.
/// Router otomatis redirect berdasarkan status autentikasi pengguna.
final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authControllerProvider);

  return GoRouter(
    initialLocation: AppRoutes.login,
    debugLogDiagnostics: false,
    redirect: (context, state) {
      final isLoading = authState.isLoading;
      if (isLoading) return null;

      final user = authState.hasValue ? authState.value : null;
      final isLoggedIn = user != null;
      final isOnLogin = state.matchedLocation == AppRoutes.login;

      // Belum login → paksa ke login
      if (!isLoggedIn && !isOnLogin) return AppRoutes.login;

      // Sudah login tapi masih di halaman login → redirect ke dashboard
      if (isLoggedIn && isOnLogin) return AppRoutes.dashboard;

      // Role guard: hanya User yang boleh akses create-ticket
      if (isLoggedIn && user.isAdmin) {
        if (state.matchedLocation == AppRoutes.createTicket) {
          return AppRoutes.dashboard;
        }
      }

      return null;
    },
    errorBuilder: (context, state) => _NotFoundScreen(error: state.error),
    routes: [
      // ── Login (tidak ada shell) ────────────────────────────────────────
      GoRoute(
        path: AppRoutes.login,
        name: AppRoutes.loginName,
        builder: (context, state) => const AuthPage(),
      ),

      // ── Main shell (dengan bottom navigation) ──────────────────────────
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return AppShell(navigationShell: navigationShell);
        },
        branches: [
          // Tab 0: Dashboard
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.dashboard,
                name: AppRoutes.dashboardName,
                builder: (context, state) => const DashboardScreen(),
              ),
            ],
          ),

          // Tab 1: Ticket List
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.tickets,
                name: AppRoutes.ticketsName,
                builder: (context, state) => const TicketListScreen(),
                routes: [
                  GoRoute(
                    path: ':${AppRoutes.paramId}',
                    name: AppRoutes.ticketDetailName,
                    builder: (context, state) {
                      final id = state.pathParameters[AppRoutes.paramId]!;
                      return TicketDetailScreen(ticketId: id);
                    },
                  ),
                ],
              ),
            ],
          ),

          // Tab 2: Notifications
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.notifications,
                name: AppRoutes.notificationsName,
                builder: (context, state) => const NotificationScreen(),
              ),
            ],
          ),

          // Tab 2: Profile
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.profile,
                name: AppRoutes.profileName,
                builder: (context, state) => const ProfileScreen(),
              ),
            ],
          ),
        ],
      ),

      // ── Create Ticket (di luar shell) ──────────────────────────────────
      GoRoute(
        path: AppRoutes.createTicket,
        name: AppRoutes.createTicketName,
        builder: (context, state) => const CreateTicketScreen(),
      ),

      // ── Assign Ticket (admin only, di luar shell) ──────────────────────
      GoRoute(
        path: '/assign-ticket/:${AppRoutes.paramId}',
        name: AppRoutes.assignTicketName,
        builder: (context, state) {
          final id = state.pathParameters[AppRoutes.paramId]!;
          return AssignTicketScreen(ticketId: id);
        },
      ),
    ],
  );
});

// ── 404 / Not Found Screen ────────────────────────────────────────────────
class _NotFoundScreen extends StatelessWidget {
  final Exception? error;
  const _NotFoundScreen({this.error});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Halaman Tidak Ditemukan')),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 64, color: AppColors.grey500),
              const SizedBox(height: AppSpacing.md),
              Text(
                'Halaman tidak ditemukan',
                style: AppTextStyles.title,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'Rute yang Anda akses tidak tersedia.',
                style: AppTextStyles.body,
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.lg),
              ElevatedButton.icon(
                icon: const Icon(Icons.home),
                label: const Text('Kembali ke Dashboard'),
                onPressed: () => context.go(AppRoutes.dashboard),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
