import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';

/// Representasi singkat user di dalam relasi tiket (creator / assignee)
class TicketUserRef {
  final String id;
  final String fullName;
  final String? avatarUrl;

  const TicketUserRef({
    required this.id,
    required this.fullName,
    this.avatarUrl,
  });
}

/// Representasi singkat kategori
class TicketCategoryRef {
  final String id;
  final String name;

  const TicketCategoryRef({required this.id, required this.name});
}

/// Entitas tiket helpdesk.
/// Field sesuai dengan response API: /api/tickets
class TicketEntity {
  final String id;
  final String title;
  final String description;
  final TicketStatus status;
  final TicketPriority priority;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? resolvedAt;
  final DateTime? closedAt;

  final String creatorId;
  final String? assigneeId;
  final String? categoryId;

  // Relasi yang di-join oleh API
  final TicketUserRef? creator;
  final TicketUserRef? assignee;
  final TicketCategoryRef? category;

  final List<AttachmentSummary> attachments;
  final int commentCount;

  const TicketEntity({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.priority,
    required this.createdAt,
    required this.updatedAt,
    this.resolvedAt,
    this.closedAt,
    required this.creatorId,
    this.assigneeId,
    this.categoryId,
    this.creator,
    this.assignee,
    this.category,
    this.attachments = const [],
    this.commentCount = 0,
  });
}

/// Ringkasan attachment yang muncul di dalam list tiket
class AttachmentSummary {
  final String id;
  final String fileName;
  final String fileUrl;
  final int fileSize;
  final String mimeType;

  const AttachmentSummary({
    required this.id,
    required this.fileName,
    required this.fileUrl,
    required this.fileSize,
    required this.mimeType,
  });
}
