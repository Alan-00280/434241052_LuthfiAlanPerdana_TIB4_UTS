import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_status.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';

class UpdateStatusDialog extends ConsumerStatefulWidget {
  final String ticketId;
  final TicketStatus initialStatus;
  final String userId;

  const UpdateStatusDialog({
    required this.ticketId,
    required this.initialStatus,
    required this.userId,
  });

  @override
  ConsumerState<UpdateStatusDialog> createState() => UpdateStatusDialogState();
}

class UpdateStatusDialogState extends ConsumerState<UpdateStatusDialog> {
  late TicketStatus _selectedStatus;
  final _noteController = TextEditingController();
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _selectedStatus = widget.initialStatus;
  }

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() => _isLoading = true);
    try {
      final repo = ref.read(ticketRepositoryProvider);
      await repo.updateStatus(
        widget.ticketId,
        _selectedStatus,
        widget.userId,
        note: _noteController.text.trim().isEmpty ? null : _noteController.text.trim(),
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Status berhasil diperbarui.')),
        );
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal memperbarui status: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Ubah Status Tiket'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          DropdownButtonFormField<TicketStatus>(
            value: _selectedStatus,
            decoration: const InputDecoration(
              labelText: 'Pilih Status',
              border: OutlineInputBorder(),
            ),
            items: TicketStatus.values
                .map((status) => DropdownMenuItem(
                      value: status,
                      child: Text(status.displayName),
                    ))
                .toList(),
            onChanged: (val) {
              if (val != null) setState(() => _selectedStatus = val);
            },
          ),
          const SizedBox(height: 16),
          TextField(
            controller: _noteController,
            decoration: const InputDecoration(
              labelText: 'Catatan (Opsional)',
              border: OutlineInputBorder(),
            ),
            maxLines: 2,
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: _isLoading ? null : () => Navigator.of(context).pop(),
          child: const Text('Batal'),
        ),
        ElevatedButton(
          onPressed: _isLoading ? null : _submit,
          child: _isLoading
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Text('Ubah'),
        ),
      ],
    );
  }
}
