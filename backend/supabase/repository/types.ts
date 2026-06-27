export interface TicketComment {
  ticketId: string;
  authorId: string;
  body: string;
}

export interface Notification {
  userId: string;
  ticketId?: string | null;
  type: string;
  title: string;
  body: string;
  isRead?: boolean;
  readAt?: Date | string | null;
}
