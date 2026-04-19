import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';

final assigneeListProvider = FutureProvider.autoDispose<List<TicketUserRef>>((ref) async {
  final response = await ApiClient.instance.get('/api/users/assignees');
  final data = response['assignees'] as List? ?? [];
  return data.map((e) {
    final map = e as Map<String, dynamic>;
    return TicketUserRef(
      id: map['id'] as String,
      fullName: map['fullName'] as String,
      avatarUrl: map['avatarUrl'] as String?,
    );
  }).toList();
});
