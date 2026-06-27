ALTER TABLE notifications
RENAME COLUMN user_id TO "userId";

ALTER TABLE notifications
RENAME COLUMN ticket_id TO "ticketId";

ALTER TABLE notifications
RENAME COLUMN is_read TO "isRead";

ALTER TABLE notifications
RENAME COLUMN read_at TO "readAt";

ALTER TABLE notifications
RENAME COLUMN created_at TO "createdAt";