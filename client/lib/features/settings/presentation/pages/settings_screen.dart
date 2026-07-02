import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/theme/theme.dart';
import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';
import 'package:helpdesk_ticketing/features/settings/presentation/providers/settings_provider.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeModeProvider);
    final language = ref.watch(languageProvider);
    final notificationsEnabled = ref.watch(notificationsEnabledProvider);

    return Scaffold(
      appBar: const CustomAppBar(
        title: 'Pengaturan',
      ),
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          _buildSectionHeader(context, 'Tampilan & Tema'),
          _buildSettingsCard(
            context,
            children: [
              ListTile(
                leading: const Icon(Icons.palette_outlined, color: AppColors.primaryDark),
                title: const Text('Tema Aplikasi'),
                subtitle: Text(_getThemeDisplayName(themeMode)),
                trailing: DropdownButton<ThemeMode>(
                  value: themeMode,
                  underline: const SizedBox.shrink(),
                  icon: const Icon(Icons.arrow_drop_down),
                  items: const [
                    DropdownMenuItem(
                      value: ThemeMode.system,
                      child: Text('Default Sistem'),
                    ),
                    DropdownMenuItem(
                      value: ThemeMode.light,
                      child: Text('Mode Terang'),
                    ),
                    DropdownMenuItem(
                      value: ThemeMode.dark,
                      child: Text('Mode Gelap'),
                    ),
                  ],
                  onChanged: (val) {
                    if (val != null) {
                      ref.read(themeModeProvider.notifier).state = val;
                    }
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),

          _buildSectionHeader(context, 'Bahasa & Lokalisasi'),
          _buildSettingsCard(
            context,
            children: [
              ListTile(
                leading: const Icon(Icons.language_outlined, color: AppColors.primaryDark),
                title: const Text('Bahasa'),
                subtitle: Text(language == 'id' ? 'Bahasa Indonesia' : 'English'),
                trailing: DropdownButton<String>(
                  value: language,
                  underline: const SizedBox.shrink(),
                  icon: const Icon(Icons.arrow_drop_down),
                  items: const [
                    DropdownMenuItem(
                      value: 'id',
                      child: Text('Bahasa Indonesia'),
                    ),
                    DropdownMenuItem(
                      value: 'en',
                      child: Text('English'),
                    ),
                  ],
                  onChanged: (val) {
                    if (val != null) {
                      ref.read(languageProvider.notifier).state = val;
                    }
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),

          _buildSectionHeader(context, 'Notifikasi'),
          _buildSettingsCard(
            context,
            children: [
              SwitchListTile(
                secondary: const Icon(Icons.notifications_active_outlined, color: AppColors.primaryDark),
                title: const Text('Notifikasi Aplikasi'),
                subtitle: const Text('Aktifkan pemberitahuan push untuk pembaruan tiket'),
                value: notificationsEnabled,
                onChanged: (val) {
                  ref.read(notificationsEnabledProvider.notifier).state = val;
                },
                activeColor: AppColors.primary,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.lg),

          _buildSectionHeader(context, 'Info Aplikasi'),
          _buildSettingsCard(
            context,
            children: [
              const ListTile(
                leading: Icon(Icons.info_outline, color: AppColors.primaryDark),
                title: Text('Versi Aplikasi'),
                trailing: Text(
                  'v1.0.0',
                  style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
                ),
              ),
              const Divider(),
              const ListTile(
                leading: Icon(Icons.copyright, color: AppColors.primaryDark),
                title: Text('Hak Cipta'),
                subtitle: Text('© 2026 Helpdesk E-Ticketing Team'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.only(left: 8.0, bottom: 8.0),
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleSmall?.copyWith(
              color: Colors.grey.shade600,
              fontWeight: FontWeight.bold,
              letterSpacing: 0.5,
            ),
      ),
    );
  }

  Widget _buildSettingsCard(BuildContext context, {required List<Widget> children}) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surface,
        borderRadius: BorderRadius.circular(16),
        boxShadow: const [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 10,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(16),
        child: Column(
          children: children,
        ),
      ),
    );
  }

  String _getThemeDisplayName(ThemeMode mode) {
    switch (mode) {
      case ThemeMode.system:
        return 'Default Sistem';
      case ThemeMode.light:
        return 'Mode Terang';
      case ThemeMode.dark:
        return 'Mode Gelap';
    }
  }
}
