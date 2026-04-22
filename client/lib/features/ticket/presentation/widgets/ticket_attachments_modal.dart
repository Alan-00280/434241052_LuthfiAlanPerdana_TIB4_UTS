import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_attachments_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class TicketAttachmentsModal extends ConsumerStatefulWidget {
  final String ticketId;

  const TicketAttachmentsModal({required this.ticketId});

  @override
  ConsumerState<TicketAttachmentsModal> createState() => TicketAttachmentsModalState();
}

class TicketAttachmentsModalState extends ConsumerState<TicketAttachmentsModal> {
  bool _isLoading = false;

  String _getPublicUrl(String fileUrl) {
    var path = fileUrl;
    if (path.startsWith('tickets/')) {
      path = path.replaceFirst('tickets/', '');
    }
    return Supabase.instance.client.storage.from('tickets').getPublicUrl(path);
  }

  Future<void> _downloadFile(String publicUrl) async {
    final uri = Uri.parse(publicUrl);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri, mode: LaunchMode.externalApplication);
    }
  }

  Future<void> _pickAndUpload() async {
    final result = await FilePicker.pickFiles(
      allowMultiple: true,
      type: FileType.custom,
      allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'docx', 'md', 'json'],
    );
    if (result != null && result.paths.isNotEmpty) {
      final validFiles = result.paths.where((path) => path != null).map((path) => File(path!)).toList();
      
      const maxFileSize = 6 * 1024 * 1024; // 6 MB based on API Spec
      List<File> toUpload = [];
      bool hasExceeded = false;
      
      for (final file in validFiles) {
        final size = await file.length();
        if (size > maxFileSize) {
          hasExceeded = true;
        } else {
          toUpload.add(file);
        }
      }

      if (hasExceeded && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Ada berkas berukuran lebih dari 6MB yang diabaikan.')),
        );
      }

      if (toUpload.isEmpty) return;

      final user = ref.read(currentUserProvider);
      if (user == null) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Sesi tidak valid.')));
        }
        return;
      }

      setState(() => _isLoading = true);
      try {
        await ref.read(ticketRepositoryProvider).uploadAttachments(widget.ticketId, toUpload, user.id);
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Lampiran berhasil diunggah.')),
          );
        }
        ref.invalidate(ticketAttachmentsProvider(widget.ticketId));
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Gagal mengunggah lampiran: $e')),
          );
        }
      } finally {
        if (mounted) setState(() => _isLoading = false);
      }
    }
  }

  Future<void> _deleteAttachment(String attachmentId) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Hapus Lampiran'),
        content: const Text('Apakah Anda yakin ingin menghapus lampiran ini?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(ctx).pop(false),
            child: const Text('Batal'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            onPressed: () => Navigator.of(ctx).pop(true),
            child: const Text('Hapus', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );

    if (confirm != true) return;

    final user = ref.read(currentUserProvider);
    if (user == null) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Sesi tidak valid.')));
      }
      return;
    }

    setState(() => _isLoading = true);
    try {
      await ref.read(ticketRepositoryProvider).deleteAttachment(widget.ticketId, attachmentId, user.id);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Lampiran berhasil dihapus.')),
        );
      }
      ref.invalidate(ticketAttachmentsProvider(widget.ticketId));
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal menghapus lampiran: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final attachmentsAsync = ref.watch(ticketAttachmentsProvider(widget.ticketId));

    return DraggableScrollableSheet(
      initialChildSize: _isLoading ? 0.6 : 0.6,
      minChildSize: 0.3,
      maxChildSize: 0.9,
      expand: false,
      builder: (context, scrollController) {
        return Stack(
          children: [
            attachmentsAsync.when(
              data: (attachments) {
                return Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        children: [
                          const Text(
                            'Daftar Lampiran',
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          const Spacer(),
                          TextButton.icon(
                            onPressed: _isLoading ? null : _pickAndUpload,
                            icon: const Icon(Icons.upload_file),
                            label: const Text('+'),
                          ),
                          if (attachments.isNotEmpty)
                            TextButton.icon(
                              onPressed: _isLoading ? null : () async {
                                for (var att in attachments) {
                                  await _downloadFile(_getPublicUrl(att.fileUrl));
                                  await Future.delayed(const Duration(milliseconds: 500));
                                }
                              },
                              icon: const Icon(Icons.download),
                              label: const Text('Unduh Semua'),
                            ),
                          IconButton(
                            icon: const Icon(Icons.close),
                            onPressed: () => Navigator.of(context).pop(),
                          ),
                        ],
                      ),
                    ),
                    const Divider(height: 1),
                    if (attachments.isEmpty)
                      const Expanded(
                        child: Center(child: Text('Tidak ada lampiran.')),
                      )
                    else
                      Expanded(
                        child: ListView.separated(
                          controller: scrollController,
                          itemCount: attachments.length,
                          separatorBuilder: (context, index) => const Divider(),
                          itemBuilder: (context, index) {
                            final att = attachments[index];
                            final publicUrl = _getPublicUrl(att.fileUrl);

                            return ListTile(
                              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                              leading: Container(
                                width: 60,
                                height: 60,
                                decoration: BoxDecoration(
                                  color: Colors.grey.shade200,
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: att.isImage
                                    ? ClipRRect(
                                        borderRadius: BorderRadius.circular(8),
                                        child: Image.network(publicUrl, fit: BoxFit.cover),
                                      )
                                    : const Icon(Icons.insert_drive_file, color: Colors.grey),
                              ),
                              title: Text(
                                att.fileName,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13),
                              ),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const SizedBox(height: 4),
                                  Text('Ukuran: ${att.readableSize}', style: const TextStyle(fontSize: 12)),
                                  Text('Diupload: ${att.uploadedAt.toLocal().toString().split('.')[0]}', style: const TextStyle(fontSize: 12)),
                                ],
                              ),
                              trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  IconButton(
                                    icon: const Icon(Icons.delete, color: Colors.red),
                                    onPressed: _isLoading ? null : () => _deleteAttachment(att.id),
                                  ),
                                  IconButton(
                                    icon: const Icon(Icons.download_for_offline, color: Colors.blue),
                                    onPressed: _isLoading ? null : () => _downloadFile(publicUrl),
                                  ),
                                ],
                              ),
                              onTap: () => _downloadFile(publicUrl),
                            );
                          },
                        ),
                      ),
                  ],
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (err, stack) => Center(child: Text('Gagal memuat lampiran: $err')),
            ),
            if (_isLoading)
              Container(
                color: Colors.black.withOpacity(0.1),
                child: const Center(child: CircularProgressIndicator()),
              ),
          ],
        );
      },
    );
  }
}