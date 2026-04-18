import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'route_names.dart';

/// Helper navigasi — gunakan ini sebagai ganti hardcode path di widget.
class AppNavigation {
  AppNavigation._();

  static void goToLogin(BuildContext context) =>
      context.go(AppRoutes.login);

  static void goToDashboard(BuildContext context) =>
      context.go(AppRoutes.dashboard);

  static void goToTickets(BuildContext context) =>
      context.go(AppRoutes.tickets);

  static void goToTicketDetail(BuildContext context, String ticketId) =>
      context.go(AppRoutes.ticketDetailPath(ticketId));

  static void goToCreateTicket(BuildContext context) =>
      context.push(AppRoutes.createTicket);

  static void goToAssignTicket(BuildContext context, String ticketId) =>
      context.push(AppRoutes.assignTicketPath(ticketId));

  static void goToProfile(BuildContext context) =>
      context.go(AppRoutes.profile);

  static void pop(BuildContext context) => context.pop();
}
