'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Upload, Trash2, Plus, Image as ImageIcon, Link as LinkIcon, Bold, Italic, List, ListOrdered } from 'lucide-react'
import { BlogPost } from '@/lib/data'
import toast from 'react-hot-toast'

interface BlogPostFormProps {
  post?: BlogPost | null
  onSave: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => void
  onCancel: () => void
}

export default function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {
  // S'assurer que images, links, tags sont toujours des tableaux
  const ensureArray = (value: any) => {
    if (!value) return []
    if (Array.isArray(value)) return value
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  }

  const [formData, setFormData] = useState({
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImage: post?.coverImage || '',
    coverImagePosition: post?.coverImagePosition || '50% 50%',
    images: ensureArray(post?.images),
    links: ensureArray(post?.links),
    category: post?.category || 'actualites' as BlogPost['category'],
    tags: ensureArray(post?.tags),
    author: post?.author || 'BBF Immobilier',
    isPinned: post?.isPinned || false,
    isPublished: post?.isPublished || false,
    publishedAt: post?.publishedAt,
  })

  const [newTag, setNewTag] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newLink, setNewLink] = useState({ title: '', url: '' })
  const contentRef = useRef<HTMLDivElement>(null)
  const coverImageInputRef = useRef<HTMLInputElement>(null)
  const galleryImageInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleAddImage = () => {
    if (newImage.trim() && !formData.images.includes(newImage.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage.trim()]
      }))
      setNewImage('')
    }
  }

  const handleRemoveImage = (image: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(i => i !== image)
    }))
  }

  // Upload d'image (convertit en base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'gallery') => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      toast.error('L\'image ne doit pas dépasser 5MB')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      
      if (type === 'cover') {
        setFormData(prev => ({ ...prev, coverImage: base64String }))
        toast.success('Image de couverture ajoutée')
      } else {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, base64String]
        }))
        toast.success('Image ajoutée à la galerie')
      }
    }
    reader.readAsDataURL(file)
  }

  // Éditeur de texte riche
  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    contentRef.current?.focus()
  }

  const insertLink = () => {
    const url = prompt('Entrez l\'URL du lien:')
    if (url) {
      formatText('createLink', url)
    }
  }

  const insertImage = () => {
    const url = prompt('Entrez l\'URL de l\'image:')
    if (url) {
      formatText('insertImage', url)
    }
  }

  const handleContentChange = () => {
    if (contentRef.current) {
      const newContent = contentRef.current.innerHTML
      // Ne mettre à jour que si le contenu a vraiment changé
      if (newContent !== formData.content) {
        setFormData(prev => ({
          ...prev,
          content: newContent
        }))
      }
    }
  }

  // Initialiser le contenu une seule fois
  useEffect(() => {
    if (contentRef.current && post?.content && !contentRef.current.innerHTML) {
      contentRef.current.innerHTML = post.content
    }
  }, [post?.content])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      toast.error('Le titre est obligatoire')
      return
    }
    if (!formData.slug.trim()) {
      toast.error('Le slug est obligatoire')
      return
    }
    if (!formData.excerpt.trim()) {
      toast.error('L\'extrait est obligatoire')
      return
    }
    if (!formData.content.trim()) {
      toast.error('Le contenu est obligatoire')
      return
    }
    if (!formData.coverImage.trim()) {
      toast.error('L\'image de couverture est obligatoire')
      return
    }

    console.log('FormData before save:', {
      coverImagePosition: formData.coverImagePosition,
      images: formData.images,
      imagesLength: formData.images.length
    })

    onSave(formData)
  }

  const categories = [
    { value: 'sponsoring', label: 'Sponsoring' },
    { value: 'actualites', label: 'Actualités' },
    { value: 'conseils', label: 'Conseils' },
    { value: 'evenements', label: 'Événements' },
    { value: 'marche-immobilier', label: 'Marché Immobilier' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {post ? 'Modifier l\'article' : 'Nouvel article'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="Titre de l'article"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="mon-article-de-blog"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL-friendly (ex: sponsoring-micah-fatna-moto-gp)
          </p>
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Catégorie <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Extrait */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Extrait (résumé court) <span className="text-red-500">*</span>
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            placeholder="Résumé court de l'article (150-200 caractères)"
          />
        </div>

        {/* Contenu - Éditeur de texte riche */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contenu de l'article <span className="text-red-500">*</span>
          </label>
          
          {/* Barre d'outils */}
          <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-lg">
            <button
              type="button"
              onClick={() => formatText('bold')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Gras"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText('italic')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Italique"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => formatText('insertUnorderedList')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Liste à puces"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => formatText('insertOrderedList')}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Liste numérotée"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={insertLink}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Insérer un lien"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={insertImage}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Insérer une image (URL)"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-300 mx-1" />
            <select
              onChange={(e) => {
                formatText('formatBlock', e.target.value)
                e.target.value = ''
              }}
              className="px-2 py-1 text-sm border-0 bg-transparent hover:bg-gray-200 rounded"
            >
              <option value="">Style</option>
              <option value="h2">Titre 2</option>
              <option value="h3">Titre 3</option>
              <option value="p">Paragraphe</option>
            </select>
          </div>

          {/* Zone d'édition */}
          <div
            ref={contentRef}
            contentEditable
            onInput={handleContentChange}
            suppressContentEditableWarning
            className="w-full min-h-[400px] px-4 py-3 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:outline-none prose max-w-none"
            style={{ maxHeight: '600px', overflowY: 'auto' }}
          />
          <p className="text-xs text-gray-500 mt-1">
            Utilisez la barre d'outils pour formater votre texte, ajouter des liens et des images
          </p>
        </div>

        {/* Image de couverture */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image de couverture <span className="text-red-500">*</span>
          </label>
          
          <div className="space-y-3">
            {/* Upload de fichier */}
            <div>
              <input
                ref={coverImageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => coverImageInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span>Télécharger une image depuis votre ordinateur</span>
              </button>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, GIF - Max 5MB
              </p>
            </div>

            {/* OU URL */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            <input
              type="text"
              name="coverImage"
              value={formData.coverImage.startsWith('data:') ? '' : formData.coverImage}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Coller une URL d'image"
            />
          </div>

          {formData.coverImage && (
            <div className="mt-3 space-y-3">
              {/* Positionnement libre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position de l'image (cliquez pour ajuster)
                </label>
                <div 
                  className="relative h-64 rounded-lg overflow-hidden border-2 border-gray-300 cursor-crosshair"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = ((e.clientX - rect.left) / rect.width) * 100
                    const y = ((e.clientY - rect.top) / rect.height) * 100
                    setFormData(prev => ({ 
                      ...prev, 
                      coverImagePosition: `${x.toFixed(1)}% ${y.toFixed(1)}%` 
                    }))
                  }}
                >
                  <img
                    src={formData.coverImage}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: formData.coverImagePosition }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+non+trouvée'
                    }}
                  />
                  {/* Indicateur de position */}
                  <div 
                    className="absolute w-4 h-4 bg-cyan-500 border-2 border-white rounded-full shadow-lg pointer-events-none"
                    style={{
                      left: `calc(${formData.coverImagePosition.split(' ')[0]} - 8px)`,
                      top: `calc(${formData.coverImagePosition.split(' ')[1]} - 8px)`,
                    }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  📍 Position actuelle : {formData.coverImagePosition}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImagePosition: '50% 0%' }))}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Haut
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImagePosition: '50% 50%' }))}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Centre
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, coverImagePosition: '50% 100%' }))}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    Bas
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Galerie d'images */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Galerie d'images (optionnel)
          </label>
          
          <div className="space-y-3 mb-3">
            {/* Upload de fichier */}
            <div>
              <input
                ref={galleryImageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'gallery')}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => galleryImageInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Télécharger une image</span>
              </button>
            </div>

            {/* OU URL */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Coller une URL d'image"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x150?text=Image+non+trouvée'
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Liens utiles */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Liens utiles (optionnel)
          </label>
          
          <div className="space-y-3 mb-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newLink.title}
                onChange={(e) => setNewLink(prev => ({ ...prev, title: e.target.value }))}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Titre du lien"
              />
              <input
                type="url"
                value={newLink.url}
                onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (newLink.title.trim() && newLink.url.trim()) {
                      setFormData(prev => ({
                        ...prev,
                        links: [...prev.links, { title: newLink.title.trim(), url: newLink.url.trim() }]
                      }))
                      setNewLink({ title: '', url: '' })
                      toast.success('Lien ajouté')
                    }
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="URL (https://...)"
              />
              <button
                type="button"
                onClick={() => {
                  if (newLink.title.trim() && newLink.url.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      links: [...prev.links, { title: newLink.title.trim(), url: newLink.url.trim() }]
                    }))
                    setNewLink({ title: '', url: '' })
                    toast.success('Lien ajouté')
                  } else {
                    toast.error('Veuillez remplir le titre et l\'URL')
                  }
                }}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </button>
            </div>
          </div>

          {formData.links.length > 0 && (
            <div className="space-y-2">
              {formData.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg group">
                  <LinkIcon className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{link.title}</div>
                    <div className="text-sm text-gray-500 truncate">{link.url}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        links: prev.links.filter((_, i) => i !== index)
                      }))
                      toast.success('Lien supprimé')
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Nouveau tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Auteur */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Auteur
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            placeholder="BBF Immobilier"
          />
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPinned"
              checked={formData.isPinned}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Épingler cet article (apparaît en premier)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Publier cet article (visible sur le site)
            </span>
          </label>
        </div>

        {/* Boutons */}
        <div className="flex gap-3 pt-4 border-t">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all"
          >
            {post ? 'Mettre à jour' : 'Créer l\'article'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  )
}
