'use client'

import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { API_URL } from '@/API/API'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Container } from '@/components/Container'
import { API_IMAGE_URL } from '@/API/API'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import { Menu } from '@headlessui/react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/Products/GET/GetAllProducts`)
    return response.data
  } catch (error) {
    console.error('Errore nel recupero dei prodotti:', error)
    return null
  }
}

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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const [order, setOrder] = useState('ASC')
  const [orderBy, setOrderBy] = useState('UnitPrice')

  const orderProducts = useCallback(
    async (order: string, orderBy: string, query: string) => {
      try {
        const response = await axios.get(
          `${API_URL}/Products/GET/OrderProductsBy`,
          {
            params: { order: order, orderBy: orderBy, searchQuery: query },
          },
        )
        setProducts(response.data)
        return response.data
      } catch (error) {
        console.error('Errore nel recupero dei prodotti:', error)
        return null
      }
    },
    [],
  )

  const generatePagination = (currentPage: number, totalPages: number) => {
    const pages = []
    const maxPagesToShow = 7 // Numero massimo di elementi visibili (compresi numeri e ellipsis)
    const range = 2 // Numero di pagine da mostrare intorno alla pagina corrente

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1) // Prima pagina

      if (currentPage > range + 2) {
        pages.push('...')
      }

      const start = Math.max(2, currentPage - range)
      const end = Math.min(totalPages - 1, currentPage + range)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - range - 1) {
        pages.push('...')
      }

      pages.push(totalPages) // Ultima pagina
    }

    return pages
  }

  const [products, setProducts] = useState([
    {
      ProductId: 0,
      ProductName: '',
      ProductModelName: '',
      CategoryName: '',
      UnitPrice: 0,
      DiscountPercentage: 0,
      FirstImage: '',
      BrandName: '',
    },
  ])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  const itemsPerPage = 16
  const totalProductPages = Math.ceil(products.length / itemsPerPage)
  const [currentProductPage, setCurrentProductPage] = useState(1)

  const startProductIndex = (currentProductPage - 1) * itemsPerPage
  const currentProducts = products.slice(
    startProductIndex,
    startProductIndex + itemsPerPage,
  )

  const goToProductPage = (page: any) => {
    if (page >= 1 && page <= totalProductPages) {
      setCurrentProductPage(page)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts()
        const featuredData = await fetchFeaturedProducts()

        if (data) {
          setProducts(data)
        } else {
          setError('Errore nel recupero dei prodotti')
        }
      } catch (err) {
        setError('Errore durante il caricamento dei dati')
      } finally {
        setLoading(false)
      }
    }

    getProducts()
    orderProducts(order, orderBy, searchQuery)
  }, [order, orderBy, searchQuery, orderProducts])

  if (error) {
    return <div>{error}</div>
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

  return (
    <Container className="">
      <div>
        <main className="mx-auto max-w-7xl rounded-lg px-4 py-12 sm:px-6 lg:px-8">
          <div className="mt-12 rounded-lg px-4 py-12 sm:px-6 lg:px-8">
            <div>
              <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="py-12">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Catalogo completo
                  </h1>
                </div>

                <section
                  aria-labelledby="filter-heading"
                  className="border-t border-gray-200 py-6"
                >
                  <h2 id="filter-heading" className="sr-only">
                    Product filters
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            Ordina per prezzo{' '}
                            {order == 'ASC' ? 'crescente' : 'decrescente'}
                            <ChevronDownIcon
                              aria-hidden="true"
                              className="pointer-events-none ml-2 size-5 self-center text-gray-500 sm:size-4"
                            />
                          </Menu.Button>
                        </div>

                        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  onClick={() => {
                                    setOrderBy('UnitPrice')
                                    setOrder('ASC')
                                    orderProducts('ASC', orderBy, searchQuery)
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
                                    setOrderBy('UnitPrice')
                                    setOrder('DESC')
                                    orderProducts('DESC', orderBy, searchQuery)
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

                    <div className="relative w-full sm:w-1/3">
                      <input
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          orderProducts(order, orderBy, e.target.value)
                        }}
                        id="name"
                        name="name"
                        type="name"
                        placeholder="Cerca per nome prodotto"
                        className="block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                      />
                      <SearchRoundedIcon
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {products.length === 0 ? (
                  <div className="mt-6 text-center text-lg text-gray-500">
                    Nessun prodotto disponibile
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {currentProducts.map((product) => (
                      <div key={product.ProductId} className="group relative">
                        <img
                          alt={'Product Image ' + product.ProductName}
                          src={
                            product.FirstImage.includes('https://')
                              ? product.FirstImage
                              : `${API_IMAGE_URL}${product.FirstImage}`
                          }
                          className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                        <p className="text-semibold font-medium text-gray-800">
                          {product.BrandName}
                        </p>
                        <p className="text-xs">{product.CategoryName}</p>
                        <div className="mt-4 flex justify-between">
                          <div>
                            {/*  <p className="text-sm font-medium text-gray-900">
                              {product.DiscountPercentage ? (
                                <>
                                  <span className="text-red-500 line-through">
                                    € {product.UnitPrice}
                                  </span>
                                  <span className="ml-2 text-green-500">
                                    €{' '}
                                    {(
                                      product.UnitPrice *
                                      (1 - product.DiscountPercentage / 100)
                                    ).toFixed(2)}
                                  </span>
                                  <span className="ml-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                                    - {product.DiscountPercentage}%
                                  </span>
                                </>
                              ) : (
                                `€ ${product.UnitPrice}`
                              )}
                            </p>
 */}
                            <h3 className="text-sm text-gray-700">
                              <a href={`/products/${product.ProductId}`}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <p>{product.ProductName}</p>
                                <p>{product.ProductModelName}</p>
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <nav className="mt-10 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
                  <div className="-mt-px flex w-0 flex-1">
                    <button
                      onClick={() => goToProductPage(currentProductPage - 1)}
                      disabled={currentProductPage === 1}
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
                    {generatePagination(
                      currentProductPage,
                      totalProductPages,
                    ).map((page, index) =>
                      page === '...' ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500"
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToProductPage(page)}
                          className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                            currentProductPage === page
                              ? 'border-indigo-500 text-indigo-600'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}
                  </div>
                  <div className="-mt-px flex w-0 flex-1 justify-end">
                    <button
                      onClick={() => goToProductPage(currentProductPage + 1)}
                      disabled={currentProductPage === totalProductPages}
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}
