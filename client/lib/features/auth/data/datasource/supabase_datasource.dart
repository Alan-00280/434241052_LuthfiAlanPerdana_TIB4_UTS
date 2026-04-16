import 'package:supabase_flutter/supabase_flutter.dart';

class SupabaseAuthDataSource {
  final client = Supabase.instance.client;

  Future<User?> getCurrentUser() async {
    return client.auth.currentUser;
  }

  Future<void> signIn(String email, String password) async {
    await client.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  Future<void> signUp(String email, String password) async {
    await client.auth.signUp(
      email: email,
      password: password,
    );
  }

  Future<void> signOut() async {
    await client.auth.signOut();
  }
}