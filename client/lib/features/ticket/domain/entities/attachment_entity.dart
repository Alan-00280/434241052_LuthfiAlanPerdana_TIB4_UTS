/// Entitas attachment tiket.
/// Field sesuai dengan response API: /api/tickets/:id/attachments
class AttachmentEntity {
  final String id;
  final String ticketId;
  final String fileName;
  final String fileUrl;
  final int fileSize;
  final String mimeType;
  final String source; // e.g. "CAMERA", "FILE_PICKER"
  final DateTime uploadedAt;

  const AttachmentEntity({
    required this.id,
    required this.ticketId,
    required this.fileName,
    required this.fileUrl,
    required this.fileSize,
    required this.mimeType,
    required this.source,
    required this.uploadedAt,
  });

  /// Apakah file ini adalah gambar
  bool get isImage => mimeType.startsWith('image/');

  /// Ukuran file dalam format yang mudah dibaca (KB/MB)
  String get readableSize {
    if (fileSize < 1024) return '${fileSize}B';
    if (fileSize < 1024 * 1024) return '${(fileSize / 1024).toStringAsFixed(1)}KB';
    return '${(fileSize / (1024 * 1024)).toStringAsFixed(1)}MB';
  }
}
