import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:helpdesk_ticketing/core/router/app_router.dart';
import 'package:helpdesk_ticketing/core/theme/theme.dart';

import 'package:helpdesk_ticketing/core/services/realtime_notification_provider.dart';

final messengerKey = GlobalKey<ScaffoldMessengerState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(fileName: ".env");
  await Supabase.initialize(
    url: dotenv.env['SUPABASE_URL'] ?? '',
    anonKey: dotenv.env['SUPABASE_ANON_KEY'] ?? ''
  );

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(realtimeNotificationProvider);
    final router = ref.watch(appRouterProvider);

    return MaterialApp.router(
      title: 'E-Ticketing Helpdesk',
      theme: getAppTheme(),
      darkTheme: getDarkTheme(),
      themeMode: ThemeMode.system,
      scaffoldMessengerKey: messengerKey,
      routerConfig: router,
    );
  }
}