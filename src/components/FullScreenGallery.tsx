import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface FullScreenGalleryProps {
  images: { ProductImageUrl: string; ProductImageAlt: string }[]
  initialIndex: number
  onClose: () => void
}

export function FullScreenGallery({ images, initialIndex, onClose }: FullScreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isLoaded, setIsLoaded] = useState(false)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
    setIsLoaded(false)
  }, [images.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0))
    setIsLoaded(false)
  }, [images.length])

  useEffect(() => {
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.src = images[currentIndex].ProductImageUrl
  }, [currentIndex, images])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      } else if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, goToPrevious, goToNext])

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={handleBackgroundClick}
    >
      <div className="relative max-h-[90vh] max-w-[90vw]">
        {isLoaded ? (
          <img 
            src={images[currentIndex].ProductImageUrl || "/placeholder.svg"} 
            alt={images[currentIndex].ProductImageAlt} 
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-[90vh] w-[90vw]">
            <div className="text-white text-2xl">Caricamento...</div>
          </div>
        )}
        
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-2 right-2 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
          aria-label="Chiudi galleria"
        >
          <X size={24} />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
          aria-label="Immagine precedente"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200"
          aria-label="Immagine successiva"
        >
          <ChevronRight size={24} />
        </button>
        
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}

