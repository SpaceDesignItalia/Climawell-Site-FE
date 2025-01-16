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
      <body className="flex min-h-full flex-col">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  )
}