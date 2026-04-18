import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/auth/data/datasource/supabase_datasource.dart';
import 'package:helpdesk_ticketing/features/auth/data/repositories/user_repository_impl.dart';
import 'package:helpdesk_ticketing/features/auth/domain/entities/user_entity.dart';
import 'package:helpdesk_ticketing/features/auth/domain/repositories/user_repository_contract.dart';
import 'package:helpdesk_ticketing/features/auth/domain/usecases/user_usecase.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

final _authSubscriptionProvider =
    Provider.autoDispose<StreamSubscription<AuthState>>((ref) {
  final subscription = Supabase.instance.client.auth.onAuthStateChange.listen(
    (data) {
      final session = data.session;
      ApiClient.instance.setToken(session?.accessToken);
    },
  );
  ref.onDispose(() => subscription.cancel());
  return subscription;
});

class AuthController extends AsyncNotifier<UserEntity?> {
  AuthRepository get repo => ref.read(authRepositoryProvider);

  @override
  Future<UserEntity?> build() async {
    _checkAndSyncToken();
    ref.watch(_authSubscriptionProvider);
    return await repo.getCurrentUser();
  }

  Future<void> _checkAndSyncToken() async {
    final session = Supabase.instance.client.auth.currentSession;
    if (session != null) {
      ApiClient.instance.setToken(session.accessToken);
    }
  }

  Future<void> checkUser() async {
    ref.invalidateSelf();
  }

  Future<void> login(String email, String password) async {
    state = const AsyncLoading();
    try {
      final user = await repo.signIn(email, password);
      state = AsyncData(user);
    } catch (e, st) {
      state = AsyncError(e, st);
      rethrow;
    }
  }

  Future<void> logout() async {
    await repo.signOut();
    state = const AsyncData(null);
  }

  /// Ambil access token Supabase yang aktif
  String? getAccessToken() =>
      Supabase.instance.client.auth.currentSession?.accessToken;
}

// ─── Providers ───────────────────────────────────────────────────────────────

final authDataSourceProvider = Provider(
  (ref) => SupabaseAuthDataSource(),
);

final authRepositoryProvider = Provider<AuthRepository>(
  (ref) => AuthRepositoryImpl(ref.read(authDataSourceProvider)),
);

final signInProvider = Provider(
  (ref) => SignIn(ref.read(authRepositoryProvider)),
);

final authControllerProvider =
    AsyncNotifierProvider<AuthController, UserEntity?>(
  AuthController.new,
);

/// Provider untuk akses token langsung (untuk kebutuhan khusus)
final accessTokenProvider = Provider<String?>((ref) {
  final session = Supabase.instance.client.auth.currentSession;
  return session?.accessToken;
});

/// Provider untuk akses UserEntity yang sedang login
final currentUserProvider = Provider<UserEntity?>((ref) {
  final asyncValue = ref.watch(authControllerProvider);
  return asyncValue.hasValue ? asyncValue.value : null;
});
