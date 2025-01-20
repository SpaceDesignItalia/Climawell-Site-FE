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
      params: { ProductId: productId },
    })
    return response.data
  } catch (error) {
    console.error('Errore nel recupero dei dati del prodotto:', error)
    return null
  }
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    const loadProductData = async () => {
      const productData = await fetchProductData(productId)
      if (productData) {
        setProduct({
          ProductName: productData.ProductName,
          ProductModelName: productData.ProductModelName || '',
          ProductDescription: productData.ProductDescription || '',
          ProductAmount: productData.ProductAmount || 0,
          UnitPrice: productData.UnitPrice || 0,
          Width: productData.Width || 0,
          Height: productData.Height || 0,
          Depth: productData.Depth || 0,
          Weight: productData.Weight || 0,
          CategoryName: productData.CategoryName || 'Nessuna categoria',
          DiscountPercentage: productData.DiscountPercentage || null,
          images:
            productData.ProductImages?.map((img: any) => ({
              ProductImageUrl: img.ProductImageUrl,
              ProductImageAlt: img.ProductImageAlt || 'Immagine prodotto',
              primary: false,
            })) || [],
        })
      }
    }
    loadProductData()
  }, [productId])

  if (!product) {
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
    <Container className="mt-12 sm:mt-32 md:mt-56">
      <div className="rounded-xl sm:pt-10">
        <main className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {product.CategoryName}
                  </p>
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.ProductName}
                  </h1>
                </div>
              </div>
              {/* <p className="my-auto text-xl font-medium text-gray-900">
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
                      ).toFixed(2)}{' '}
                    </span>
                    <span className="ml-2 rounded-full bg-green-500 px-2 py-1 text-sm font-semibold text-white">
                      - {product.DiscountPercentage}%
                    </span>
                  </>
                ) : (
                  `€ ${product.UnitPrice}`
                )}
              </p> */}
            </div>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              {Array.isArray(product.images) && product.images.length > 0 ? (
                product.images.length === 1 ? (
                  <img
                    alt={product.images[0].ProductImageAlt || 'Product Image'}
                    src={
                      product.images[0].ProductImageUrl.includes('https://')
                        ? product.images[0].ProductImageUrl
                        : `${API_IMAGE_URL}${product.images[0].ProductImageUrl}`
                    }
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                    {product.images.map((image: any, index: any) => (
                      <img
                        key={index}
                        alt={
                          image.ProductImageAlt || `Product Image ${index + 1}`
                        }
                        src={API_IMAGE_URL + image.ProductImageUrl}
                        className={classNames(
                          index === 0
                            ? 'lg:col-span-2 lg:row-span-2'
                            : 'lg:block',
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
              <h2 className="text-sm font-medium text-gray-900">Descrizione</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: product.ProductDescription,
                }}
                className="mt-4 space-y-4 text-sm/6 text-gray-500"
              />
              {/* <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Quantità disponibile
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  {product.ProductAmount} Pz.
                </p>
              </div>
 */}
              {/* <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Dimensioni (LxHxP) e peso
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  {product.Width} x {product.Height} x {product.Depth} cm
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  {product.Weight} Kg
                </p>
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </Container>
  )
}
