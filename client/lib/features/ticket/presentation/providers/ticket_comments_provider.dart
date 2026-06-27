import 'dart:async';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_riverpod/legacy.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/comment_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/repositories/ticket_repository_contract.dart';

class TicketCommentsNotifier extends StateNotifier<AsyncValue<List<CommentEntity>>> {
  final TicketRepository _repository;
  final String _ticketId;

  TicketCommentsNotifier(this._repository, this._ticketId) : super(const AsyncValue.loading()) {
    loadComments();
  }

  Future<void> loadComments() async {
    try {
      final comments = await _repository.getComments(_ticketId);
      state = AsyncValue.data(comments);
    } catch (e, stackTrace) {
      state = AsyncValue.error(e, stackTrace);
    }
  }

  void addComment(CommentEntity comment) {
    state.whenData((currentComments) {
      // Cek duplikasi ID
      if (currentComments.any((c) => c.id == comment.id)) return;
      state = AsyncValue.data([...currentComments, comment]);
    });
  }
}

final ticketCommentsProvider = StateNotifierProvider.family.autoDispose<
    TicketCommentsNotifier,
    AsyncValue<List<CommentEntity>>,
    String
>((ref, ticketId) {
  final repository = ref.watch(ticketRepositoryProvider);
  return TicketCommentsNotifier(repository, ticketId);
});
