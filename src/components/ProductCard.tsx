'use client'

import { useState } from 'react'
import { API_IMAGE_URL } from '@/API/API'

interface ProductCardProps {
  product: {
    ProductId: number
    ProductName: string
    ProductModelName: string
    CategoryName: string
    UnitPrice: number
    DiscountPercentage: number
    FirstImage: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative h-full">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200">
        <img
          alt={'Product Image ' + product.ProductName}
          src={product.FirstImage.includes('https://')
            ? product.FirstImage
            : `${API_IMAGE_URL}${product.FirstImage}`}
          className={`h-full w-full object-cover object-center transition-opacity duration-300`}
        />
        
      </div>
      <div className="mt-4 flex flex-col justify-between h-24">
        <h3 className="text-sm text-gray-700">
          <a href={`/products/${product.ProductId}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            <p className="font-semibold line-clamp-2">{product.ProductName}</p>
          </a>
        </h3>
        <div>
   
          <p className="mt-1 text-xs text-gray-500">{product.CategoryName}</p>
        </div>
      </div>
    </div>
  )
}

