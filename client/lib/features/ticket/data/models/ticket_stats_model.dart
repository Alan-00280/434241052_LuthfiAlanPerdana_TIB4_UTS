import 'package:helpdesk_ticketing/features/ticket/domain/entities/ticket_stats_entity.dart';

class TicketStatsModel extends TicketStatsEntity {
  const TicketStatsModel({
    required super.total,
    required super.open,
    required super.inProgress,
    required super.pending,
    required super.resolved,
    required super.closed,
  });

  // Factory untuk memproses object 'stats' langsung
  factory TicketStatsModel.fromJson(Map<String, dynamic> json) {
    return TicketStatsModel(
      total: json['total'] as int? ?? 0,
      open: json['open'] as int? ?? 0,
      inProgress: json['inProgress'] as int? ?? 0,
      pending: json['pending'] as int? ?? 0,
      resolved: json['resolved'] as int? ?? 0,
      closed: json['closed'] as int? ?? 0,
    );
  }

  // Factory jika kamu memasukkan full response API ke sini
  factory TicketStatsModel.fromApiResponse(Map<String, dynamic> response) {
    final statsJson = response['stats'] as Map<String, dynamic>? ?? {};
    return TicketStatsModel.fromJson(statsJson);
  }
}