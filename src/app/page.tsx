import Image from 'next/image'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoAerauliqaLight from '@/images/clients/Aerauliqa/AerauliqaW.png'
import logoHermanLight from '@/images/clients/herman/HermanW.png'
import logoScavolini from '@/images/clients/scavolini/scavolini.png'
import logoVaillant from '@/images/clients/vaillant/vaillant.png'
import logoessecasa from '@/images/essecasa/essecasa.png'
import imageMagazzino from '@/images/magazzino.jpg'
import { FeaturedProducts } from '@/components/FeaturedProducts'

const clients = [
  ['Herman', logoHermanLight],
  ['Aerauliqa', logoAerauliqaLight],
  ['Scavolini', logoScavolini],
  ['Vaillant', logoVaillant],
]
function Clients() {
  return (
    <div className="mt-24 overflow-hidden rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
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
          <div className="animate-marquee flex space-x-16">
            {/* Loghi duplicati per effetto infinito */}
            {Array(17)
              .fill(clients)
              .flat()
              .map(([client, logo], index) => (
                <div
                  key={index}
                  className="flex h-[100px] w-[200px] flex-shrink-0 items-center justify-center"
                >
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
  )
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
          La nostra esperienza ci consente di offrire servizi di qualità, sempre
          incentrati sulle necessità dei clienti.
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
              Offriamo un'ampia gamma di prodotti, dalle caldaie ai radiatori,
              selezionati dai migliori marchi.
            </ListItem>
            <ListItem title="Consulenza specializzata">
              Il nostro team è pronto ad aiutarti nella scelta delle soluzioni
              più adatte al tuo progetto.
            </ListItem>
            <ListItem title="Supporto post-vendita">
              Assicuriamo un’assistenza continua per garantirti la massima
              soddisfazione e affidabilità.
            </ListItem>
            <ListItem title="Soluzioni innovative">
              Ci aggiorniamo costantemente sulle nuove tecnologie per proporti
              sempre il meglio.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export default async function Home() {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Climawell S.R.L. <br /> Leader nel settore termoidraulico dal 1997.
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Offriamo soluzioni personalizzate nel settore termoidraulico, con
            una gamma di prodotti di alta qualità e un’assistenza post-vendita
            eccellente. Siamo il partner di fiducia per professionisti e
            hobbisti in tutta Toscana.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <FeaturedProducts />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Essecasa', logo: logoessecasa }}
      >
        Essecasa, fondata nel 2016 e parte del gruppo Climawell, è il punto di
        riferimento per soluzioni innovative nel settore dell'arredamento.
        Visita il nostro showroom per scoprire prodotti di alta qualità per la
        tua casa.
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
