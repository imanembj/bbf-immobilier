// Client API pour remplacer getStore() - Appels MySQL via API routes
// À utiliser dans les composants frontend (pages, components)

export const apiClient = {
  // Reviews
  async getReviews() {
    const res = await fetch('/api/reviews')
    if (!res.ok) throw new Error('Failed to fetch reviews')
    return res.json()
  },

  // Partners
  async getPartners() {
    const res = await fetch('/api/partners')
    if (!res.ok) throw new Error('Failed to fetch partners')
    return res.json()
  },

  // FAQs
  async getFAQs() {
    const res = await fetch('/api/faqs')
    if (!res.ok) throw new Error('Failed to fetch FAQs')
    return res.json()
  },

  // Blog
  async getBlogPosts() {
    const res = await fetch('/api/blog')
    if (!res.ok) throw new Error('Failed to fetch blog posts')
    return res.json()
  },

  async getBlogPost(slug: string) {
    const res = await fetch(`/api/blog/${slug}`)
    if (!res.ok) throw new Error('Failed to fetch blog post')
    return res.json()
  },

  async incrementBlogViews(slug: string) {
    const res = await fetch(`/api/blog/${slug}/view`, {
      method: 'POST',
    })
    if (!res.ok) throw new Error('Failed to increment views')
    return res.json()
  },

  // Properties
  async getProperties() {
    const res = await fetch('/api/properties')
    if (!res.ok) throw new Error('Failed to fetch properties')
    return res.json()
  },

  async getProperty(id: string) {
    const res = await fetch(`/api/properties/${id}`)
    if (!res.ok) throw new Error('Failed to fetch property')
    return res.json()
  },
}
