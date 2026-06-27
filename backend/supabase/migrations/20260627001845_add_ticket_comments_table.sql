CREATE TABLE public.ticket_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    ticket_id UUID NOT NULL,
    author_id UUID NOT NULL,

    body TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

    -- CONSTRAINT fk_ticket_comments_ticket
    --     FOREIGN KEY (ticket_id)
    --     REFERENCES public.tickets(id)
    --     ON DELETE CASCADE,

    -- CONSTRAINT fk_ticket_comments_author
    --     FOREIGN KEY (author_id)
    --     REFERENCES public.users(id)
);

-- Index untuk mempercepat pencarian komentar berdasarkan ticket
CREATE INDEX idx_ticket_comments_ticket_id
ON public.ticket_comments(ticket_id);

-- Index untuk author
CREATE INDEX idx_ticket_comments_author_id
ON public.ticket_comments(author_id);

-- Trigger agar updated_at otomatis berubah saat UPDATE
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_ticket_comments_updated_at
BEFORE UPDATE ON public.ticket_comments
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();