import Image from 'next/image'
import primo from '@/images/spazi/MCX06519-Migliorato-NR.jpg'
import secondo from '@/images/spazi/MCX06284-Migliorato-NR.jpg'
import terzo from '@/images/spazi/MCX06307.jpg'
import quarto from '@/images/spazi/MCX06438.jpg'
import quinto from '@/images/spazi/MCX06336.jpg'

export function Space() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-base/7 font-semibold text-black-600">I nostri spazi</h2>
          <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
            Un ambiente di lavoro accogliente e stimolante
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <Image
                alt="Magazzino"
                src={primo}
                className="h-80 object-cover object-left" // Usa className responsive

              />                

                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Magazzino</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Tutto ciò di cui hai bisogno, in un solo posto</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Il nostro magazzino è attrezzato con tutto il necessario per soddisfare le tue esigenze. Dalla gestione dei prodotti alla preparazione degli ordini, ogni spazio è pensato per ottimizzare il flusso di lavoro e garantire efficienza.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <Image
                alt="Ufficio"
                src={secondo}
                className="h-80 object-cover object-right" // Usa className responsive

              />    
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Ufficio</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Il cuore pulsante della nostra attività</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Il nostro ufficio è dove le idee prendono forma. Ogni spazio è progettato per promuovere la collaborazione e l'innovazione. Offriamo l'ambiente ideale per dare vita ai progetti più ambiziosi.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
               
            <Image
                alt="Velocità"
                src={terzo}
                className="h-80 object-cover object-left" // Usa className responsive
              />    
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Velocità</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Progettato per gli utenti più esigenti</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    La velocità è la nostra priorità. Ogni processo è ottimizzato per garantire che tu possa ottenere i risultati più rapidamente, senza compromettere la qualità. Offriamo un ambiente che facilita l'efficienza e il miglioramento continuo.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <Image
                alt="Competenza"
                src={quarto}
                className="h-80 object-cover" // Usa className responsive
              /> 
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Competenza</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Collaboriamo con i migliori</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Il nostro team è composto da professionisti altamente qualificati, esperti nel loro campo. Collaboriamo per offrire soluzioni innovative e di qualità superiore, mettendo a disposizione delle aziende le competenze più avanzate.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <Image
                alt="Cliente soddisfatto"
                src={quinto}
                className="h-80 object-cover object-right" // Usa className responsive
              /> 
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Cliente soddisfatto</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Il nostro obiettivo è la tua soddisfazione</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    La soddisfazione del cliente è al centro di tutto ciò che facciamo. Ogni aspetto del nostro lavoro è orientato a garantire che i nostri clienti ricevano il miglior servizio e le migliori soluzioni per le loro esigenze.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
            </div>
          </div>
        </div>
      </div>
    )
}
