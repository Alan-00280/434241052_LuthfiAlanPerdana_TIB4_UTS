import 'package:flutter/material.dart';

class AssignTicketScreen extends StatelessWidget {
  final String ticketId;

  const AssignTicketScreen({super.key, required this.ticketId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Assign Ticket Screen: $ticketId'),
      ),
    );
  }
}