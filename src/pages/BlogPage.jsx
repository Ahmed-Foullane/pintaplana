import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { supabase } from '../lib/supabase'

export default function BlogPage() {
  const { t, i18n } = useTranslation()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get current 2-letter language code
  const currentLang = i18n.resolvedLanguage?.split('-')[0] || i18n.language?.split('-')[0] || 'fr'

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, image, category, date, readtime, excerpt')
          .eq('lang', currentLang)
          .order('created_at', { ascending: false })

        if (error) throw error
        setPosts(data || [])
      } catch (err) {
        console.error('Error fetching blog posts:', err)
        setError('Could not load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [currentLang])

  return (
    <div className="pt-32 pb-20 bg-dark min-h-screen text-white">
      <Helmet>
        <title>Blog | Pintaplana</title>
        <meta name="description" content="Read the latest news and updates from Pintaplana." />
      </Helmet>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Blog
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg">
            {t('Discover our latest insights, tutorials, and updates.', 'Discover our latest insights, tutorials, and updates.')}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white/5 rounded-xl h-[400px]" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <p className="text-gray-400 text-lg">No posts found for this language.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                to={`/blog/${currentLang}/${post.slug}`}
                className="group flex flex-col bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-colors duration-300 h-full"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-white/10">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                  {post.category && (
                    <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                      {post.category}
                    </span>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">
                    <span>{post.date}</span>
                    <span>&bull;</span>
                    <span>{post.readtime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 font-display group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 line-clamp-3 mb-6 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <span className="text-primary font-semibold text-sm flex items-center gap-2 mt-auto">
                    Read More 
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
