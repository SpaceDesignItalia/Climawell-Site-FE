'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/API/API'

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StorePage() {
  const [products, setProducts] = useState([]) // Stato per memorizzare tutti i prodotti
  const [featuredProducts, setFeaturedProducts] = useState([]) // Stato per memorizzare i prodotti in evidenza
  const [loading, setLoading] = useState(true) // Stato per la gestione del caricamento
  const [error, setError] = useState(null) // Stato per eventuali errori

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts()
      const featuredData = await fetchFeaturedProducts()
      if (featuredData) {
        setFeaturedProducts(featuredData)
      } else {
        setError('Errore nel recupero dei prodotti in evidenza')
      }
      if (data) {
        setProducts(data)
      } else {
        setError('Errore nel recupero dei prodotti')
      }
      setLoading(false) // Disabilita il caricamento
    }

    getProducts()
  }, [])

  if (loading) {
    return <div>Caricamento...</div> // Mostra un messaggio di caricamento
  }

  if (error) {
    return <div>{error}</div> // Mostra un messaggio di errore
  }

  // Aggiungi la condizione per verificare se entrambi i gruppi di prodotti sono vuoti
  if (products.length === 0 && featuredProducts.length === 0) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Vetrina
          </h2>
          <div className="mt-6 text-center text-lg text-gray-500">
            Nessun prodotto disponibile
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Prodotti in evidenza */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Prodotti in evidenza
        </h2>

        {featuredProducts.length === 0 ? (
          <div className="mt-6 text-center text-lg text-gray-500">
            Nessun prodotto in evidenza
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((featuredProduct) => (
              <div key={featuredProduct.ProductId} className="group relative">
                <img
                  alt={'Product Image ' + featuredProduct.ProductName}
                  src={`${API_URL}/Products/GET/GetImageByPath/${featuredProduct.images[0].ProductImageUrl}`}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/products/${featuredProduct.ProductId}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <p>{featuredProduct.ProductName}</p>
                        <p>{featuredProduct.CategoryName}</p>
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    € {featuredProduct.UnitPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vetrina */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Catalogo completo
        </h2>

        {products.length === 0 ? (
          <div className="mt-6 text-center text-lg text-gray-500">
            Nessun prodotto disponibile
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.ProductId} className="group relative">
                <img
                  alt={'Product Image ' + product.ProductName}
                  src={`${API_URL}/Products/GET/GetImageByPath/${product.images[0].ProductImageUrl}`}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/products/${product.ProductId}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        <p>{product.ProductName}</p>
                        <p>{product.CategoryName}</p>
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    € {product.UnitPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
