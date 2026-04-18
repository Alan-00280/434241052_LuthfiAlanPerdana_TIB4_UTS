import 'package:helpdesk_ticketing/core/enums/user_role.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/auth/data/datasource/supabase_datasource.dart';
import 'package:helpdesk_ticketing/features/auth/domain/entities/user_entity.dart';
import 'package:helpdesk_ticketing/features/auth/domain/repositories/user_repository_contract.dart';

class AuthRepositoryImpl implements AuthRepository {
  final SupabaseAuthDataSource ds;

  AuthRepositoryImpl(this.ds);

  @override
  Future<UserEntity?> getCurrentUser() async {
    final supabaseUser = await ds.getCurrentUser();
    if (supabaseUser == null) return null;

    // Ambil profil lengkap dari API backend
    try {
      final data = await ApiClient.instance.get(
        '/api/users/${supabaseUser.id}?supaId=true',
      );
      if (data == null) return null;
      return _mapToEntity(data as Map<String, dynamic>);
    } catch (_) {
      // Fallback: pakai data Supabase metadata kalau API gagal
      final meta = supabaseUser.userMetadata ?? {};
      return UserEntity(
        id: supabaseUser.id,
        username:
            meta['username'] as String? ??
            supabaseUser.email?.split('@').first ??
            '',
        email: supabaseUser.email ?? '',
        fullName: meta['full_name'] as String? ?? '',
        role: UserRole.fromString(meta['role'] as String?),
        avatarUrl: meta['avatar_url'] as String?,
      );
    }
  }

  @override
  Future<UserEntity> signIn(String email, String password) async {
    // 1. Login via Supabase untuk dapat session token
    final session = await ds.signIn(email, password);
    final token = session.session?.accessToken;

    // 2. Simpan token ke ApiClient agar request berikutnya terautentikasi
    ApiClient.instance.setToken(token);

    // 3. Ambil profil user dari API backend
    final supabaseUser = session.user;
    if (supabaseUser == null) {
      throw Exception('Login berhasil tapi data user tidak ditemukan.');
    }

    final data = await ApiClient.instance.get(
      '/api/users/${supabaseUser.id}?supaId=true',
    );
    print(data);
    return _mapToEntity(data);
  }

  @override
  Future<void> signUp(String email, String password) {
    return ds.signUp(email, password);
  }

  @override
  Future<void> signOut() async {
    ApiClient.instance.setToken(null);
    return ds.signOut();
  }

  UserEntity _mapToEntity(Map<String, dynamic> json) {
    // Masuk ke dalam node 'user' karena API mengembalikan { "user": { ... } }
    final userData = json['user'] as Map<String, dynamic>?;

    if (userData == null) {
      throw Exception("Data user tidak ditemukan dalam response");
    }

    return UserEntity(
      // Gunakan userData, bukan json
      id: userData['id'] as String? ?? '',
      username: userData['username'] as String? ?? '',
      email: userData['email'] as String? ?? '',
      fullName: userData['fullName'] as String? ?? '',
      role: UserRole.fromString(userData['role'] as String?),
      phone: userData['phone'] as String?,
      avatarUrl: userData['avatarUrl'] as String?,
      isActive: userData['isActive'] as bool? ?? true,
    );
  }
}
