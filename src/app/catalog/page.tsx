'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/API/API'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Container } from '@/components/Container'
import { API_IMAGE_URL } from '@/API/API'
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'

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
  const [featuredSearchQuery, setFeaturedSearchQuery] = useState('')

  const [order, setOrder] = useState('ASC')
  const [orderBy, setOrderBy] = useState('UnitPrice')

  const [featuredOrder, setFeaturedOrder] = useState('ASC')
  const [featuredOrderBy, setFeaturedOrderBy] = useState('UnitPrice')

  const orderProducts = async (
    order: string,
    orderBy: string,
    query: string,
  ) => {
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

  const [products, setProducts] = useState([
    {
      ProductId: 0,
      ProductName: '',
      ProductModelName: '',
      CategoryName: '',
      UnitPrice: 0,
      FirstImage: '',
    },
  ])
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      ProductId: 0,
      ProductName: '',
      ProductModelName: '',
      CategoryName: '',
      UnitPrice: 0,
      FirstImage: '',
    },
  ])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const itemsPerPage = 4
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

  const totalFeaturedPages = Math.ceil(featuredProducts.length / itemsPerPage)
  const [currentFeaturedPage, setCurrentFeaturedPage] = useState(1)

  const startFeaturedIndex = (currentFeaturedPage - 1) * itemsPerPage
  const currentFeaturedProducts = featuredProducts.slice(
    startFeaturedIndex,
    startFeaturedIndex + itemsPerPage,
  )

  const goToFeaturedPage = (page: any) => {
    if (page >= 1 && page <= totalFeaturedPages) {
      setCurrentFeaturedPage(page)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchAllProducts()
        const featuredData = await fetchFeaturedProducts()

        if (featuredData) {
          setFeaturedProducts(featuredData)
        } else {
          setError('Errore nel recupero dei prodotti in evidenza')
        }

        if (data) {
          setProducts(data)

          const images = await axios.get(
            `${API_URL}/Products/GET/GetImagesByProductId`,
            {
              params: {
                ProductId: data[0].ProductId,
              },
            },
          )
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
    orderFeaturedProducts(featuredOrder, featuredOrderBy, featuredSearchQuery)
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (loading) {
    return <div>Caricamento in corso...</div>
  }

  return (
    <Container className="">
      <div>
        <main className="mx-auto max-w-7xl rounded-lg px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-lg px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
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

                  <div className="flex items-center justify-between">
                    <div>
                      Ordina per
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="orderBy"
                          name="orderBy"
                          defaultValue={featuredOrderBy}
                          onChange={(e) => {
                            setFeaturedOrderBy(e.target.value)
                            orderFeaturedProducts(
                              featuredOrder,
                              e.target.value,
                              featuredSearchQuery,
                            )
                          }}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border-2 border-gray-200 bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                        >
                          <option value="UnitPrice">Prezzo</option>
                          <option value="ProductName">Nome</option>
                          <option value="Weight">Peso</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="order"
                          name="order"
                          defaultValue={featuredOrder}
                          onChange={(e) => {
                            setFeaturedOrder(e.target.value)
                            orderFeaturedProducts(
                              e.target.value,
                              featuredOrderBy,
                              featuredSearchQuery,
                            )
                          }}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border-2 border-gray-200 bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                        >
                          <option value="ASC">Crescente</option>
                          <option value="DESC">Decrescente</option>
                        </select>

                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Ricerca per nome
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="name"
                          onChange={(e) => {
                            setFeaturedSearchQuery(e.target.value)
                            orderFeaturedProducts(
                              featuredOrder,
                              featuredOrderBy,
                              e.target.value,
                            )
                          }}
                          placeholder="Nome prodotto..."
                          className="block w-full rounded-md border-2 border-gray-200 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {featuredProducts.length === 0 ? (
                  <div className="mt-6 text-center text-lg text-gray-500">
                    Nessun prodotto in evidenza
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {currentFeaturedProducts.map((featuredProduct) => (
                      <div
                        key={featuredProduct.ProductId}
                        className="group relative"
                      >
                        <img
                          alt={'Product Image ' + featuredProduct.ProductName}
                          src={`${API_IMAGE_URL}${featuredProduct.FirstImage}`}
                          className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                        <div className="mt-4 flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              € {featuredProduct.UnitPrice}
                            </p>
                            <h3 className="text-sm text-gray-700">
                              <a
                                href={`/products/${featuredProduct.ProductId}`}
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <p>{featuredProduct.ProductName}</p>
                                <p>{featuredProduct.ProductModelName}</p>
                                <p>{featuredProduct.CategoryName}</p>
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              </div>
            </div>
          </div>

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

                  <div className="flex items-center justify-between">
                    <div>
                      Ordina per
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="orderBy"
                          name="orderBy"
                          defaultValue={orderBy}
                          onChange={(e) => {
                            setOrderBy(e.target.value)
                            orderProducts(order, e.target.value, searchQuery)
                          }}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border-2 border-gray-200 bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                        >
                          <option value="UnitPrice">Prezzo</option>
                          <option value="ProductName">Nome</option>
                          <option value="Weight">Peso</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="order"
                          name="order"
                          defaultValue={order}
                          onChange={(e) => {
                            setOrder(e.target.value)
                            orderProducts(e.target.value, orderBy, searchQuery)
                          }}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md border-2 border-gray-200 bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                        >
                          <option value={'ASC'}>Crescente</option>
                          <option value={'DESC'}>Decrescente</option>
                        </select>

                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Ricerca per nome
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => {
                            setSearchQuery(e.target.value)
                            orderProducts(order, orderBy, e.target.value)
                          }}
                          id="name"
                          name="name"
                          type="name"
                          placeholder="Nome prodotto..."
                          className="block w-full rounded-md border-2 border-gray-200 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                        />
                      </div>
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
                          src={`${API_IMAGE_URL}${product.FirstImage}`}
                          className="aspect-square w-full rounded-md object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        />
                        <div className="mt-4 flex justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              € {product.UnitPrice}
                            </p>
                            <h3 className="text-sm text-gray-700">
                              <a href={`/products/${product.ProductId}`}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                <p>{product.ProductName}</p>
                                <p>{product.ProductModelName}</p>
                                <p>{product.CategoryName}</p>
                              </a>
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <nav className="my-12 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
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
                    {Array.from({ length: totalProductPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToProductPage(index + 1)}
                        className={classNames(
                          'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
                          currentProductPage === index + 1
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
