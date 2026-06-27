import type { SupabaseClient } from "@supabase/supabase-js";

export async function deleteTicketComments(
  supabase: SupabaseClient,
  id: string
) {
  const { data, error } = await supabase
    .from("ticket_comments")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Failed to delete ticket_comments: ${error.message}`);
  }
  return data;
}

export async function deleteNotifications(
  supabase: SupabaseClient,
  id: string
) {
  const { data, error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(`Failed to delete notifications: ${error.message}`);
  }
  return data;
}
