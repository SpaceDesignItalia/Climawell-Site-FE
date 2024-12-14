'use client'
import { useState, useMemo, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { MapPin, Plus, Minus } from 'lucide-react'

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }]
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#e9e9e9' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
]

const MapButton = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`bg-white text-black border border-black rounded-full p-2 hover:bg-black hover:text-white transition-colors ${className}`}
  >
    {children}
  </button>
)

const ContactMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  })

  const center = useMemo(() => ({ lat: 43.7851, lng: 11.2242 }), [])
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [zoom, setZoom] = useState(15)

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [center])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const handleZoomIn = () => {
    if (map) {
      const newZoom = Math.min(map.getZoom() + 1, 20)
      map.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  const handleZoomOut = () => {
    if (map) {
      const newZoom = Math.max(map.getZoom() - 1, 1)
      map.setZoom(newZoom)
      setZoom(newZoom)
    }
  }

  const handleOpenNavigation = () => {
    const address = encodeURIComponent('Via delle Tre Pietre, 2/c, 50127, Firenze')
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const url = isMobile
      ? `https://maps.google.com/?q=${address}`
      : `https://www.google.com/maps/dir/?api=1&destination=${address}`
    window.open(url, '_blank')
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[400px] rounded-2xl bg-neutral-100 flex items-center justify-center">
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
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
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
        <MapButton onClick={handleOpenNavigation} className="flex items-center gap-2 px-4 py-2">
          <MapPin size={18} />
          <span className="text-sm font-semibold">Apri navigazione</span>
        </MapButton>
      </div>
    </div>
  )
}

export default ContactMap

