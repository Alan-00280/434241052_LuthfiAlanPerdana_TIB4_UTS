import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';

final categoryListProvider = FutureProvider.autoDispose<List<TicketCategoryRef>>((ref) async {
  final response = await ApiClient.instance.get('/api/categories');
  final data = response['categories'] as List? ?? [];
  return data.map((e) {
    final map = e as Map<String, dynamic>;
    return TicketCategoryRef(
      id: map['id'] as String,
      name: map['name'] as String,
    );
  }).toList();
});
