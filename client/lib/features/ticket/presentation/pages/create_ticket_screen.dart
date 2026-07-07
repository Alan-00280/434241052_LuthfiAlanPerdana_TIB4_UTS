import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:file_picker/file_picker.dart';
import 'package:helpdesk_ticketing/core/enums/ticket_priority.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/category_provider.dart';

import 'package:helpdesk_ticketing/core/widgets/custom_app_bar.dart';

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
  final List<File> _attachments = [];
  final _picker = ImagePicker();
  bool _isLoading = false;

  Future<void> _pickFiles() async {
    final result = await FilePicker.platform.pickFiles(
      allowMultiple: true,
      type: FileType.custom,
      allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'docx', 'md', 'json'],
    );
    if (result != null && result.paths.isNotEmpty) {
      final validFiles = result.paths.where((path) => path != null).map((path) => File(path!)).toList();
      await _processPickedFiles(validFiles);
    }
  }

  Future<void> _pickImageSource(ImageSource source) async {
    final xFile = await _picker.pickImage(source: source);
    if (xFile != null) {
      await _processPickedFiles([File(xFile.path)]);
    }
  }

  Future<void> _processPickedFiles(List<File> files) async {
    for (var file in files) {
      final length = await file.length();
      if (length > 6 * 1024 * 1024) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('File ${file.path.split('/').last} terlalu besar. Maks 6MB.')),
          );
        }
        continue;
      }
      setState(() {
        _attachments.add(file);
      });
    }
  }

  void _removeAttachment(int index) {
    setState(() {
      _attachments.removeAt(index);
    });
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final user = ref.read(currentUserProvider);
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Anda belum login.')),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final repository = ref.read(ticketRepositoryProvider);
      
      await repository.createTicket(
        title: _titleController.text.trim(),
        description: _descriptionController.text.trim(),
        priority: _priority,
        categoryId: _categoryId,
        creatorId: user.id,
        attachments: _attachments,
      );

      // if (_attachments.isNotEmpty) {
      //   await repository.uploadAttachments(ticket.id, _attachments, user.id);
      // }

      if (mounted) {
        ref.invalidate(ticketListProvider);
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Tiket berhasil dibuat.')),
        );
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal membuat tiket: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  void _showAttachmentOptions() {
    showModalBottomSheet(
      context: context,
      builder: (ctx) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.file_present),
              title: const Text('Pilih Dokumen'),
              onTap: () {
                Navigator.pop(ctx);
                _pickFiles();
              },
            ),
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Ambil Foto'),
              onTap: () {
                Navigator.pop(ctx);
                _pickImageSource(ImageSource.camera);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Pilih dari Galeri'),
              onTap: () {
                Navigator.pop(ctx);
                _pickImageSource(ImageSource.gallery);
              },
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final categoriesAsync = ref.watch(categoryListProvider);

    return Scaffold(
      appBar: const CustomAppBar(
        title: 'Buat Tiket Baru',
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
                    const SizedBox(height: 24),
                    Text(
                      'Lampiran Berkas (Opsional)',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey.shade300),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              OutlinedButton.icon(
                                onPressed: _pickFiles,
                                icon: const Icon(Icons.attach_file),
                                label: const Text('Pilih Berkas'),
                              ),
                              const SizedBox(width: 8),
                              OutlinedButton.icon(
                                onPressed: () => _pickImageSource(ImageSource.camera),
                                icon: const Icon(Icons.camera_alt),
                                label: const Text('Kamera'),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Maks. 5MB per file.',
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          if (_attachments.isNotEmpty) ...[
                            const SizedBox(height: 16),
                            Wrap(
                              spacing: 8,
                              runSpacing: 8,
                              children: _attachments.asMap().entries.map((entry) {
                                final index = entry.key;
                                final file = entry.value;
                                return Chip(
                                  label: Text(
                                    file.path.split('/').last,
                                    style: const TextStyle(fontSize: 12),
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  onDeleted: () => _removeAttachment(index),
                                  deleteIcon: const Icon(Icons.close, size: 18),
                                );
                              }).toList(),
                            ),
                          ],
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        foregroundColor: Theme.of(context).brightness == Brightness.dark ? Colors.white : null,
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