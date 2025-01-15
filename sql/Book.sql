-- Table: public.book

-- DROP TABLE IF EXISTS public.book;

CREATE TABLE IF NOT EXISTS public.book
(
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    title VARCHAR(255) NOT NULL,
    rating INT NULL,
    "createdBy" uuid NULL,
    "createdTs" timestamp DEFAULT now(),
    CONSTRAINT book_pkey PRIMARY KEY (id)
    -- CONSTRAINT "task_createdBy_fkey" FOREIGN KEY ("createdBy")
    -- REFERENCES public."user" (id) MATCH SIMPLE
    -- ON UPDATE NO ACTION
    -- ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.book
    OWNER to postgres;