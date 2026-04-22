import 'package:helpdesk_ticketing/features/auth/domain/entities/user_entity.dart';

abstract class AuthRepository {
  /// Cek session Supabase yang aktif dan ambil profil user dari API
  Future<UserEntity?> getCurrentUser();

  /// Login via Supabase, lalu ambil profil dari API backend
  Future<UserEntity> signIn(String email, String password);

  Future<void> signUp(String email, String password);
  Future<void> registerToServer(Map<String, dynamic> data);
  Future<void> signOut();
}