/**
 * Utilitaires pour optimiser et compresser les images
 * Réduit la taille des images pour éviter de dépasser le quota localStorage
 */

export interface ImageCompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  maxSizeMB?: number
}

/**
 * Compresse une image en réduisant sa taille et sa qualité
 * @param file - Fichier image à compresser
 * @param options - Options de compression
 * @returns Promise<string> - Image compressée en base64
 */
export async function compressImage(
  file: File,
  options: ImageCompressionOptions = {}
): Promise<string> {
  const {
    maxWidth = 1200,
    maxHeight = 800,
    quality = 0.7,
    maxSizeMB = 0.5
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        // Calculer les nouvelles dimensions en gardant le ratio
        let width = img.width
        let height = img.height
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
        
        // Créer un canvas pour redimensionner
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Impossible de créer le contexte canvas'))
          return
        }
        
        // Dessiner l'image redimensionnée
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convertir en base64 avec compression
        let compressed = canvas.toDataURL('image/jpeg', quality)
        
        // Si toujours trop grand, réduire encore la qualité
        const maxBytes = maxSizeMB * 1024 * 1024
        let currentQuality = quality
        
        while (compressed.length > maxBytes && currentQuality > 0.1) {
          currentQuality -= 0.1
          compressed = canvas.toDataURL('image/jpeg', currentQuality)
        }
        
        resolve(compressed)
      }
      
      img.onerror = () => {
        reject(new Error('Erreur lors du chargement de l\'image'))
      }
      
      img.src = e.target?.result as string
    }
    
    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'))
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * Compresse plusieurs images
 * @param files - Liste de fichiers à compresser
 * @param options - Options de compression
 * @returns Promise<string[]> - Images compressées en base64
 */
export async function compressImages(
  files: FileList | File[],
  options: ImageCompressionOptions = {}
): Promise<string[]> {
  const fileArray = Array.from(files)
  const promises = fileArray.map(file => compressImage(file, options))
  return Promise.all(promises)
}

/**
 * Calcule la taille d'une chaîne base64 en MB
 * @param base64String - Chaîne base64
 * @returns Taille en MB
 */
export function getBase64SizeMB(base64String: string): number {
  const sizeInBytes = new Blob([base64String]).size
  return sizeInBytes / (1024 * 1024)
}

/**
 * Vérifie si une image base64 est trop grande
 * @param base64String - Chaîne base64
 * @param maxSizeMB - Taille maximale en MB
 * @returns true si l'image est trop grande
 */
export function isImageTooLarge(base64String: string, maxSizeMB: number = 0.5): boolean {
  return getBase64SizeMB(base64String) > maxSizeMB
}

/**
 * Crée une miniature d'une image
 * @param base64String - Image en base64
 * @param maxSize - Taille maximale (largeur et hauteur)
 * @returns Promise<string> - Miniature en base64
 */
export async function createThumbnail(
  base64String: string,
  maxSize: number = 200
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        reject(new Error('Impossible de créer le contexte canvas'))
        return
      }
      
      // Calculer les dimensions de la miniature
      let width = img.width
      let height = img.height
      
      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.6))
    }
    
    img.onerror = () => {
      reject(new Error('Erreur lors du chargement de l\'image'))
    }
    
    img.src = base64String
  })
}
