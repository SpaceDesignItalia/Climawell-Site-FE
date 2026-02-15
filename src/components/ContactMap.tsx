'use client'

import dynamic from 'next/dynamic'

const LeafletMapInternal = dynamic(
  () => import('@/components/LeafletMapInternal'),
  {
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-neutral-100">
        <span className="text-neutral-600">Caricamento mappa...</span>
      </div>
    ),
    ssr: false,
  },
)

const ContactMap = () => {
  return <LeafletMapInternal />
}

export default ContactMap
