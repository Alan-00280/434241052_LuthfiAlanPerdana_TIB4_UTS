import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'tech_support_provider.g.dart';

@riverpod
class TechSupportList extends _$TechSupportList {
  @override
  Future<List<TicketUserRef>> build() async {
    final response = await ApiClient.instance.get('/api/users/tech-supports');
    final data = response['techsupports'] as List? ?? [];
    
    return data.map((e) {
      final map = e as Map<String, dynamic>;
      
      String? speciality;
      if (map['techSupports'] != null && (map['techSupports'] as List).isNotEmpty) {
        final ts = (map['techSupports'] as List).first as Map<String, dynamic>;
        speciality = ts['speciality'] as String?;
      }

      return TicketUserRef(
        id: map['id'] as String,
        fullName: map['fullName'] as String,
        avatarUrl: map['avatarUrl'] as String?,
        speciality: speciality,
        isActive: map['isActive'] as bool? ?? true,
      );
    }).toList();
  }

  Future<void> refresh() async {
    ref.invalidateSelf();
    await future;
  }
}