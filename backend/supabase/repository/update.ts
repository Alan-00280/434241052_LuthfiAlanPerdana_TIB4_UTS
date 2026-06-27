import type { SupabaseClient } from "@supabase/supabase-js";
import type { TicketComment, Notification } from "./types.js";

export async function updateTicketComments(
  supabase: SupabaseClient,
  id: string,
  comment: Partial<TicketComment>
) {
  const payload: Record<string, any> = {};
  if (comment.ticketId !== undefined) payload.ticketId = comment.ticketId;
  if (comment.authorId !== undefined) payload.authorId = comment.authorId;
  if (comment.body !== undefined) payload.body = comment.body;

  const { data, error } = await supabase
    .from("ticket_comments")
    .update(payload)
    .eq("id", id)
    .select("*, author:users(id, fullName, avatarUrl, role)")
    .single();

  if (error) {
    throw new Error(`Failed to update ticket_comments: ${error.message}`);
  }
  return data;
}

export async function updateNotifications(
  supabase: SupabaseClient,
  id: string,
  notification: Partial<Notification>
) {
  const payload: Record<string, any> = {};
  if (notification.userId !== undefined) payload.userId = notification.userId;
  if (notification.ticketId !== undefined) payload.ticketId = notification.ticketId;
  if (notification.type !== undefined) payload.type = notification.type;
  if (notification.title !== undefined) payload.title = notification.title;
  if (notification.body !== undefined) payload.body = notification.body;
  if (notification.isRead !== undefined) payload.isRead = notification.isRead;
  if (notification.readAt !== undefined) payload.readAt = notification.readAt;

  const { data, error } = await supabase
    .from("notifications")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update notifications: ${error.message}`);
  }
  return data;
}
