"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "@/API/API"
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Transition } from "@headlessui/react"
import { Button, CircularProgress } from "@mui/material"
import { Filters } from "./components/Filters"
import { ProductGrid } from "./components/ProductGrid"
import { Pagination } from "./components/Pagination"

const ITEMS_PER_PAGE = 20

export default function StorePage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    categories: [],
    brands: [],
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/Products/GET/GetAllProducts`)
        const data = response.data
        if (data) {
          setProducts(data)
          const categories = Array.from(new Set(data.map((p: any) => p.CategoryName))) as string[]
          const brands = Array.from(new Set(data.map((p: any) => p.BrandName))) as string[]

          setFilters([
            {
              id: "categories",
              title: "Categorie",
              options: categories.map((cat: string) => ({
                value: cat,
                label: cat,
                count: data.filter((p: any) => p.CategoryName === cat).length,
              })),
            },
            {
              id: "brands",
              title: "Marche",
              options: brands.map((brand: string) => ({
                value: brand,
                label: brand,
                count: data.filter((p: any) => p.BrandName === brand).length,
              })),
            },
          ])
        }
      } catch (err) {
        setError("Errore durante il caricamento dei dati")
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
    setFilterLoading(true)
    const timer = setTimeout(() => setFilterLoading(false), 500)
    return () => clearTimeout(timer)
  }, [selectedFilters, searchQuery])

  const handleFilterChange = (groupId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[groupId] || []
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((v) => v !== value)
        : [...currentFilters, value]

      return {
        ...prev,
        [groupId]: newFilters,
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      brands: [],
    })
    setSearchQuery("")
  }

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch =
      !searchQuery ||
      (product.ProductName && product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.ProductModelName && product.ProductModelName.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory =
      selectedFilters.categories.length === 0 || selectedFilters.categories.includes(product.CategoryName)
    const matchesBrand = selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.BrandName)

    return matchesSearch && matchesCategory && matchesBrand
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-lg text-gray-500">{error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen ">
      {/* Mobile filter dialog */}
      <Transition show={mobileFiltersOpen} as={React.Fragment}>
        <div className="relative z-40 lg:hidden">
          <Transition.Child
            as={React.Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={React.Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filtri</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Chiudi menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Filters
                  filters={filters}
                  selectedFilters={selectedFilters}
                  handleFilterChange={handleFilterChange}
                  clearFilters={clearFilters}
                />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        </div>

        <div className="flex items-center justify-between py-4">
          <div className="relative flex-grow max-w-xl mx-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-2 border-gray-300 pl-10 pr-3 py-2 focus:border-gray-500 focus:ring-gray-500 sm:text-sm shadow-sm"
              placeholder="Cerca prodotti"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center lg:hidden ml-4"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="text-sm font-medium text-gray-700">Filtri</span>
            <Bars3Icon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
          </button>
        </div>

        <section className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            {/* Filters */}
            <div className="hidden sm:block">
              <Filters
                filters={filters}
                selectedFilters={selectedFilters}
                handleFilterChange={handleFilterChange}
                clearFilters={clearFilters}
              />
            </div>

            {/* Product grid */}
            <div className="lg:col-span-4">
              {filterLoading ? (
                <div className="flex justify-center items-center h-96">
                  <CircularProgress />
                </div>
              ) : (
                <ProductGrid products={paginatedProducts} />
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredProducts.length}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

