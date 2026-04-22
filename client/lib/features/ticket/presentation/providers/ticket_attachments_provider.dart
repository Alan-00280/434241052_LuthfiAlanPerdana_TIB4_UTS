import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/attachment_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

final ticketAttachmentsProvider = FutureProvider.family.autoDispose<List<AttachmentEntity>, String>((ref, ticketId) async {
  final repository = ref.watch(ticketRepositoryProvider);
  return repository.getAttachments(ticketId);
});
