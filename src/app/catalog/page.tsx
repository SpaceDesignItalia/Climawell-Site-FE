'use client'
import React from 'react'

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '/products/${id}',
    imageSrc:
      'https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '€35',
    color: 'Black',
  },
  // More products...
]

//Da implementare le query per recuperare i prodotti dal db

export default function StorePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Vetrina
        </h2>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative top-16 z-50 ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filtri
                    </h2>
                    <button
                      type="button"
                      className="relative -mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Chiudi menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <form className="mt-4 px-5">
                    <RadioGroup
                      defaultValue={tempOrderBy}
                      onChange={handleTempOrderByChange}
                    >
                      <h2 className="text-lg font-semibold">Ordina per</h2>
                      <Radio value="empty">Nulla</Radio>
                      <Radio value="ASC">Prezzo crescente</Radio>
                      <Radio value="DESC">Prezzo decrescente</Radio>
                    </RadioGroup>
                    <h2 className="pt-5 text-lg font-semibold">Filtra per</h2>
                    <h3 className="pt-2 text-sm font-semibold">Prezzo</h3>
                    <div className="flex flex-row gap-3">
                      <Input
                        variant="faded"
                        type="number"
                        value={tempValue[0]}
                        aria-label="Prezzo minimo"
                        onChange={(e) => {
                          setTempValue([e.target.value, tempValue[1]])
                        }}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              €
                            </span>
                          </div>
                        }
                      />
                      <Input
                        variant="faded"
                        type="number"
                        value={tempValue[1]}
                        aria-label="Prezzo massimo"
                        onChange={(e) => {
                          setTempValue([tempValue[0], e.target.value])
                        }}
                        maxValue={300}
                        endContent={
                          <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">
                              €
                            </span>
                          </div>
                        }
                      />
                    </div>
                    <Slider
                      showTooltip={true}
                      formatOptions={{ style: 'currency', currency: 'EUR' }}
                      step={10}
                      maxValue={300}
                      minValue={0}
                      value={tempValue}
                      onChange={handleTempPriceChange}
                      className="mt-2"
                      aria-label="Prezzo"
                    />
                    <Button
                      onClick={applyFiltersAndSort}
                      className="bg-primary mt-3 w-full text-white"
                    >
                      Applica
                    </Button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="border-b border-gray-200 pb-10 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Climawell
            </h1>
            <p className="mt-4 text-base text-gray-500">
             Bene
            </p>
          </div>

          <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filtri</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filtri
                </span>

                <TuneRoundedIcon
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-3 divide-gray-200">
                  <RadioGroup
                    defaultValue={orderBy}
                    onChange={handleTempOrderByChange}
                  >
                    <h2 className="text-lg font-semibold">Ordina per</h2>
                    <Radio value="empty">Nulla</Radio>
                    <Radio value="ASC">Prezzo crescente</Radio>
                    <Radio value="DESC">Prezzo decrescente</Radio>
                  </RadioGroup>
                  <h2 className="pt-3 text-lg font-semibold">Filtra per</h2>
                  <h3 className="text-sm font-semibold">Prezzo</h3>
                  <div className="flex flex-row gap-3">
                    <Input
                      variant="faded"
                      type="number"
                      value={tempValue[0]}
                      aria-label="Prezzo minimo"
                      onChange={(e) => {
                        setTempValue([e.target.value, tempValue[1]])
                      }}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">€</span>
                        </div>
                      }
                    />

                    <Input
                      variant="faded"
                      type="number"
                      value={tempValue[1]}
                      aria-label="Prezzo massimo"
                      onChange={(e) => {
                        setTempValue([tempValue[0], e.target.value])
                      }}
                      maxValue={300}
                      endContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">€</span>
                        </div>
                      }
                    />
                  </div>
                  <Slider
                    showTooltip={true}
                    formatOptions={{ style: 'currency', currency: 'EUR' }}
                    step={10}
                    maxValue={300}
                    minValue={0}
                    value={tempValue}
                    onChange={handleTempPriceChange}
                    aria-label="Prezzo"
                  />
                  <Button
                    onClick={applyFiltersAndSort}
                    className="bg-primary w-full text-white"
                  >
                    Applica
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
