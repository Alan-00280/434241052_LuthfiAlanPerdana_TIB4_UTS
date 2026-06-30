import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/profile/presentation/providers/profile_provider.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/router/route_names.dart';
import 'package:helpdesk_ticketing/core/theme/app_colors.dart';

import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  void _showEditProfileModal(BuildContext context, WidgetRef ref, String initialName, String initialPhone) {
    final nameController = TextEditingController(text: initialName);
    final phoneController = TextEditingController(text: initialPhone);
    bool isLoading = false;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Padding(
              padding: EdgeInsets.only(
                bottom: MediaQuery.of(ctx).viewInsets.bottom,
                top: 24,
                left: 24,
                right: 24,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const Text(
                    'Ubah Profil',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),
                  TextField(
                    controller: nameController,
                    decoration: const InputDecoration(
                      labelText: 'Nama Lengkap',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: phoneController,
                    keyboardType: TextInputType.phone,
                    decoration: const InputDecoration(
                      labelText: 'Nomor Telepon',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: isLoading
                        ? null
                        : () async {
                            setState(() => isLoading = true);
                            try {
                              await ref.read(profileProvider.notifier).updateProfile(
                                    fullName: nameController.text.trim(),
                                    phone: phoneController.text.trim(),
                                  );
                              if (ctx.mounted) {
                                Navigator.pop(ctx);
                                ScaffoldMessenger.of(ctx).showSnackBar(
                                  const SnackBar(content: Text('Profil berhasil diperbarui.')),
                                );
                              }
                            } catch (e) {
                              if (ctx.mounted) {
                                ScaffoldMessenger.of(ctx).showSnackBar(
                                  SnackBar(content: Text('Gagal memperbarui: $e')),
                                );
                              }
                            } finally {
                              if (ctx.mounted) setState(() => isLoading = false);
                            }
                          },
                    child: isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                          )
                        : const Text('Simpan'),
                  ),
                  const SizedBox(height: 44),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(profileProvider);

    return Scaffold(
      appBar: const CustomAppBar(
        title: 'Profil Saya',
      ),
      body: state.isLoading && state.profile == null
          ? const Center(child: CircularProgressIndicator())
          : state.error != null && state.profile == null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error_outline, size: 48, color: Colors.red),
                      const SizedBox(height: 16),
                      Text('Gagal memuat profil: ${state.error}'),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: () => ref.read(profileProvider.notifier).fetchProfile(),
                        child: const Text('Coba Lagi'),
                      ),
                    ],
                  ),
                )
              : state.profile == null
                  ? const Center(child: Text('Data profil tidak ditemukan.'))
                  : RefreshIndicator(
                      onRefresh: () => ref.read(profileProvider.notifier).fetchProfile(),
                      child: ListView(
                        padding: const EdgeInsets.all(24.0),
                        children: [
                          Center(
                            child: CircleAvatar(
                              radius: 50,
                              backgroundColor: AppColors.primaryLight,
                              backgroundImage: state.profile!.avatarUrl != null
                                  ? NetworkImage(state.profile!.avatarUrl!)
                                  : null,
                              child: state.profile!.avatarUrl == null
                                  ? const Icon(Icons.person, size: 50, color: AppColors.primary)
                                  : null,
                            ),
                          ),
                          const SizedBox(height: 16),
                          Center(
                            child: Text(
                              state.profile!.fullName,
                              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Center(
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                              decoration: BoxDecoration(
                                color: state.profile!.role.name == 'ADMIN'
                                    ? Colors.red.shade100
                                    : (state.profile!.role.name == 'HELPDESK' ? Colors.blue.shade100 : Colors.green.shade100),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Text(
                                state.profile!.role.name,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  color: state.profile!.role.name == 'ADMIN'
                                      ? Colors.red.shade800
                                      : (state.profile!.role.name == 'HELPDESK' ? Colors.blue.shade800 : Colors.green.shade800),
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 32),
                          const Text('Informasi Personal', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                          const SizedBox(height: 16),
                          _ProfileItemRow(icon: Icons.badge, label: 'ID Pengguna', value: state.profile!.id),
                          const Divider(),
                          _ProfileItemRow(icon: Icons.email, label: 'Email', value: state.profile!.email),
                          const Divider(),
                          _ProfileItemRow(icon: Icons.phone, label: 'Telepon', value: state.profile!.phone ?? '-'),
                          const Divider(),
                          _ProfileItemRow(
                            icon: Icons.calendar_today,
                            label: 'Terdaftar Pada',
                            value: state.profile!.createdAt.toLocal().toString().split('.')[0],
                          ),
                          const SizedBox(height: 32),
                          OutlinedButton.icon(
                            onPressed: () => _showEditProfileModal(
                              context,
                              ref,
                              state.profile!.fullName,
                              state.profile!.phone ?? '',
                            ),
                            icon: const Icon(Icons.edit),
                            label: const Text('Ubah Profil'),
                          ),
                          const SizedBox(height: 16),
                          if (state.profile!.role.isTrueAdmin) ...[
                            OutlinedButton.icon(
                              onPressed: () => context.push(AppRoutes.userManagement),
                              icon: const Icon(Icons.people_outline),
                              label: const Text('Manajemen Pengguna'),
                            ),
                            const SizedBox(height: 16),
                          ],
                          OutlinedButton.icon(
                            onPressed: () => context.push(AppRoutes.resetPassword),
                            icon: const Icon(Icons.lock_reset),
                            label: const Text('Reset Password'),
                          ),
                          const SizedBox(height: 16),
                          ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red.shade50,
                              foregroundColor: Colors.red,
                              side: const BorderSide(color: Colors.red),
                            ),
                            onPressed: () {
                              ref.read(authControllerProvider.notifier).logout();
                            },
                            icon: const Icon(Icons.logout),
                            label: const Text('Keluar Aplikasi'),
                          ),
                          const SizedBox(height: 48),
                          const Center(
                            child: Text(
                              'Helpdesk Ticketing v1.0.0',
                              style: TextStyle(color: Colors.grey, fontSize: 12),
                            ),
                          ),
                          const SizedBox(height: 48)
                        ],
                      ),
                    ),
    );
  }
}

class _ProfileItemRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _ProfileItemRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(icon, color: Colors.grey, size: 20),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
                const SizedBox(height: 4),
                Text(value, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}