import 'package:helpdesk_ticketing/features/auth/data/datasource/supabase_datasource.dart';
import 'package:helpdesk_ticketing/features/auth/domain/entities/user_entity.dart';
import 'package:helpdesk_ticketing/features/auth/domain/repositories/user_repository_contract.dart';

class AuthRepositoryImpl implements AuthRepository {
  final SupabaseAuthDataSource ds;

  AuthRepositoryImpl(this.ds);

  @override
  Future<UserEntity?> getCurrentUser() async {
    final user = await ds.getCurrentUser();
    if (user == null) return null;

    return UserEntity(
      id: user.id,
      email: user.email ?? '',
    );
  }

  @override
  Future<void> signIn(String email, String password) {
    return ds.signIn(email, password);
  }

  @override
  Future<void> signUp(String email, String password) {
    return ds.signUp(email, password);
  }

  @override
  Future<void> signOut() {
    return ds.signOut();
  }
}