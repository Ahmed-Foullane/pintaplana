-- Add missing columns to the blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS related_slugs text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS faq_schema jsonb;
