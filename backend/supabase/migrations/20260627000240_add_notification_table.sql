CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    ticket_id UUID,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    -- CONSTRAINT fk_notifications_user
    --     FOREIGN KEY (user_id)
    --     REFERENCES users(id)
    --     ON DELETE CASCADE,

    -- CONSTRAINT fk_notifications_ticket
    --     FOREIGN KEY (ticket_id)
    --     REFERENCES tickets(id)
    --     ON DELETE SET NULL
);