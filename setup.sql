-- 1. Table blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id         bigint      PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at timestamptz NOT NULL DEFAULT now(),
    title      text        NOT NULL,
    slug       text        NOT NULL,
    lang       text        NOT NULL DEFAULT 'fr',
    category   text,
    date       text,
    readtime   text,
    tags       text[]      NOT NULL DEFAULT '{}',
    excerpt    text,
    content    text,
    image      text,
    image_alt  text,
    group_id   uuid
);

-- 2. Indexes
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_lang_idx ON public.blog_posts (slug, lang);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON public.blog_posts (created_at DESC);

-- 3. Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

DO $p$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blog_posts' AND policyname='Public read') THEN
    CREATE POLICY "Public read" ON public.blog_posts FOR SELECT USING (true);
    END IF;
END $p$;

DO $p$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='blog_posts' AND policyname='Service role all') THEN
    CREATE POLICY "Service role all" ON public.blog_posts
        USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
    END IF;
END $p$;

-- 4. Storage policies
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('blog-images','blog-images',true,5242880,ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO UPDATE SET public=true, file_size_limit=5242880;

DO $p$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='objects' AND policyname='blog-images public read') THEN
    CREATE POLICY "blog-images public read" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');
    END IF;
END $p$;

DO $p$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='objects' AND policyname='blog-images service upload') THEN
    CREATE POLICY "blog-images service upload" ON storage.objects FOR INSERT
        WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'service_role');
    END IF;
END $p$;
