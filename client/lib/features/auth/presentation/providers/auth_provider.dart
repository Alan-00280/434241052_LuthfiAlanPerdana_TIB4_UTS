import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:helpdesk_ticketing/features/auth/data/datasource/supabase_datasource.dart';
import 'package:helpdesk_ticketing/features/auth/data/repositories/user_repository_impl.dart';
import 'package:helpdesk_ticketing/features/auth/domain/entities/user_entity.dart';
import 'package:helpdesk_ticketing/features/auth/domain/repositories/user_repository_contract.dart';
import 'package:helpdesk_ticketing/features/auth/domain/usecases/user_usecase.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthToken {
  final String? accessToken;
  final String? refreshToken;
  final DateTime? expiresAt;

  AuthToken({
    this.accessToken,
    this.refreshToken,
    this.expiresAt,
  });

  bool get isExpired => expiresAt != null && DateTime.now().isAfter(expiresAt!);
  bool get isValid => accessToken != null && !isExpired;
}

class AuthController extends StateNotifier<AsyncValue<UserEntity?>> {
  final AuthRepository repo;
  AuthToken? _currentToken;

  AuthController(this.repo) : super(const AsyncLoading()) {
    _initializeAuthState();
  }

  void _initializeAuthState() {
    checkUser();
    _listenToAuthStateChanges();
  }

  void _listenToAuthStateChanges() {
    Supabase.instance.client.auth.onAuthStateChange.listen((data) {
      final session = data.session;
      
      // Update token when auth state changes
      if (session != null) {
        _currentToken = AuthToken(
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          expiresAt: session.expiresAt != null 
        ? DateTime.fromMillisecondsSinceEpoch(session.expiresAt! * 1000) 
        : null,
        );
      } else {
        _currentToken = null;
      }

      // Auto-refresh user state when auth state changes
      checkUser();
    });
  }

  Future<void> checkUser() async {
    final user = await repo.getCurrentUser();
    state = AsyncData(user);
  }

  Future<void> login(String email, String password) async {
    state = const AsyncLoading();
    try {
      await repo.signIn(email, password);
      
      // Get current session and store token
      final session = Supabase.instance.client.auth.currentSession;
      if (session != null) {
        _currentToken = AuthToken(
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          expiresAt: session.expiresAt != null 
        ? DateTime.fromMillisecondsSinceEpoch(session.expiresAt! * 1000) 
        : null,
        );
      }
      
      await checkUser();
    } catch (e) {
      // Keep state as is (don't set to AsyncError) to show snackbar in AuthPage
      // Reset to previous state or stay as loading
      state = AsyncData(null);
      rethrow;
    }
  }

  Future<void> logout() async {
    await repo.signOut();
    _currentToken = null;
    state = const AsyncData(null);
  }

  /// Get current authentication token
  AuthToken? getAuthToken() => _currentToken;

  /// Get current access token for API requests
  String? getAccessToken() => _currentToken?.accessToken;
}

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
    StateNotifierProvider<AuthController, AsyncValue<UserEntity?>>(
  (ref) => AuthController(ref.read(authRepositoryProvider)),
);

/// Provider for accessing the current access token for API requests
final accessTokenProvider = Provider<String?>((ref) {
  final controller = ref.read(authControllerProvider.notifier);
  return controller.getAccessToken();
});

/// Provider for accessing the full auth token
final authTokenProvider = Provider<AuthToken?>((ref) {
  final controller = ref.read(authControllerProvider.notifier);
  return controller.getAuthToken();
});