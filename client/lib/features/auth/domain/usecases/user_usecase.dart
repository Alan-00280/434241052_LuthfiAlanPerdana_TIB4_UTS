import 'package:helpdesk_ticketing/features/auth/domain/repositories/user_repository_contract.dart';

class SignIn {
  final AuthRepository repo;
  SignIn(this.repo);

  Future<void> call(String email, String password) {
    return repo.signIn(email, password);
  }
}