-- Table: public.task

-- DROP TABLE IF EXISTS public.task;

CREATE TABLE IF NOT EXISTS public.task
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    "createdBy" uuid,
    "createdTs" timestamp with time zone DEFAULT now(),
    CONSTRAINT task_pkey PRIMARY KEY (id),
    CONSTRAINT "task_createdBy_fkey" FOREIGN KEY ("createdBy")
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.task
    OWNER to postgres;