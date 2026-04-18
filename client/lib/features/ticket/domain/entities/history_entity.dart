/// Entitas riwayat/history tiket.
/// Field sesuai dengan response API: /api/tickets/:id/histories
class HistoryEntity {
  final String id;
  final String ticketId;
  final String? actorId;
  final String action;
  final String? fromValue;
  final String? toValue;
  final DateTime createdAt;

  const HistoryEntity({
    required this.id,
    required this.ticketId,
    this.actorId,
    required this.action,
    this.fromValue,
    this.toValue,
    required this.createdAt,
  });

  /// Deskripsi human-readable
  String get description {
    switch (action) {
      case 'status_changed':
        return 'Status berubah dari "$fromValue" ke "$toValue"';
      case 'assigned':
        return 'Tiket di-assign ke "$toValue"';
      case 'comment_added':
        return 'Komentar baru ditambahkan';
      case 'created':
        return 'Tiket dibuat';
      default:
        return action;
    }
  }
}
