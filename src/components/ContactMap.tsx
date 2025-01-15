'use client'

import { useState, useMemo, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { MapPin, Plus, Minus } from 'lucide-react'

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c8d7d4' }],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#f0f0f0' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#666666' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
]

interface MapButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  className?: string
}

const MapButton = ({ onClick, children, className = '' }: MapButtonProps) => (
  <button
    onClick={onClick}
    className={`rounded-full border border-black bg-white p-2 text-black transition-colors hover:bg-black hover:text-white ${className}`}
  >
    {children}
  </button>
)

const libraries: ('places' | 'geometry' | 'drawing' | 'visualization')[] = []

const ContactMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: libraries,
  })

  const center = useMemo(() => ({ lat: 43.804005, lng: 11.23203 }), [])
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [zoom, setZoom] = useState(15)

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      map.setZoom(zoom)
      setMap(map)
    },
    [zoom],
  )

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleZoomIn = () => {
    if (map) {
      const newZoom = Math.min((map.getZoom() ?? 15) + 1, 20)
      map.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom() ?? 15
      const newZoom = Math.max(currentZoom - 1, 1)
      map.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  const handleOpenNavigation = () => {
    const address = encodeURIComponent(
      'Via delle Tre Pietre, 2/c, 50127, Firenze',
    )
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const url = isMobile
      ? `https://maps.google.com/?q=${address}`
      : `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-neutral-100">
        <span className="text-neutral-600">Caricamento mappa...</span>
      </div>
    )
  }

  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyles,
    zoomControl: false,
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <Marker position={center} />
      </GoogleMap>
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <MapButton onClick={handleZoomIn}>
          <Plus size={24} />
        </MapButton>
        <MapButton onClick={handleZoomOut}>
          <Minus size={24} />
        </MapButton>
      </div>
      <div className="absolute bottom-4 left-4">
        <MapButton
          onClick={handleOpenNavigation}
          className="flex items-center gap-2 px-4 py-2"
        >
          <MapPin size={18} />
          <span className="text-sm font-semibold">Apri navigazione</span>
        </MapButton>
      </div>
    </div>
  )
}

export default ContactMap
