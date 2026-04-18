/// Entitas komentar pada tiket.
/// Field sesuai dengan response API: /api/tickets/:id/comments
class CommentEntity {
  final String id;
  final String ticketId;
  final String authorId;
  final String body;
  final DateTime createdAt;
  final DateTime updatedAt;

  // Relasi
  final CommentAuthorRef? author;

  const CommentEntity({
    required this.id,
    required this.ticketId,
    required this.authorId,
    required this.body,
    required this.createdAt,
    required this.updatedAt,
    this.author,
  });
}

/// Representasi singkat author komentar
class CommentAuthorRef {
  final String id;
  final String fullName;
  final String? avatarUrl;
  final String role;

  const CommentAuthorRef({
    required this.id,
    required this.fullName,
    this.avatarUrl,
    required this.role,
  });
}
