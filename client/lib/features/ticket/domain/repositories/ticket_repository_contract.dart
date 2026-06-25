import 'dart:io';

import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/attachment_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/comment_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/history_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/paginated_result.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_stats_entity.dart';

abstract class TicketRepository {
  // ─── Tickets ──────────────────────────────────────────────────────────

  /// GET /api/tickets
  Future<PaginatedResult<TicketEntity>> getTickets({
    int page = 1,
    int limit = 10,
    TicketStatus? status,
    TicketPriority? priority,
    String? categoryId,
    String? assigneeId,
    String? creatorId,
    String? search,
  });

  /// GET /api/tickets/stats
  Future<TicketStatsEntity> getStats({String? userId});

  /// GET /api/tickets/:id
  Future<TicketEntity> getTicketById(String id);

  /// POST /api/tickets
  Future<TicketEntity> createTicket({
    required String title,
    required String description,
    required String creatorId,
    String? categoryId,
    TicketPriority priority = TicketPriority.low,
    List<File>? attachments,
  });

  /// PUT /api/tickets/:id
  Future<TicketEntity> updateTicket(
    String id, {
    String? title,
    String? description,
    String? categoryId,
  });

  /// PATCH /api/tickets/:id/status
  Future<void> updateStatus(String id, TicketStatus status, String changedById, {String? note});

  /// PATCH /api/tickets/:id/assign
  Future<void> assignTicket(String id, String assigneeId, String changedById, String techSupportId);

  /// DELETE /api/tickets/:id
  Future<void> deleteTicket(String id);

  // ─── Comments ─────────────────────────────────────────────────────────

  /// GET /api/tickets/:id/comments
  Future<List<CommentEntity>> getComments(String ticketId);

  /// POST /api/tickets/:id/comments
  Future<CommentEntity> createComment(String ticketId, String authorId, String body);

  /// PUT /api/tickets/:id/comments/:commentId
  Future<CommentEntity> updateComment(
    String ticketId,
    String commentId,
    String body,
  );

  /// DELETE /api/tickets/:id/comments/:commentId
  Future<void> deleteComment(String ticketId, String commentId);

  // ─── Attachments ──────────────────────────────────────────────────────

  /// GET /api/tickets/:id/attachments
  Future<List<AttachmentEntity>> getAttachments(String ticketId);

  /// Upload file attachment (multipart POST)
  Future<void> uploadAttachments(String ticketId, List<File> files, String changedById);

  /// DELETE /api/tickets/:id/attachments/:attachmentId
  Future<void> deleteAttachment(String ticketId, String attachmentId, String changedById);

  // ─── History ──────────────────────────────────────────────────────────

  /// GET /api/tickets/:id/histories
  Future<List<HistoryEntity>> getHistories(String ticketId);
}
