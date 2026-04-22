import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/profile/data/models/profile_model.dart';
import 'package:helpdesk_ticketing/features/profile/domain/entities/profile_entity.dart';
import 'package:helpdesk_ticketing/features/profile/domain/repositories/profile_repository_contract.dart';

class ProfileRepositoryImpl implements ProfileRepository {
  @override
  Future<ProfileEntity> getProfile(String id, {bool supaId = false}) async {
    final query = <String, String>{
      if (supaId) 'supaId': 'true',
    };
    final response = await ApiClient.instance.get('/api/users/$id', query: query);
    final userData = response['user'] as Map<String, dynamic>;
    return ProfileModel.fromJson(userData);
  }

  @override
  Future<ProfileEntity> updateProfile(
    String id, {
    String? fullName,
    String? phone,
    String? avatarUrl,
  }) async {
    final body = <String, dynamic>{
      if (fullName != null) 'fullName': fullName,
      if (phone != null) 'phone': phone,
      if (avatarUrl != null) 'avatarUrl': avatarUrl,
    };
    final response = await ApiClient.instance.put('/api/users/$id', body: body);
    final userData = response['user'] as Map<String, dynamic>;
    return ProfileModel.fromJson(userData);
  }
}
