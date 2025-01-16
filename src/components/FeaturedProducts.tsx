'use client'

import { API_URL } from '@/API/API'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { ProductCard } from './ProductCard'
import { useMediaQuery } from 'react-responsive'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export function FeaturedProducts() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      ProductId: 0,
      ProductName: '',
      ProductModelName: '',
      CategoryName: '',
      UnitPrice: 0,
      DiscountPercentage: 0,
      FirstImage: '',
    },
  ])
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [featuredOrder, setFeaturedOrder] = useState('ASC')
  const [featuredOrderBy, setFeaturedOrderBy] = useState('UnitPrice')
  const [featuredSearchQuery, setFeaturedSearchQuery] = useState('')

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const itemsPerPage = 4
  const totalFeaturedPages = Math.ceil(featuredProducts.length / itemsPerPage)
  const [currentFeaturedPage, setCurrentFeaturedPage] = useState(1)

  const startFeaturedIndex = (currentFeaturedPage - 1) * itemsPerPage
  const currentFeaturedProducts = featuredProducts.slice(
    startFeaturedIndex,
    startFeaturedIndex + itemsPerPage,
  )

  const sliderRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Products/GET/GetFeaturedProducts`,
      )
      return response.data
    } catch (error) {
      console.error('Errore nel recupero dei prodotti in evidenza:', error)
      return null
    }
  }

  const orderFeaturedProducts = async (
    order: string,
    orderBy: string,
    query: string,
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/Products/GET/OrderFeaturedProductsBy`,
        {
          params: { order: order, orderBy: orderBy, searchQuery: query },
        },
      )
      setFeaturedProducts(response.data)
      return response.data
    } catch (error) {
      console.error('Errore nel recupero dei prodotti in evidenza:', error)
      return null
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const featuredData = await fetchFeaturedProducts()

        if (featuredData) {
          setFeaturedProducts(featuredData)
        } else {
          setError('Errore nel recupero dei prodotti in evidenza')
        }
      } catch (err) {
        setError('Errore durante il caricamento dei dati')
      } finally {
        setLoading(false)
      }
    }

    getProducts()
    orderFeaturedProducts(featuredOrder, featuredOrderBy, featuredSearchQuery)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentProductIndex((prevIndex) =>
        prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
      )
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentProductIndex((prevIndex) =>
        prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
      )
    }
  }

  const goToFeaturedPage = (page: number) => {
    if (page >= 1 && page <= totalFeaturedPages) {
      setCurrentFeaturedPage(page)
    }
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div
          className="text-primary inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="rounded-lg">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Prodotti in evidenza
          </h1>
        </div>

        <section
          aria-labelledby="filter-heading"
          className="border-t border-gray-200 py-6"
        >
          <h2 id="filter-heading" className="sr-only">
            Product filters
          </h2>

          <div className={`flex ${isMobile ? 'flex-col' : 'items-center justify-between'}`}>
            <div className={`${isMobile ? 'mb-4' : ''}`}>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Ordina per prezzo{' '}
                    {featuredOrder == 'ASC' ? 'crescente' : 'decrescente'}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            setFeaturedOrderBy('UnitPrice')
                            setFeaturedOrder('ASC')
                            orderFeaturedProducts(
                              'ASC',
                              featuredOrderBy,
                              featuredSearchQuery,
                            )
                          }}
                          className={`block px-4 py-2 text-sm font-medium ${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-900'
                          }`}
                        >
                          Crescente
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            setFeaturedOrderBy('UnitPrice')
                            setFeaturedOrder('DESC')
                            orderFeaturedProducts(
                              'DESC',
                              featuredOrderBy,
                              featuredSearchQuery,
                            )
                          }}
                          className={`block px-4 py-2 text-sm font-medium ${
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-900'
                          }`}
                        >
                          Decrescente
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            </div>

            <div className={`${isMobile ? 'w-full' : 'w-1/3'} relative`}>
              <input
                onChange={(e) => {
                  setFeaturedSearchQuery(e.target.value)
                  orderFeaturedProducts(
                    featuredOrder,
                    featuredOrderBy,
                    e.target.value,
                  )
                }}
                id="name"
                name="name"
                type="name"
                placeholder="Cerca per nome prodotto"
                className="block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
              />
              <SearchRoundedIcon
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </section>
      </div>
      <div className="mx-auto max-w-2xl rounded-lg px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="lg:col-span-3">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {featuredProducts.length === 0 ? (
              <div className="mt-6 text-center text-lg text-gray-500">
                Nessun prodotto in evidenza
              </div>
            ) : isMobile ? (
              <div
                ref={sliderRef}
                className="relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${currentProductIndex * 100}%)`,
                  }}
                >
                  {featuredProducts.map((product, index) => (
                    <div key={product.ProductId} className="w-full flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentProductIndex(index)}
                      className={`h-2 w-2 rounded-full mx-1 ${
                        currentProductIndex === index
                          ? 'bg-gray-800'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {currentFeaturedProducts.map((product) => (
                  <ProductCard key={product.ProductId} product={product} />
                ))}
              </div>
            )}
            {!isMobile && (
              <nav className="my-12 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                <div className="-mt-px flex w-0 flex-1">
                  <button
                    onClick={() => goToFeaturedPage(currentFeaturedPage - 1)}
                    disabled={currentFeaturedPage === 1}
                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
                  >
                    <ArrowLongLeftIcon
                      aria-hidden="true"
                      className="mr-3 size-5 text-gray-400"
                    />
                    Precedente
                  </button>
                </div>
                <div className="hidden md:-mt-px md:flex">
                  {Array.from({ length: totalFeaturedPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToFeaturedPage(index + 1)}
                      className={classNames(
                        'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
                        currentFeaturedPage === index + 1
                          ? 'text-black-600 border-black'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="-mt-px flex w-0 flex-1 justify-end">
                  <button
                    onClick={() => goToFeaturedPage(currentFeaturedPage + 1)}
                    disabled={currentFeaturedPage === totalFeaturedPages}
                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 disabled:opacity-50"
                  >
                    Successiva
                    <ArrowLongRightIcon
                      aria-hidden="true"
                      className="ml-3 size-5 text-gray-400"
                    />
                  </button>
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
