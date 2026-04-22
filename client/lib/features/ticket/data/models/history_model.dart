import 'package:helpdesk_ticketing/features/ticket/domain/entities/history_entity.dart';
import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';

class HistoryModel extends HistoryEntity {
  const HistoryModel({
    required super.id,
    required super.ticketId,
    required super.changedById,
    required super.field,
    required super.createdAt,
    super.oldValue,
    super.newValue,
    super.note,
    super.changedBy,
  });

  factory HistoryModel.fromJson(Map<String, dynamic> json) {
    return HistoryModel(
      id: json['id'],
      ticketId: json['ticketId'],
      changedById: json['changedById'],
      field: json['field'],
      oldValue: json['oldValue'],
      newValue: json['newValue'],
      note: json['note'],
      createdAt: DateTime.parse(json['createdAt']),
      changedBy: json['changedBy'] != null
          ? TicketUserRef(
              id: json['changedBy']['id'],
              fullName: json['changedBy']['fullName'],
              avatarUrl: json['changedBy']['avatarUrl'],
            )
          : null,
    );
  }
}
