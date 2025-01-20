'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { API_URL } from '@/API/API'
import { API_IMAGE_URL } from '@/API/API'
import { Container } from '@/components/Container'
import { FullScreenGallery } from '@/components/FullScreenGallery'

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

const responsiveClasses = {
  container: "px-4 sm:px-6 lg:px-8",
  title: "text-2xl sm:text-3xl lg:text-4xl font-bold",
  price: "text-xl sm:text-2xl lg:text-3xl",
  description: "text-sm sm:text-base",
};

export default function ProductPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [initialImageIndex, setInitialImageIndex] = useState(0)

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
              ProductImageUrl: `${API_IMAGE_URL}${img.ProductImageUrl}`,
              ProductImageAlt: img.ProductImageAlt || 'Immagine prodotto',
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

  const openGallery = (index: number) => {
    setInitialImageIndex(index)
    setGalleryOpen(true)
  }

  return (
    <Container className="mt-8 sm:mt-16 md:mt-24">
      <div className="rounded-xl sm:pt-10">
        <main className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Dettagli del prodotto */}
            <div className="order-1 lg:order-2 mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <div>
                <p className="text-sm text-gray-500">{product.CategoryName}</p>
                <h1 className={`${responsiveClasses.title} tracking-tight text-gray-900`}>{product.ProductName}</h1>
              </div>

              <div className="mt-3">
                {/*
              

                <p className={`${responsiveClasses.price} tracking-tight text-gray-900`}>
                  {product.DiscountPercentage ? (
                    <>
                      <span className="text-red-500 line-through">€ {product.UnitPrice}</span>
                      <span className="ml-2 text-green-500">
                        € {(product.UnitPrice * (1 - product.DiscountPercentage / 100)).toFixed(2)}{' '}
                      </span>
                      <span className="ml-2 rounded-full bg-green-500 px-2 py-1 text-sm font-semibold text-white">
                        - {product.DiscountPercentage}%
                      </span>
                    </>
                  ) : (
                    `€ ${product.UnitPrice}`
                  )}
                </p>
                */}

              </div>

              <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-900">Descrizione</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.ProductDescription,
                  }}
                  className={`${responsiveClasses.description} mt-4 space-y-4 text-gray-500`}
                />
              </div>
{/*
              <div className="mt-8 border-t border-gray-200 pt-8">
                 
                <h2 className="text-sm font-medium text-gray-900">Quantità disponibile</h2>
                <p className="mt-4 text-sm text-gray-500">{product.ProductAmount} Pz.</p>
                  
              </div>
*/}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">Dimensioni (LxHxP) e peso</h2>
                <p className="mt-4 text-sm text-gray-500">
                  {product.Width} x {product.Height} x {product.Depth} cm
                </p>
                <p className="mt-4 text-sm text-gray-500">{product.Weight} Kg</p>
              </div>
            </div>

            {/* Immagini del prodotto */}
            <div className="order-2 lg:order-1 lg:col-span-1 mt-10 lg:mt-0">
              <h2 className="sr-only">Immagini</h2>
              {Array.isArray(product.images) && product.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {product.images.map((image: any, index: number) => (
                    <div 
                      key={index}
                      className={classNames(
                        index === 0 ? 'sm:col-span-2' : '',
                        'aspect-w-3 aspect-h-2 overflow-hidden rounded-lg'
                      )}
                    >
                      <img
                        alt={image.ProductImageAlt}
                        src={image.ProductImageUrl || "/placeholder.svg"}
                        className="h-full w-full object-cover object-center cursor-pointer transition-transform duration-300 hover:scale-105"
                        onClick={() => openGallery(index)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Nessuna immagine disponibile
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {galleryOpen && (
        <FullScreenGallery
          images={product.images}
          initialIndex={initialImageIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </Container>
  )
}

