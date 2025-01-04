'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { API_URL } from '@/API/API'
import { API_IMAGE_URL } from '@/API/API'
import { Container } from '@/components/Container'

const fetchProductData = async (productId: any) => {
  try {
    const response = await axios.get(`${API_URL}/Products/GET/GetProductById`, {
      params: {
        id: productId,
      },
    })

    const images = await axios.get(
      `${API_URL}/Products/GET/GetImagesByProductId`,
      {
        params: {
          ProductId: productId,
        },
      },
    )
    return [response.data, images.data]
  } catch (error) {
    console.error('Errore nel recupero dei dati del prodotto:', error)
    return null
  }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState({
    ProductName: '',
    ProductModelName: '',
    ProductDescription: '',
    ProductAmount: 0,
    UnitPrice: 0,
    Width: 0,
    Height: 0,
    Depth: 0,
    Weight: 0,
    CategoryName: '',
    images: [
      {
        ProductImageUrl: '',
        ProductImageAlt: '',
        primary: false,
      },
    ],
  })

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return
      const data = await fetchProductData(productId)
      if (data) {
        setProduct(data[0])
      }
    }

    getProduct()
  }, [productId])

  if (!product) {
    return <div>Caricamento...</div>
  }

  return (
    <Container className="mt-12 sm:mt-32 md:mt-56">
      <div className="rounded-xl sm:pt-10">
        <main className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <div>
                  {product.CategoryName ? (
                    <p className="text-sm text-gray-500">
                      {product.CategoryName}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">Nessuna categoria</p>
                  )}

                  <h1 className="text-xl font-medium text-gray-900">
                    {product.ProductName}
                  </h1>
                </div>
              </div>
              <p className="text-xl font-medium text-gray-900">
                € {product.UnitPrice}
              </p>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              {Array.isArray(product.images) && product.images.length > 0 ? (
                product.images.length === 1 ? (
                  // Se c'è una sola immagine, la mostriamo grande
                  <img
                    alt={product.images[0].ProductImageAlt || 'Product Image'}
                    src={`${API_IMAGE_URL}${product.images[0].ProductImageUrl}`}
                    className="w-full rounded-lg"
                  />
                ) : (
                  // Se ci sono più immagini, usiamo la grid
                  <div className="grid grid-cols-2 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        alt={
                          image.ProductImageAlt || `Product Image ${index + 1}`
                        }
                        src={`${API_IMAGE_URL}${image.ProductImageUrl}`}
                        className={classNames(
                          index === 0
                            ? 'lg:col-span-2 lg:row-span-2' // La prima immagine occupa due colonne e due righe
                            : 'lg:block', // Le altre immagini sono normali
                          'rounded-lg',
                        )}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center text-gray-500">
                  Nessuna immagine disponibile
                </div>
              )}
            </div>

            <div className="mt-8 lg:col-span-5">
              {/* Product details */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  Descrizione
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.ProductDescription,
                  }}
                  className="mt-4 space-y-4 text-sm/6 text-gray-500"
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Quantità disponibile
                </h2>
                <div className="flex flex-row gap-4 space-y-4">
                  <p className="mt-4 text-sm text-gray-500">
                    {product.ProductAmount} Pz.
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Dimensioni (LxHxP) e peso
                </h2>
                <div className="flex flex-row gap-4 space-y-4">
                  <p className="mt-4 text-sm text-gray-500">
                    {product.Width} x {product.Height} x {product.Depth} cm
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    {product.Weight} Kg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}
