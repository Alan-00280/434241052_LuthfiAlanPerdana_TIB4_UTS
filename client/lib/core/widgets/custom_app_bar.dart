import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/theme/app_colors.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';

class CustomAppBar extends ConsumerWidget implements PreferredSizeWidget {
  final String title;
  final bool showLogout;
  final List<Widget>? actions;

  const CustomAppBar({
    super.key,
    required this.title,
    this.showLogout = false,
    this.actions,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final avatarUrl = user?.avatarUrl;

    // Ambil tinggi top padding (status bar) dari sistem
    final double topPadding = MediaQuery.of(context).padding.top;

    return Container(
      // Kita paksakan tingginya sesuai preferredSize + topPadding (jika ingin total konten 150)
      // Atau biarkan 150 tapi konten di dalamnya harus muat.
      height: preferredSize.height + topPadding,
      decoration: BoxDecoration(
        color: Colors.amber,
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(24)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            offset: const Offset(0, 4),
            blurRadius: 10,
          ),
        ],
      ),
      child: SafeArea(
        bottom:
            false, // Kita hanya butuh SafeArea untuk bagian atas (Status Bar)
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  CircleAvatar(
                    backgroundImage: avatarUrl != null
                        ? NetworkImage(avatarUrl)
                        : null,
                    backgroundColor: AppColors.surface,
                    radius: 20,
                    child: avatarUrl == null
                        ? const Icon(Icons.person, color: AppColors.primary)
                        : null,
                  ),
                  const SizedBox(width: 20),
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: AppColors.white,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  if (actions != null) ...actions!,
                  if (showLogout)
                    IconButton(
                      icon: const Icon(Icons.logout, color: Colors.red),
                      tooltip: 'Logout',
                      onPressed: () {
                        ref.read(authControllerProvider.notifier).logout();
                      },
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(80); // Contoh: 80 adalah tinggi konten bersih
}
