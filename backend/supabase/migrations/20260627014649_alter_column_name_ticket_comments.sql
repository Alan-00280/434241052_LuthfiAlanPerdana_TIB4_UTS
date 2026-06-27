ALTER TABLE public.ticket_comments
RENAME COLUMN ticket_id TO "ticketId";

ALTER TABLE public.ticket_comments
RENAME COLUMN author_id TO "authorId";

ALTER TABLE public.ticket_comments
RENAME COLUMN created_at TO "createdAt";

ALTER TABLE public.ticket_comments
RENAME COLUMN updated_at TO "updatedAt";

ALTER INDEX public.idx_ticket_comments_ticket_id
RENAME TO idx_ticket_comments_ticketId;

ALTER INDEX public.idx_ticket_comments_author_id
RENAME TO idx_ticket_comments_authorId;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;