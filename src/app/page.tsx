import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoAerauliqaLight from '@/images/clients/Aerauliqa/AerauliqaW.png'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoVaillant from '@/images/clients/vaillant/vaillant.png'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/herman/HermanB.png'
import logoHermanLight from '@/images/clients/herman/HermanW.png'
import logoScavolini from '@/images/clients/scavolini/scavolini.png'
import imageLaptop from '@/images/laptop.jpg'
import imageMagazzino from '@/images/magazzino.jpg'

import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

const clients = [
  ['Herman', logoHermanLight],
  ['Aerauliqa', logoAerauliqaLight],
  ['Scavolini', logoScavolini],
  ['Vaillant', logoVaillant],

]
function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 overflow-hidden sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        {/* Titolo */}
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Collaboriamo con
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>

        {/* Carosello Loghi */}
        <div className="relative mt-10 w-full overflow-hidden">
          <div className="flex animate-marquee space-x-16">
            {/* Loghi duplicati per effetto infinito */}
            {Array(17).fill(clients).flat().map(([client, logo], index) => (
              <div key={index} className="flex-shrink-0 w-[200px] h-[100px] flex items-center justify-center">
          <Image
            src={logo}
            alt={client}
            width={180}
            height={90}
            className="object-contain"
            unoptimized
          />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}




  
function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="I Nostri Servizi"
        title="Forniamo soluzioni termoidrauliche complete e su misura per ogni esigenza."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        La nostra esperienza ci consente di offrire servizi di qualità,
        sempre incentrati sulle necessità dei clienti.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageMagazzino}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Vendita di componenti">
            Offriamo un'ampia gamma di prodotti, dalle caldaie ai radiatori, selezionati dai migliori marchi.
            </ListItem>
            <ListItem title="Consulenza specializzata">
            Il nostro team è pronto ad aiutarti nella scelta delle soluzioni più adatte al tuo progetto.
            </ListItem>
            <ListItem title="Supporto post-vendita">
            Assicuriamo un’assistenza continua per garantirti la massima soddisfazione e affidabilità.

            </ListItem>
            <ListItem title="Soluzioni innovative">
            Ci aggiorniamo costantemente sulle nuove tecnologie per proporti sempre il meglio.


            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'We are a development studio working at the intersection of design and technology.',
}

export default async function Home() {

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
          Climawell S.R.L.       <br /> Leader nel settore termoidraulico dal 1997.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
          Offriamo soluzioni personalizzate nel settore termoidraulico, con una gamma di prodotti di
          alta qualità e un’assistenza post-vendita eccellente. Siamo il partner di fiducia per professionisti
          e hobbisti in tutta Toscana.
          </p>
        </FadeIn>
      </Container>

      <Clients />


      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        Da oltre 20 anni, rappresentiamo con orgoglio Hermann Saunier Duval, leader nel settore termoidraulico, 
        offrendo soluzioni innovative per riscaldamento e climatizzazione. 
      </Testimonial>

        <Services />

      <ContactSection />
    </>
  )
}
