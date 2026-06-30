import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';

class TicketModel extends TicketEntity {
  const TicketModel({
    required super.id,
    required super.title,
    required super.description,
    required super.status,
    required super.priority,
    required super.createdAt,
    required super.updatedAt,
    super.resolvedAt,
    super.closedAt,
    required super.creatorId,
    super.assigneeId,
    super.categoryId,
    super.techSupportId, // Tambahkan super parameter ke entitas
    super.creator,
    super.assignee,
    super.category,
    super.attachments,
    super.commentCount,
    super.techSupport,
  });

  factory TicketModel.fromJson(Map<String, dynamic> json) {
    // Parse creator
    TicketUserRef? creator;
    if (json['creator'] != null) {
      final c = json['creator'] as Map<String, dynamic>;
      creator = TicketUserRef(
        id: c['id'] as String,
        fullName: c['fullName'] as String? ?? '',
        avatarUrl: c['avatarUrl'] as String?,
      );
    }

    // Parse assignee
    TicketUserRef? assignee;
    if (json['assignee'] != null) {
      final a = json['assignee'] as Map<String, dynamic>;
      assignee = TicketUserRef(
        id: a['id'] as String,
        fullName: a['fullName'] as String? ?? '',
        avatarUrl: a['avatarUrl'] as String?,
      );
    }

    // Parse category
    TicketCategoryRef? category;
    if (json['category'] != null) {
      final cat = json['category'] as Map<String, dynamic>;
      category = TicketCategoryRef(
        id: cat['id'] as String,
        name: cat['name'] as String? ?? '',
      );
    }

    // Parse Tech Support
    TicketTechSupportRef? techSupport;
    if (json['techSupport'] != null) {
      final ts = json['techSupport'] as Map<String, dynamic>;
      final tsUser =
          ts['user']
              as Map<
                String,
                dynamic
              >?; // Membaca nested object 'user' dari Hono

      techSupport = TicketTechSupportRef(
        id: ts['id'] as String,
        speciality:
            ts['speciality'] as String? ??
            ts['specialty'] as String? ??
            'SOFTWARE',
        fullName: tsUser?['fullName'] as String?,
        email: tsUser?['email'] as String?,
        avatarUrl: tsUser?['avatarUrl'] as String?,
        isActive: tsUser?['isActive'] as bool? ?? true,
      );
    }

    // Parse attachments list
    final rawAttachments = json['attachments'] as List<dynamic>? ?? [];
    final attachments = rawAttachments.map((a) {
      final att = a as Map<String, dynamic>;
      return AttachmentSummary(
        id: att['id'] as String,
        fileName: att['fileName'] as String? ?? '',
        fileUrl: att['fileUrl'] as String? ?? '',
        fileSize: att['fileSize'] as int? ?? 0,
        mimeType: att['mimeType'] as String? ?? '',
      );
    }).toList();

    // Comment count dari _count.comments
    final count = json['_count'] as Map<String, dynamic>?;
    final commentCount = count?['comments'] as int? ?? 0;

    return TicketModel(
      id: json['id'] as String,
      title: json['title'] as String,
      description: json['description'] as String? ?? '',
      status: TicketStatus.fromString(json['status'] as String?),
      priority: TicketPriority.fromString(json['priority'] as String?),
      createdAt: DateTime.parse(json['createdAt'] as String),
      updatedAt: DateTime.parse(
        json['updatedAt'] as String? ?? json['createdAt'] as String,
      ),
      resolvedAt: json['resolvedAt'] != null
          ? DateTime.parse(json['resolvedAt'] as String)
          : null,
      closedAt: json['closedAt'] != null
          ? DateTime.parse(json['closedAt'] as String)
          : null,
      creatorId: json['creatorId'] as String,
      assigneeId: json['assigneeId'] as String?,
      categoryId: json['categoryId'] as String?,
      techSupportId: json['techSupportId'] as String?,
      creator: creator,
      assignee: assignee,
      category: category,
      attachments: attachments,
      commentCount: commentCount,
      techSupport: techSupport, // 3. Alirkan hasil parsing ke model data
    );
  }

  Map<String, dynamic> toCreateJson() => {
    'title': title,
    'description': description,
    if (categoryId != null) 'categoryId': categoryId,
    'priority': priority
        .value, // Ubah ke .name jika enum-mu default atau sesuaikan dengan .value milikmu sebelumnya
  };
}
