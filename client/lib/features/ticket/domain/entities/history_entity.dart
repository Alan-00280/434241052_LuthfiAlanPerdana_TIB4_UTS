import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_entity.dart';

/// Entitas riwayat/history tiket.
/// Field sesuai dengan response API: /api/tickets/:id/histories
class HistoryEntity {
  final String id;
  final String ticketId;
  final String changedById;
  final String field;
  final String? oldValue;
  final String? newValue;
  final String? note;
  final DateTime createdAt;
  final TicketUserRef? changedBy;

  const HistoryEntity({
    required this.id,
    required this.ticketId,
    required this.changedById,
    required this.field,
    this.oldValue,
    this.newValue,
    this.note,
    required this.createdAt,
    this.changedBy,
  });

  /// Deskripsi human-readable
  String get description {
  switch (field) {
    case 'status':
      return 'mengubah status menjadi ${newValue ?? ''}';

    case 'assignee':
      return 'meng-assign tiket ke ${newValue ?? ''}';

    case 'add_attachment':
      final count = int.tryParse(newValue ?? '0') ?? 0;
      return count > 1
          ? 'menambahkan $count lampiran'
          : 'menambahkan lampiran';

    case 'delete_attachment':
      return 'menghapus lampiran ${oldValue ?? ''}';

    default:
      return field;
  }
}
}
