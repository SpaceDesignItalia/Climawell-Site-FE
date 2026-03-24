"use client"

import { useEffect, useState } from "react"

import { ContactSection } from "@/components/ContactSection"
import { Container } from "@/components/Container"
import { GridList, GridListItem } from "@/components/GridList"
import { PageIntro } from "@/components/PageIntro"
import { SectionIntro } from "@/components/SectionIntro"

import { Space } from "@/components/Team"

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) {
        startTime = currentTime
      }

      const progress = (currentTime - startTime) / duration

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration])

  return (
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

// StatList Components
function StatListItem({
  label,
  value,
  suffix = "",
}: {
  label: string
  value: number | string
  suffix?: string
}) {
  const numberValue = typeof value === "string" ? Number.parseInt(value) : value

  return (
    <div className="flex flex-col-reverse pl-8">
      <dt className="mt-2 text-base text-neutral-600">{label}</dt>
      <dd className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
        <AnimatedCounter end={numberValue} suffix={suffix} />
      </dd>
    </div>
  )
}

function StatList({ children }: { children: React.ReactNode }) {
  return (
    <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
      {children}
    </dl>
  )
}

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="I nostri Valori"
        title="Dedichiamo la nostra esperienza e passione a fornire soluzioni termoidrauliche di qualità."
        invert
      >
        <p>Siamo un team compatto che condivide valori chiari e concreti.</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Esperienza" invert>
            Con oltre 25 anni di esperienza nel settore, conosciamo le esigenze e le sfide dei nostri clienti.
          </GridListItem>
          <GridListItem title="Qualità" invert>
            Collaboriamo con i migliori marchi per offrire prodotti affidabili e duraturi.
          </GridListItem>
          <GridListItem title="Innovazione" invert>
            Rimaniamo al passo con le nuove tecnologie per offrire prodotti all'avanguardia.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}





export default function About() {
  return (
    <>
      <PageIntro eyebrow="Chi siamo" title="La nostra forza e la collaborazione">
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Climawell S.r.l, il vostro punto di riferimento nel settore termoidraulico in Toscana e Liguria. Dal 1997,
            con sede a Firenze, ci impegniamo a offrire prodotti e servizi di eccellenza, soddisfacendo le esigenze di
            professionisti e appassionati in dieci province: Arezzo (AR), Firenze (FI), Grosseto (GR), Livorno (LI),
            Lucca (LU), Massa-Carrara (MS), Pisa (PI), Prato (PO), Pistoia (PT), Siena (SI) e La Spezia (SP).
          </p>
          <p>
            Il nostro impegno si traduce nella selezione di componenti termici e idraulici di altissima qualità, tra cui
            caldaie, pompe di calore, radiatori, tubazioni, rubinetteria e accessori. Grazie alla collaborazione con i
            principali marchi del settore, garantiamo ai nostri clienti prodotti affidabili, innovativi e performanti.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value={20} label="Dipendenti" />
          <StatListItem value={7000} label="Clienti soddisfatti" suffix="+" />
          <StatListItem value={new Date().getFullYear() - 1997} label="Anni di Esperienza" />
        </StatList>
      </Container>

      <Culture />
      <Space />
      <ContactSection />
    </>
  )
}

