import { type Metadata } from 'next'

import { RootLayout } from '@/components/RootLayout'

import '@/styles/tailwind.css'
import axios from 'axios'
import {API_URL} from '@/API/API' 
export const metadata: Metadata = {
  title: 'Climawell',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  axios.defaults.baseURL = API_URL
  return (
    <html lang="en" className="h-full bg-neutral-950 text-base antialiased">
      <head><script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="6ea9c7eb-19a6-4e10-b204-6ab67ad949eb" data-blockingmode="auto" type="text/javascript"></script></head>
      <body className="flex min-h-full flex-col">
        
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}