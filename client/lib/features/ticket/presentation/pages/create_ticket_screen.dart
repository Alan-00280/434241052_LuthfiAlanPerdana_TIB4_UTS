import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/category_provider.dart';

class CreateTicketScreen extends ConsumerStatefulWidget {
  const CreateTicketScreen({super.key});

  @override
  ConsumerState<CreateTicketScreen> createState() => _CreateTicketScreenState();
}

class _CreateTicketScreenState extends ConsumerState<CreateTicketScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  TicketPriority _priority = TicketPriority.medium;
  String? _categoryId;
  bool _isLoading = false;

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    final user = ref.read(currentUserProvider);
    if (user == null) return;

    setState(() => _isLoading = true);
    try {
      final repository = ref.read(ticketRepositoryProvider);
      await repository.createTicket(
        title: _titleController.text,
        description: _descriptionController.text,
        creatorId: user.id,
        priority: _priority,
        categoryId: _categoryId,
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Tiket berhasil dibuat.')),
        );
        ref.invalidate(ticketListProvider);
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal membuat tiket: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final categoriesAsync = ref.watch(categoryListProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Buat Tiket Baru'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: ListView(
                  children: [
                    TextFormField(
                      controller: _titleController,
                      decoration: const InputDecoration(
                        labelText: 'Judul Tiket',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) =>
                          value == null || value.isEmpty ? 'Wajib diisi' : null,
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _descriptionController,
                      maxLines: 5,
                      decoration: const InputDecoration(
                        labelText: 'Deskripsi Detail',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) =>
                          value == null || value.isEmpty ? 'Wajib diisi' : null,
                    ),
                    const SizedBox(height: 16),
                    DropdownButtonFormField<TicketPriority>(
                      value: _priority,
                      decoration: const InputDecoration(
                        labelText: 'Prioritas',
                        border: OutlineInputBorder(),
                      ),
                      items: TicketPriority.values
                          .map(
                            (e) => DropdownMenuItem(
                              value: e,
                              child: Text(e.displayName),
                            ),
                          )
                          .toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _priority = val);
                      },
                    ),
                    const SizedBox(height: 16),
                    categoriesAsync.when(
                      data: (categories) => DropdownButtonFormField<String>(
                        value: _categoryId,
                        decoration: const InputDecoration(
                          labelText: 'Kategori (Opsional)',
                          border: OutlineInputBorder(),
                        ),
                        items: categories
                            .map((cat) => DropdownMenuItem(
                                  value: cat.id,
                                  child: Text(cat.name),
                                ))
                            .toList(),
                        onChanged: (val) => setState(() => _categoryId = val),
                      ),
                      loading: () => const LinearProgressIndicator(),
                      error: (err, stack) => Text('Gagal load kategori: $err'),
                    ),
                    const SizedBox(height: 32),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                      ),
                      onPressed: _submit,
                      child: const Text('Kirim Tiket', style: TextStyle(fontSize: 16)),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}