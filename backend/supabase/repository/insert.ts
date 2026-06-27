import type { SupabaseClient } from "@supabase/supabase-js";
import type { TicketComment, Notification } from "./types.js";

export async function insertTicketComments(
    supabase: SupabaseClient,
    comment: TicketComment
) {
    const payload = {
        ticketId: comment.ticketId,
        authorId: comment.authorId,
        body: comment.body,
    };

    const { data, error } = await supabase
        .from("ticket_comments")
        .insert(payload)
        .select();

    if (error) {
        throw new Error(`Failed to seed ticket_comments: ${error.message}`);
    }

    return data;
}

export async function insertNotifications(
  supabase: SupabaseClient,
  notification: Notification
) {
  const payload = {
    userId: notification.userId,
    ticketId: notification.ticketId ?? null,
    type: notification.type,
    title: notification.title,
    body: notification.body,
    isRead: notification.isRead ?? false,
    readAt: notification.readAt ?? null,
  };

  const { data, error } = await supabase
    .from("notifications")
    .insert(payload)
    .select();

  if (error) {
    throw new Error(`Failed to seed notifications: ${error.message}`);
  }

  return data;
}