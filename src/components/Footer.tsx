import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { API_URL } from '@/API/API'

const navigation = [
  {
    title: 'Marche',
    links: [
      {
        title: 'Hermann Saunier Duval',
        href: 'https://www.hermann-saunierduval.it',
      },
      { title: 'Icma', href: 'https://www.icmaspa.it' },
      { title: 'Aerauliqa', href: 'https://www.aerauliqa.it' },
      { title: 'Scavolini', href: 'https://www.scavolini.com' },

      
    ],
  },
  {
    title: 'Azienda',
    links: [
      { title: 'Home', href: '/' },
      { title: 'Catalogo', href: '/catalog' },
      { title: 'Chi siamo', href: '/about' },
      { title: 'Blog', href: '/blog' },
      { title: 'Contattaci', href: '/contact' },
      { title: 'Privacy', href: '/privacy' },

    ],
  },
  {
    title: 'Seguici',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<any>(null)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    console.log('Email:', email)
    try {
      const response = await axios.post(
        API_URL + '/Newsletter/POST/PostEmail',
        { email },
      )
      setStatus({
        type: 'success',
        message: 'Iscrizione avvenuta con successo!',
      })
      setEmail('') // Reset del campo email
    } catch (error) {
      console.error("Errore durante l'iscrizione:", error)
      setStatus({
        type: 'error',
        message: "Errore durante l'iscrizione. Riprova più tardi.",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Iscriviti alla nostra newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Iscriviti per non perderti nulla e ricevere le ultime notizie su di noi.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Indirizzo Email"
          autoComplete="email"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
          required
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
      {status && (
        <p
          className={`mt-4 text-sm ${
            status.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status.message}
        </p>
      )}
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo className="h-8" fillOnHover />
          </Link>
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Powered by {''}
            <a
              href="https://www.spacedesign-italia.it"
              className="font-semibold hover:text-red-400"
            >
              🚀 Space Design Italia
            </a>
          </p>
          <p className="text-sm text-neutral-700">
            © CLIMAWELL S.R.L. {new Date().getFullYear()} <br />
            P.IVA 04732490489
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
