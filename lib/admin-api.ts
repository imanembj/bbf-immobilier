// Helper functions pour les opérations admin via API MySQL
// Remplace complètement getStore() - plus de localStorage

export const adminAPI = {
  // Reviews
  async updateReview(id: string, updates: any) {
    const res = await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates }),
    })
    if (!res.ok) throw new Error('Failed to update review')
    return res.json()
  },

  async deleteReview(id: string) {
    const res = await fetch(`/api/admin/reviews?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete review')
    return res.json()
  },

  // Partners
  async addPartner(partner: any) {
    const res = await fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    })
    if (!res.ok) throw new Error('Failed to add partner')
    return res.json()
  },

  async updatePartner(id: string, updates: any) {
    const res = await fetch('/api/partners', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates }),
    })
    if (!res.ok) throw new Error('Failed to update partner')
    return res.json()
  },

  async deletePartner(id: string) {
    const res = await fetch(`/api/partners?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete partner')
    return res.json()
  },

  // FAQs
  async addFAQ(faq: any) {
    const res = await fetch('/api/faqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faq),
    })
    if (!res.ok) throw new Error('Failed to add FAQ')
    return res.json()
  },

  async updateFAQ(id: string, updates: any) {
    const res = await fetch('/api/faqs', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates }),
    })
    if (!res.ok) throw new Error('Failed to update FAQ')
    return res.json()
  },

  async deleteFAQ(id: string) {
    const res = await fetch(`/api/faqs?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete FAQ')
    return res.json()
  },

  // Blog
  async addBlogPost(data: any) {
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to add blog post')
    return res.json()
  },

  async updateBlogPost(id: string, updates: any) {
    const res = await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates }),
    })
    if (!res.ok) throw new Error('Failed to update blog post')
    return res.json()
  },

  async deleteBlogPost(id: string) {
    const res = await fetch(`/api/admin/blog?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete blog post')
    return res.json()
  },

  async toggleBlogPostPin(id: string) {
    const res = await fetch('/api/admin/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates: { togglePin: true } }),
    })
    if (!res.ok) throw new Error('Failed to toggle pin')
    return res.json()
  },

  // Properties
  async addProperty(property: any) {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property),
    })
    if (!res.ok) throw new Error('Failed to add property')
    return res.json()
  },

  async updateProperty(id: string, updates: any) {
    const res = await fetch(`/api/properties/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (!res.ok) throw new Error('Failed to update property')
    return res.json()
  },

  // Messages
  async updateMessage(id: string, updates: any) {
    const res = await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates }),
    })
    if (!res.ok) throw new Error('Failed to update message')
    return res.json()
  },

  async deleteMessage(id: string) {
    const res = await fetch(`/api/admin/messages?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete message')
    return res.json()
  },

  // Client Requests
  async updateClientRequest(id: string, updates: any) {
    const res = await fetch('/api/requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, updates }),
    })
    if (!res.ok) throw new Error('Failed to update request')
    return res.json()
  },

  async deleteClientRequest(id: string) {
    const res = await fetch(`/api/requests?id=${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete request')
    return res.json()
  },
}
