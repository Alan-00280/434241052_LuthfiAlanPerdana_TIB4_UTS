import 'package:helpdesk_ticketing/features/ticket/domain/entities/comment_entity.dart';

class CommentModel extends CommentEntity {
  const CommentModel({
    required super.id,
    required super.ticketId,
    required super.authorId,
    required super.body,
    required super.createdAt,
    required super.updatedAt,
    super.author,
  });

  factory CommentModel.fromJson(Map<String, dynamic> json) {
    return CommentModel(
      id: json['id'],
      ticketId: json['ticketId'],
      authorId: json['authorId'],
      body: json['body'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      author: json['author'] != null
          ? CommentAuthorRef(
              id: json['author']['id'],
              fullName: json['author']['fullName'],
              avatarUrl: json['author']['avatarUrl'],
              role: json['author']['role'],
            )
          : null,
    );
  }
}
