import type React from "react"
import { Disclosure } from "@headlessui/react"
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
    <div>
      <form className="space-y-6">
        {filters.map((section) => (
          <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
            {({ open }) => (
              <fieldset>
                <legend className="w-full px-2">
                  <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                    <span className="text-sm font-medium text-gray-900">{section.title}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDownIcon
                        className={`${open ? "-rotate-180" : "rotate-0"} h-5 w-5 transform`}
                        aria-hidden="true"
                      />
                    </span>
                  </Disclosure.Button>
                </legend>
                <Disclosure.Panel className="px-4 pt-4 pb-2">
                  <div className="space-y-6">
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
                            className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                          />
                          <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                            {option.label} ({option.count})
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </Disclosure.Panel>
              </fieldset>
            )}
          </Disclosure>
        ))}
      </form>
      
    </div>
  )
}

