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
                alt="I nostri spazi"
                src={primo}
                className="h-80 object-cover object-left" // Usa className responsive

              />                

                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Performance</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Lightning-fast builds</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida justo et nulla efficitur, maximus
                    egestas sem pellentesque.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
            </div>
            <div className="relative lg:col-span-3">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <Image
                alt="I nostri spazi"
                src={secondo}
                className="h-80 object-cover object-right" // Usa className responsive

              />    
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Releases</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Push to deploy</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Curabitur auctor, ex quis auctor venenatis, eros arcu rhoncus massa, laoreet dapibus ex elit vitae
                    odio.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-tr-[2rem]" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
               
            <Image
                alt="I nostri spazi"
                src={terzo}
                className="h-80 object-cover object-left" // Usa className responsive
              />    
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Speed</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Built for power users</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Sed congue eros non finibus molestie. Vestibulum euismod augue.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-bl-[2rem]" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <Image
                alt="I nostri spazi"
                src={quarto}
                className="h-80 object-cover" // Usa className responsive
              /> 
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Integrations</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Connect your favorite tools</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Maecenas at augue sed elit dictum vulputate, in nisi aliquam maximus arcu.
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
            </div>
            <div className="relative lg:col-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <Image
                alt="I nostri spazi"
                src={quinto}
                className="h-80 object-cover object-right" // Usa className responsive
              /> 
                <div className="p-10 pt-4">
                  <h3 className="text-sm/4 font-semibold text-black-600">Network</h3>
                  <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">Globally distributed CDN</p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                    Aenean vulputate justo commodo auctor vehicula in malesuada semper.
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
  