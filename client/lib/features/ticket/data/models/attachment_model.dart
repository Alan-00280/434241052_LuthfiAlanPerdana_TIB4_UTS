import 'package:helpdesk_ticketing/features/ticket/domain/entities/attachment_entity.dart';

class AttachmentModel extends AttachmentEntity {
  const AttachmentModel({
    required super.id,
    required super.ticketId,
    required super.fileName,
    required super.fileUrl,
    required super.fileSize,
    required super.mimeType,
    required super.source,
    required super.uploadedAt,
  });

  factory AttachmentModel.fromJson(Map<String, dynamic> json) {
    return AttachmentModel(
      id: json['id'],
      ticketId: json['ticketId'],
      fileName: json['fileName'],
      fileUrl: json['fileUrl'],
      fileSize: json['fileSize'],
      mimeType: json['mimeType'],
      source: json['source'] ?? 'UPLOAD',
      uploadedAt: DateTime.parse(json['uploadedAt'] ?? json['createdAt']),
    );
  }
}
