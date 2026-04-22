import 'package:helpdesk_ticketing/features/profile/domain/entities/profile_entity.dart';

abstract class ProfileRepository {
  /// GET /api/users/:id
  Future<ProfileEntity> getProfile(String id, {bool supaId = false});

  /// PUT /api/users/:id
  Future<ProfileEntity> updateProfile(
    String id, {
    String? fullName,
    String? phone,
    String? avatarUrl,
  });
}
