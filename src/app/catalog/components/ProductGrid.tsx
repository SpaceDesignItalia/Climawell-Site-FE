import React from 'react'
import { API_IMAGE_URL } from "@/API/API"

interface ProductGridProps {
  products: any[]
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5 lg:gap-x-4 xl:grid-cols-4">
      {products.map((product: any) => (
        <div
          key={product.ProductId}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96">
            <img
              src={
                product.FirstImage.includes("https://")
                  ? product.FirstImage
                  : `${API_IMAGE_URL}${product.FirstImage}`
              }
              alt={product.ProductName}
              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <h3 className="text-sm font-medium text-gray-900">
              {/* Aggiungi un link corretto all'interno dell'elemento <a> */}
              <a href={`/products/${product.ProductId}`} className="absolute inset-0" />
              {product.ProductName}
            </h3>
            <p className="text-sm text-gray-500">{product.CategoryName}</p>
            <div className="flex-1" />
            <p className="text-sm italic text-gray-500">{product.BrandName}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
