'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { MapPin, Plus, Minus } from 'lucide-react'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icon missing in React-Leaflet
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png'
const iconRetinaUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png'
const shadowUrl =
  'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'

let customIcon: L.Icon | undefined

// Create icon only on client side to avoid SSR issues
if (typeof window !== 'undefined') {
  customIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
}

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

const MapUpdater = () => {
  const map = useMap()
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  return null
}

const ZoomController = ({
  zoomAction,
  onZoomActionHandled,
}: {
  zoomAction: 'in' | 'out' | null
  onZoomActionHandled: () => void
}) => {
  const map = useMap()

  useEffect(() => {
    if (zoomAction === 'in') {
      map.setZoom(map.getZoom() + 1)
      onZoomActionHandled()
    } else if (zoomAction === 'out') {
      map.setZoom(map.getZoom() - 1)
      onZoomActionHandled()
    }
  }, [zoomAction, map, onZoomActionHandled])

  return null
}

const LeafletMapInternal = () => {
  const center = { lat: 43.804005, lng: 11.23203 }
  const [zoomAction, setZoomAction] = useState<'in' | 'out' | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleZoomIn = () => {
    setZoomAction('in')
  }

  const handleZoomOut = () => {
    setZoomAction('out')
  }

  const handleZoomActionHandled = () => {
    setZoomAction(null)
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

  if (!isMounted || !customIcon) return null

  return (
    <div className="relative z-0 h-[400px] w-full overflow-hidden rounded-2xl bg-neutral-100">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        scrollWheelZoom={false}
        zoomControl={false}
        fadeAnimation={false}
        zoomAnimation={false}
        className="z-0 h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <MapUpdater />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={['a', 'b', 'c', 'd']}
          maxZoom={20}
        />
        <Marker position={[center.lat, center.lng]} icon={customIcon}>
          <Popup>
            Climawell <br /> Via delle Tre Pietre, 2/c, Firenze
          </Popup>
        </Marker>
        <ZoomController
          zoomAction={zoomAction}
          onZoomActionHandled={handleZoomActionHandled}
        />
      </MapContainer>

      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
        <MapButton onClick={handleZoomIn}>
          <Plus size={24} />
        </MapButton>
        <MapButton onClick={handleZoomOut}>
          <Minus size={24} />
        </MapButton>
      </div>

      <div className="absolute bottom-4 left-4 z-[1000]">
        <MapButton
          onClick={handleOpenNavigation}
          className="flex items-center gap-2 px-4 py-2"
        >
          <MapPin size={18} />
          <span className="text-sm font-semibold">Apri navigazione</span>
        </MapButton>
      </div>

      <style jsx global>{`
        .leaflet-container .leaflet-tile {
          visibility: visible !important;
        }
      `}</style>
    </div>
  )
}

export default LeafletMapInternal
