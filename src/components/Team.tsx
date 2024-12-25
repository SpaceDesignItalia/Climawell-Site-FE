'use client'
import Image from 'next/image'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import primo from '@/images/spazi/MCX06519-Migliorato-NR.jpg'
import secondo from '@/images/spazi/MCX06284-Migliorato-NR.jpg'
import terzo from '@/images/spazi/MCX06307.jpg'
import quarto from '@/images/spazi/MCX06438.jpg'
import quinto from '@/images/spazi/MCX06336.jpg'

export function Space() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <FadeIn>
            <h2 className="block font-display text-base font-semibold text-neutral-950">I nostri spazi</h2>
            <p className="mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              Un ambiente di lavoro accogliente e stimolante
            </p>
          </FadeIn>
          
          <FadeInStagger>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              <FadeIn className="relative lg:col-span-3">
                <div className="absolute inset-px rounded-2xl bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                  <Image
                    alt="Magazzino"
                    src={primo}
                    className="h-80 object-cover object-left rounded-t-2xl"
                  />                
                  <div className="p-10 pt-4">
                    <h3 className="text-sm/4 font-semibold text-black-600">Magazzino</h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Il centro della nostra logistica</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Ogni dettaglio del nostro magazzino è ottimizzato per velocità ed efficienza: dai prodotti agli ordini, tutto è organizzato per soddisfare al meglio le tue necessità.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-2xl ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              </FadeIn>

              <FadeIn className="relative lg:col-span-3">
                <div className="absolute inset-px rounded-2xl bg-white lg:rounded-tr-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl lg:rounded-tr-[calc(2rem+1px)]">
                  <Image
                    alt="Ufficio"
                    src={secondo}
                    className="h-80 object-cover object-right rounded-t-2xl"
                  />    
                  <div className="p-10 pt-4">
                    <h3 className="text-sm/4 font-semibold text-black-600">Ufficio</h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Creatività e innovazione al centro</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Nel nostro ufficio, ogni progetto prende forma grazie a uno spazio dedicato al confronto, alla collaborazione e all'innovazione.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-2xl ring-1 shadow-sm ring-black/5 lg:rounded-tr-[2rem]" />
              </FadeIn>

              <FadeIn className="relative lg:col-span-2">
                <div className="absolute inset-px rounded-2xl bg-white lg:rounded-bl-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl lg:rounded-bl-[calc(2rem+1px)]">
                  <Image
                    alt="Velocità"
                    src={terzo}
                    className="h-80 object-cover object-left rounded-t-2xl"
                  />    
                  <div className="p-10 pt-4">
                    <h3 className="text-sm/4 font-semibold text-black-600">Velocità</h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Risultati rapidi senza compromessi</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Processi ottimizzati per rispondere prontamente alle esigenze dei clienti, mantenendo sempre alta la qualità.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-2xl ring-1 shadow-sm ring-black/5 lg:rounded-bl-[2rem]" />
              </FadeIn>

              <FadeIn className="relative lg:col-span-2">
                <div className="absolute inset-px rounded-2xl bg-white" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
                  <Image
                    alt="Competenza"
                    src={quarto}
                    className="h-80 object-cover rounded-t-2xl"
                  /> 
                  <div className="p-10 pt-4">
                    <h3 className="text-sm/4 font-semibold text-black-600">Competenza</h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Esperti al tuo servizio</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Professionisti altamente qualificati lavorano con te per fornire soluzioni avanzate e personalizzate.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-2xl ring-1 shadow-sm ring-black/5" />
              </FadeIn>

              <FadeIn className="relative lg:col-span-2">
                <div className="absolute inset-px rounded-2xl bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                  <Image
                    alt="Cliente soddisfatto"
                    src={quinto}
                    className="h-80 object-cover object-right rounded-t-2xl"
                  /> 
                  <div className="p-10 pt-4">
                    <h3 className="text-sm/4 font-semibold text-black-600">Cliente soddisfatto</h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Il nostro successo è la tua soddisfazione</p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Con un approccio orientato al cliente, lavoriamo per garantire soluzioni su misura e un servizio impeccabile.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-px rounded-2xl ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              </FadeIn>
            </div>
          </FadeInStagger>
        </div>
      </div>
    )
}
