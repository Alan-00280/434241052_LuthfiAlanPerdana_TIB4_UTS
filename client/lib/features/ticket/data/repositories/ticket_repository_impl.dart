import 'dart:io';

import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/core/utils/api_client.dart';
import 'package:helpdesk_ticketing/features/ticket/data/models/ticket_model.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/attachment_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/comment_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/history_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/paginated_result.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_stats_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/repositories/ticket_repository_contract.dart';
import 'package:helpdesk_ticketing/features/ticket/data/models/history_model.dart';
import 'package:helpdesk_ticketing/features/ticket/data/models/comment_model.dart';
import 'package:helpdesk_ticketing/features/ticket/data/models/attachment_model.dart';

class TicketRepositoryImpl implements TicketRepository {
  @override
  Future<PaginatedResult<TicketEntity>> getTickets({
    int page = 1,
    int limit = 10,
    TicketStatus? status,
    TicketPriority? priority,
    String? categoryId,
    String? assigneeId,
    String? creatorId,
    String? search,
  }) async {
    final query = <String, String?>{
      'page': page.toString(),
      'limit': limit.toString(),
      if (status != null) 'status': status.value,
      if (priority != null) 'priority': priority.value,
      if (categoryId != null) 'categoryId': categoryId,
      if (assigneeId != null) 'assigneeId': assigneeId,
      if (creatorId != null) 'creatorId': creatorId,
      if (search != null && search.isNotEmpty) 'search': search,
    };

    final response = await ApiClient.instance.get('/api/tickets', query: query);

    final ticketsList = (response['tickets'] as List?)
            ?.map((e) => TicketModel.fromJson(e as Map<String, dynamic>))
            .toList() ??
        [];
    final meta =
        PaginationMeta.fromJson(response['meta'] as Map<String, dynamic>);

    return PaginatedResult<TicketEntity>(items: ticketsList, meta: meta);
  }

  @override
  Future<void> assignTicket(String id, String assigneeId, String changedById) async {
    final body = {
      'assigneeId': assigneeId,
      'changedById': changedById,
    };
    await ApiClient.instance.patch('/api/tickets/$id/assign', body: body);
  }

  @override
  Future<CommentEntity> createComment(String ticketId, String authorId, String body) async {
    final response = await ApiClient.instance.post(
      '/api/tickets/$ticketId/comments', 
      body: {
        'authorId': authorId,
        'body': body,
      },
    );
    return CommentModel.fromJson(response['comment'] as Map<String, dynamic>);
  }

  @override
  Future<TicketEntity> createTicket({
    required String title,
    required String description,
    required String creatorId,
    String? categoryId,
    TicketPriority priority = TicketPriority.low,
    List<File>? attachments,
  }) async {
    if (attachments != null && attachments.isNotEmpty) {
      final fields = {
        'title': title,
        'description': description,
        'creatorId': creatorId,
        'priority': priority.value,
        if (categoryId != null) 'categoryId': categoryId,
      };
      final response = await ApiClient.instance.postMultipart(
        '/api/tickets',
        fields: fields,
        files: attachments,
        fileFieldName: 'attachments',
      );
      return TicketModel.fromJson(response['ticket'] as Map<String, dynamic>);
    } else {
      final body = {
        'title': title,
        'description': description,
        'creatorId': creatorId,
        'priority': priority.value,
        if (categoryId != null) 'categoryId': categoryId,
      };
      final response = await ApiClient.instance.post('/api/tickets', body: body);
      return TicketModel.fromJson(response['ticket'] as Map<String, dynamic>);
    }
  }

  @override
  Future<void> deleteAttachment(String ticketId, String attachmentId, String changedById) async {
    await ApiClient.instance.delete(
      '/api/tickets/$ticketId/attachments/$attachmentId',
      body: {'changedById': changedById},
    );
  }

  @override
  Future<void> deleteComment(String ticketId, String commentId) {
    throw UnimplementedError();
  }

  @override
  Future<void> deleteTicket(String id) {
    throw UnimplementedError();
  }

  @override
  Future<List<AttachmentEntity>> getAttachments(String ticketId) async {
    final response = await ApiClient.instance.get('/api/tickets/$ticketId/attachments');
    final attachments = response['attachments'] as List? ?? [];
    return attachments.map((e) => AttachmentModel.fromJson(e as Map<String, dynamic>)).toList();
  }

  @override
  Future<List<CommentEntity>> getComments(String ticketId) async {
    final response = await ApiClient.instance.get('/api/tickets/$ticketId/comments');
    final comments = response['comments'] as List? ?? [];
    return comments.map((e) => CommentModel.fromJson(e as Map<String, dynamic>)).toList();
  }

  @override
  Future<List<HistoryEntity>> getHistories(String ticketId) async {
    final response = await ApiClient.instance.get('/api/tickets/$ticketId/histories');
    final histories = response['histories'] as List? ?? [];
    return histories.map((e) => HistoryModel.fromJson(e as Map<String, dynamic>)).toList();
  }

  @override
  Future<TicketStatsEntity> getStats({String? userId}) async {
    final query = <String, String?>{
      if (userId != null) 'userId': userId,
    };
    final response = await ApiClient.instance.get('/api/tickets/stats', query: query);
    final stats = response['stats'] as Map<String, dynamic>;
    return TicketStatsEntity(
      total: stats['total'] as int? ?? 0,
      open: stats['open'] as int? ?? 0,
      inProgress: stats['inProgress'] as int? ?? 0,
      pending: stats['pending'] as int? ?? 0,
      resolved: stats['resolved'] as int? ?? 0,
      closed: stats['closed'] as int? ?? 0,
    );
  }

  @override
  Future<TicketEntity> getTicketById(String id) async {
    final response = await ApiClient.instance.get('/api/tickets/$id');
    return TicketModel.fromJson(response['ticket'] as Map<String, dynamic>);
  }

  @override
  Future<CommentEntity> updateComment(
    String ticketId,
    String commentId,
    String body,
  ) {
    throw UnimplementedError();
  }

  @override
  Future<void> updateStatus(String id, TicketStatus status, String changedById, {String? note}) async {
    final body = {
      'status': status.value,
      'changedById': changedById,
      if (note != null) 'note': note,
    };
    await ApiClient.instance.patch('/api/tickets/$id/status', body: body);
  }

  @override
  Future<TicketEntity> updateTicket(
    String id, {
    String? title,
    String? description,
    String? categoryId,
  }) {
    throw UnimplementedError();
  }

  @override
  Future<void> uploadAttachments(String ticketId, List<File> files, String changedById) async {
    if (files.isEmpty) return;
    await ApiClient.instance.postMultipart(
      '/api/tickets/$ticketId/attachments',
      files: files,
      fields: {'changedById': changedById},
      fileFieldName: 'attachments',
    );
  }
}
