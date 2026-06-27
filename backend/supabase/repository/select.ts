import type { SupabaseClient } from "@supabase/supabase-js";
import type { TicketComment, Notification } from "./types.js";

export async function selectTicketComments(
  supabase: SupabaseClient,
  filter?: { id?: string; ticketId?: string; authorId?: string }
) {
  let query = supabase
    .from("ticket_comments")
    .select("*");

  if (filter?.id) {
    query = query.eq("id", filter.id);
  }
  if (filter?.ticketId) {
    query = query.eq("ticketId", filter.ticketId);
  }
  if (filter?.authorId) {
    query = query.eq("authorId", filter.authorId);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to select ticket_comments: ${error.message}`);
  }
  return data;
}

export async function selectNotifications(
  supabase: SupabaseClient,
  filter?: { id?: string; userId?: string; isRead?: boolean }
) {
  let query = supabase
    .from("notifications")
    .select("*")
    .order("createdAt", { ascending: false });

  if (filter?.id) {
    query = query.eq("id", filter.id);
  }
  if (filter?.userId) {
    query = query.eq("userId", filter.userId);
  }
  if (filter?.isRead !== undefined) {
    query = query.eq("isRead", filter.isRead);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to select notifications: ${error.message}`);
  }
  return data;
}
