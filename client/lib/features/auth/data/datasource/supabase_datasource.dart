import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseAuthDataSource {
  final _client = Supabase.instance.client;

  Future<User?> getCurrentUser() async {
    return _client.auth.currentUser;
  }

  /// Login dan kembalikan AuthResponse (berisi session + user)
  Future<AuthResponse> signIn(String email, String password) async {
    return _client.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signUp(String email, String password) async {
    await _client.auth.signUp(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() async {
    await _client.auth.signOut();
  }
}
