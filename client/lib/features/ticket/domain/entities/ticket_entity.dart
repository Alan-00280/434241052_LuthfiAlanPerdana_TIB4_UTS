import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'dart:convert';

/// Representasi singkat user di dalam relasi tiket (creator / assignee)
class TicketUserRef {
  final String id;
  final String fullName;
  final String? avatarUrl;
  final String? speciality;

  const TicketUserRef({
    required this.id,
    required this.fullName,
    this.avatarUrl,
    this.speciality,
  });

  factory TicketUserRef.fromMap(Map<String, dynamic> map) {
    return TicketUserRef(
      id: map['id'] ?? '',
      fullName: map['fullName'] ?? '',
      avatarUrl: map['avatarUrl'],
    );
  }
}

/// Representasi ticket tech support
class TicketTechSupportRef {
  final String id;
  final String speciality;
  final String? fullName;
  final String? email;
  final String? avatarUrl;

  const TicketTechSupportRef({
    required this.id,
    required this.speciality,
    this.fullName,
    this.email,
    this.avatarUrl,
  });
}

/// Representasi singkat kategori
class TicketCategoryRef {
  final String id;
  final String name;

  const TicketCategoryRef({required this.id, required this.name});

  factory TicketCategoryRef.fromMap(Map<String, dynamic> map) {
    return TicketCategoryRef(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
    );
  }
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

  factory AttachmentSummary.fromMap(Map<String, dynamic> map) {
    return AttachmentSummary(
      id: map['id'] ?? '',
      fileName: map['fileName'] ?? '',
      fileUrl: map['fileUrl'] ?? '',
      fileSize: map['fileSize'] ?? 0,
      mimeType: map['mimeType'] ?? '',
    );
  }
}

/// Entitas tiket helpdesk.
/// Field disesuaikan dengan response API backend Hono.
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
  final String? techSupportId; // Ditambahkan sesuai update backend terbarumu
  final TicketTechSupportRef? techSupport;

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
    this.techSupportId,
    this.creator,
    this.assignee,
    this.category,
    this.attachments = const [],
    this.commentCount = 0,
    this.techSupport,
  });

  /// Fungsi copyWith untuk memudahkan update state di Riverpod/Bloc
  TicketEntity copyWith({
    String? id,
    String? title,
    String? description,
    TicketStatus? status,
    TicketPriority? priority,
    DateTime? createdAt,
    DateTime? updatedAt,
    DateTime? resolvedAt,
    DateTime? closedAt,
    String? creatorId,
    String? assigneeId,
    String? categoryId,
    String? techSupportId,
    TicketUserRef? creator,
    TicketUserRef? assignee,
    TicketCategoryRef? category,
    List<AttachmentSummary>? attachments,
    int? commentCount,
  }) {
    return TicketEntity(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      status: status ?? this.status,
      priority: priority ?? this.priority,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      resolvedAt: resolvedAt ?? this.resolvedAt,
      closedAt: closedAt ?? this.closedAt,
      creatorId: creatorId ?? this.creatorId,
      assigneeId: assigneeId ?? this.assigneeId,
      categoryId: categoryId ?? this.categoryId,
      techSupportId: techSupportId ?? this.techSupportId,
      creator: creator ?? this.creator,
      assignee: assignee ?? this.assignee,
      category: category ?? this.category,
      attachments: attachments ?? this.attachments,
      commentCount: commentCount ?? this.commentCount,
    );
  }

  /// Map parser dari JSON API Hono
  factory TicketEntity.fromMap(Map<String, dynamic> map) {
    return TicketEntity(
      id: map['id'] ?? '',
      title: map['title'] ?? '',
      description: map['description'] ?? '',
      status: TicketStatus.fromString(map['status'] ?? 'OPEN'),
      priority: TicketPriority.fromString(map['priority'] ?? 'LOW'),
      createdAt: map['createdAt'] != null ? DateTime.parse(map['createdAt']) : DateTime.now(),
      updatedAt: map['updatedAt'] != null ? DateTime.parse(map['updatedAt']) : DateTime.now(),
      resolvedAt: map['resolvedAt'] != null ? DateTime.parse(map['resolvedAt']) : null,
      closedAt: map['closedAt'] != null ? DateTime.parse(map['closedAt']) : null,
      creatorId: map['creatorId'] ?? '',
      assigneeId: map['assigneeId'],
      categoryId: map['categoryId'],
      techSupportId: map['techSupportId'],
      creator: map['creator'] != null ? TicketUserRef.fromMap(map['creator']) : null,
      assignee: map['assignee'] != null ? TicketUserRef.fromMap(map['assignee']) : null,
      category: map['category'] != null ? TicketCategoryRef.fromMap(map['category']) : null,
      attachments: map['attachments'] != null
          ? List<AttachmentSummary>.from(map['attachments']?.map((x) => AttachmentSummary.fromMap(x)))
          : const [],
      commentCount: map['commentCount'] ?? 0,
    );
  }

  factory TicketEntity.fromJson(String source) => TicketEntity.fromMap(json.decode(source));
}
