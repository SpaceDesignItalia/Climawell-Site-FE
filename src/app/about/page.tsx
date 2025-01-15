import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import { loadArticles } from '@/lib/mdx'
import {Space} from '@/components/Team'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="I nostri Valori"
        title="Dedichiamo la nostra esperienza e passione a fornire soluzioni termoidrauliche di qualità."
        invert
      >
        <p>
        Siamo un team compatto che condivide valori chiari e concreti.
        </p>
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
          Rimaniamo al passo con le nuove tecnologie per offrire prodotti all’avanguardia.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'I nostri spazi',
    people: [
      {
        name: 'Francesco Pontrelli',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Savino Depalma',
        role: 'Co-Founder',
        image: { src: imageDriesVincent },
      },
    ],
  },
  {
    title: 'Collaboratori',
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: imageChelseaHagon },
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: imageEmmaDorsey },
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: imageLeonardKrasner },
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: imageBlakeReid },
      },
 
      
    ],
  },
]
function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        {/* Wrapper con effetto gruppo per l'hover */}
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100 transition duration-500">
                          {/* Immagine con l'effetto hover per rimuovere il grayscale */}
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}



export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="Chi siamo" title="La nostra forza e la collaborazione">
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
          Climawell S.r.l, il vostro punto di riferimento nel settore termoidraulico 
          in Toscana e Liguria. Dal 1997, con sede a Firenze, ci impegniamo a offrire 
          prodotti e servizi di eccellenza, soddisfacendo le esigenze di professionisti 
          e appassionati in dieci province: Arezzo (AR), Firenze (FI), Grosseto (GR), 
          Livorno (LI), Lucca (LU), Massa-Carrara (MS), Pisa (PI), Prato (PO), Pistoia 
          (PT), Siena (SI) e La Spezia (SP).
          </p>
          <p>
          Il nostro impegno si traduce nella selezione di componenti termici e idraulici
           di altissima qualità, tra cui caldaie, pompe di calore, radiatori, tubazioni, 
           rubinetteria e accessori. Grazie alla collaborazione con i principali marchi 
           del settore, garantiamo ai nostri clienti prodotti affidabili, innovativi e 
           performanti.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="20" label="Dipendenti" />
          <StatListItem value="7000+" label="Clienti soddisfatti" />
          <StatListItem value="100+" label="Marche" />
        </StatList>
      </Container>

      <Culture />
      <Space />

    

      <ContactSection />
    </>
  )
}
