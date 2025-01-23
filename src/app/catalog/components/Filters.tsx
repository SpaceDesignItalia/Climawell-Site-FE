import type React from "react"
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Button } from "@mui/material"

interface FiltersProps {
  filters: any[]
  selectedFilters: Record<string, string[]>
  handleFilterChange: (groupId: string, value: string) => void
  clearFilters: () => void
}

export const Filters: React.FC<FiltersProps> = ({ filters, selectedFilters, handleFilterChange, clearFilters }) => {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium text-gray-900">Filtri</h2>
        <Button
          size="small"
          onClick={clearFilters}
          sx={{
            color: "text.secondary",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
          }}
        >
          Clear all
        </Button>
      </div>

      <div className="divide-y divide-gray-200">
        {filters.map((section) => (
          <Disclosure as="div" key={section.id} defaultOpen={true}>
            {({ open }) => (
              <div className="border-b border-gray-200 py-6 px-4">
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">{section.title}</span>
                    <span className="ml-6 flex items-center">
                      <ChevronDownIcon
                        className={`h-5 w-5 transform transition duration-200 ease-in-out ${
                          open ? "-rotate-180" : "rotate-0"
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map(
                      (option: { value: string; label: string; count: number }, optionIdx: number) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`filter-${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            type="checkbox"
                            checked={selectedFilters[section.id]?.includes(option.value)}
                            onChange={() => handleFilterChange(section.id, option.value)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="ml-3 min-w-0 flex-1 text-sm text-gray-600"
                          >
                            {option.label}
                            <span className="text-gray-400 ml-1">({option.count})</span>
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  )
}

