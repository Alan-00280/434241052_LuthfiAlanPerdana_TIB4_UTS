import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:helpdesk_ticketing/features/auth/presentation/providers/auth_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_comments_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/presentation/providers/ticket_list_provider.dart';
import 'package:helpdesk_ticketing/features/ticket/data/models/comment_model.dart';

class TicketCommentsList extends ConsumerStatefulWidget {
  final String ticketId;

  const TicketCommentsList({required this.ticketId});

  @override
  ConsumerState<TicketCommentsList> createState() => TicketCommentsListState();
}

class TicketCommentsListState extends ConsumerState<TicketCommentsList> {
  final _commentController = TextEditingController();
  bool _isSubmitting = false;
  RealtimeChannel? _realtimeChannel;

  @override
  void initState() {
    super.initState();
    _subscribeToRealtimeComments();
  }

  void _subscribeToRealtimeComments() {
    try {
      final supabaseClient = Supabase.instance.client;
      final channelName = 'ticket_room:${widget.ticketId}';
      debugPrint('Realtime: Subscribing to channel: $channelName');
      
      _realtimeChannel = supabaseClient.channel(channelName);

      _realtimeChannel!.onBroadcast(
        event: 'new_comment',
        callback: (payload) {
          debugPrint('Realtime: Broadcast payload received: $payload');
          try {
            final innerPayload = payload['payload'] as Map<String, dynamic>?;
            final commentJson = innerPayload?['comment'];
            if (commentJson != null) {
              final newComment = CommentModel.fromJson(commentJson);
              debugPrint('Realtime: Parsed comment: ${newComment.id} - ${newComment.body}');
              if (mounted) {
                ref.read(ticketCommentsProvider(widget.ticketId).notifier).addComment(newComment);
              }
            } else {
              debugPrint('Realtime: payload[\'payload\'][\'comment\'] is null!');
            }
          } catch (e, stack) {
            debugPrint('Realtime: Error parsing comment from broadcast: $e\n$stack');
          }
        },
      );

      _realtimeChannel!.subscribe((status, [error]) {
        debugPrint('Realtime channel subscription status: $status, error: $error');
      });
    } catch (e) {
      debugPrint('Error subscribing to comments realtime: $e');
    }
  }

  @override
  void dispose() {
    _commentController.dispose();
    if (_realtimeChannel != null) {
      Supabase.instance.client.removeChannel(_realtimeChannel!);
    }
    super.dispose();
  }

  Future<void> _submitComment() async {
    final text = _commentController.text.trim();
    if (text.isEmpty) return;

    final user = ref.read(currentUserProvider);
    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Sesi telah berakhir. Silakan login kembali.')),
      );
      return;
    }

    setState(() => _isSubmitting = true);
    try {
      final repo = ref.read(ticketRepositoryProvider);
      await repo.createComment(widget.ticketId, user.id, text);
      _commentController.clear();
      ref.invalidate(ticketCommentsProvider(widget.ticketId));
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Gagal mengirim komentar: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final commentsAsync = ref.watch(ticketCommentsProvider(widget.ticketId));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        commentsAsync.when(
          data: (comments) {
            if (comments.isEmpty) {
              return const Padding(
                padding: EdgeInsets.symmetric(vertical: 8.0),
                child: Text('Belum ada komentar pada tiket ini.'),
              );
            }

            Widget listWidget = ListView.builder(
              shrinkWrap: true,
              physics: comments.length > 5 
                  ? const AlwaysScrollableScrollPhysics() 
                  : const NeverScrollableScrollPhysics(),
              itemCount: comments.length,
              itemBuilder: (context, index) {
                final comment = comments[index];
                final authorName = comment.author?.fullName ?? 'Unknown';
                final role = comment.author?.role ?? '';
                final avatarUrl = comment.author?.avatarUrl;

                return Padding(
                  padding: const EdgeInsets.only(bottom: 24.0),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CircleAvatar(
                        radius: 20,
                        backgroundImage: avatarUrl != null ? NetworkImage(avatarUrl) : null,
                        backgroundColor: Colors.indigo.shade100,
                        child: avatarUrl == null ? const Icon(Icons.person, color: Colors.indigo) : null,
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  authorName,
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                                ),
                                const SizedBox(width: 8),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: role == 'HELPDESK' ? Colors.blue.shade100 : (role == 'ADMIN' ? Colors.red.shade100 : Colors.grey.shade200),
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    role,
                                    style: TextStyle(
                                      fontSize: 10,
                                      color: role == 'HELPDESK' ? Colors.blue.shade800 : (role == 'ADMIN' ? Colors.red.shade800 : Colors.grey.shade800),
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                                const Spacer(),
                                Text(
                                  comment.createdAt.toLocal().toString().split('.')[0],
                                  style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Container(
                              padding: const EdgeInsets.all(12),
                              decoration: BoxDecoration(
                                color: Colors.grey.shade100,
                                borderRadius: const BorderRadius.only(
                                  topRight: Radius.circular(12),
                                  bottomLeft: Radius.circular(12),
                                  bottomRight: Radius.circular(12),
                                ),
                                border: Border.all(color: Colors.grey.shade200),
                              ),
                              child: Text(
                                comment.body,
                                style: const TextStyle(fontSize: 14, height: 1.4),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                );
              },
            );

            if (comments.length > 5) {
              listWidget = ConstrainedBox(
                constraints: const BoxConstraints(maxHeight: 450),
                child: Scrollbar(
                  thumbVisibility: true,
                  child: listWidget,
                ),
              );
            }

            return listWidget;
          },
          loading: () => const Center(child: Padding(
            padding: EdgeInsets.all(16.0),
            child: CircularProgressIndicator(),
          )),
          error: (err, stack) => Text('Gagal memuat komentar: $err'),
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Expanded(
              child: TextField(
                controller: _commentController,
                minLines: 1,
                maxLines: 4,
                decoration: InputDecoration(
                  hintText: 'Tulis komentar...',
                  filled: true,
                  fillColor: Colors.grey.shade50,
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(24),
                    borderSide: BorderSide(color: Colors.grey.shade300),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(24),
                    borderSide: BorderSide(color: Colors.grey.shade300),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            Container(
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                shape: BoxShape.circle,
              ),
              child: IconButton(
                icon: _isSubmitting 
                    ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2)) 
                    : const Icon(Icons.send, color: Colors.white),
                onPressed: _isSubmitting ? null : _submitComment,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
