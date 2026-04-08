'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, Eye, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { getStore } from '@/lib/store'
import { BlogPost } from '@/lib/data'
import toast from 'react-hot-toast'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      const slug = params.slug as string
      const store = getStore()
      const fetchedPost = store.getBlogPostBySlug(slug)

      if (!fetchedPost) {
        router.push('/blog')
        return
      }

      setPost(fetchedPost as any)

      // Articles similaires (même catégorie)
      const allPosts = store.getBlogPosts()
      const related = allPosts
        .filter((p: any) => p.id !== fetchedPost.id && p.category === fetchedPost.category)
        .slice(0, 3)
      setRelatedPosts(related as any)
      setLoading(false)
    }
    loadPost()
  }, [params.slug, router])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = post?.title || ''

    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        toast.success('Lien copié !')
        return
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  if (loading || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b pt-24 pb-8">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Category */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-cyan-100 text-cyan-800">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          style={{ objectPosition: post.coverImagePosition || '50% 50%' }}
          priority
        />
      </div>

      {/* Content */}
      <article className="py-12">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white rounded-xl shadow-md p-10 md:p-20">
            {/* Excerpt */}
            <div className="text-xl text-gray-700 font-medium mb-8 pb-8 border-b">
              {post.excerpt}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Galerie d'images */}
            {post.images && post.images.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Galerie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {post.images.map((image, i) => (
                    <div key={i} className="relative h-64 rounded-lg overflow-hidden group">
                      <Image
                        src={image}
                        alt={`${post.title} - Image ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Liens utiles */}
            {post.links && post.links.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Liens utiles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                        <LinkIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                          {link.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{link.url}</div>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-cyan-600 transform rotate-180 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-12 pt-8 border-t">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Partager cet article</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Copier le lien
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Articles similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <article className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-cyan-600">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
