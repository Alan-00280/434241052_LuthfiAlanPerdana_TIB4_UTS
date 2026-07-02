/// Entitas statistik tiket dari API: /api/tickets/stats
class TicketStatsEntity {
  final int total;
  final int open;
  final int assigned;
  final int inProgress;
  final int pending;
  final int resolved;
  final int closed;

  const TicketStatsEntity({
    required this.total,
    required this.open,
    required this.assigned,
    required this.inProgress,
    required this.pending,
    required this.resolved,
    required this.closed,
  });
}
