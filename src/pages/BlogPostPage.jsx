import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { marked } from 'marked'
import { supabase } from '../lib/supabase'

export default function BlogPostPage() {
  const { lang, slug } = useParams()
  const navigate = useNavigate()
  const { i18n } = useTranslation()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('lang', lang)
          .single()

        if (error) throw error
        if (!data) {
          setError('Article not found.')
          return
        }
        setPost(data)
      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Article not found.')
      } finally {
        setLoading(false)
      }
    }

    if (slug && lang) fetchPost()
  }, [slug, lang])

  useEffect(() => {
    const currentI18n = i18n.resolvedLanguage?.split('-')[0]
    
    if (currentI18n && currentI18n !== lang) {
      if (post && post.group_id) {
        // User changed language via Navbar while reading
        supabase.from('blog_posts')
          .select('slug')
          .eq('group_id', post.group_id)
          .eq('lang', currentI18n)
          .single()
          .then(({ data }) => {
            if (data) {
              navigate(`/blog/${currentI18n}/${data.slug}`)
            } else {
              i18n.changeLanguage(lang)
            }
          })
      } else if (!post) {
        // Initial load: force UI language to match URL
        i18n.changeLanguage(lang)
      }
    }
  }, [i18n.resolvedLanguage, lang, post, navigate, i18n])

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-dark min-h-screen text-white flex justify-center items-center">
        <div className="animate-pulse w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-20 bg-dark min-h-screen text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">Oops!</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button 
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  const contentHtml = marked.parse(post.content || '')

  return (
    <div className="pt-32 pb-20 bg-dark min-h-screen text-white">
      <Helmet>
        <title>{post.title} | Pintaplana</title>
        <meta name="description" content={post.excerpt} />
        {post.image && <meta property="og:image" content={post.image} />}
      </Helmet>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-8 text-sm font-semibold uppercase tracking-wider"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Blog
        </Link>

        {post.category && (
          <div className="mb-4">
            <span className="bg-primary/20 text-primary border border-primary/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-bold mb-6 font-display leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-10 pb-10 border-b border-white/10 uppercase tracking-wider font-semibold">
          <span>{post.date}</span>
          <span>&bull;</span>
          <span>{post.readtime}</span>
        </div>

        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-video relative">
            <img 
              src={post.image} 
              alt={post.image_alt || post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/5 text-gray-400 text-sm rounded-md border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
