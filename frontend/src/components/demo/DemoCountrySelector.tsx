import {countries} from 'countries-list'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import React, { useEffect, useState } from 'react'
import { SelectLabel } from '@radix-ui/react-select'

interface DemoCountrySelectorProps {
    setCountry: (country: string) => void
}

export const DemoCountrySelector = ({setCountry} : DemoCountrySelectorProps) => {
    const [items, setItems] = useState<React.JSX.Element[]>([])

    useEffect(() => {
        setItems(Object.values(countries).sort((a, b) => a.name.localeCompare(b.name)).map((country) => 
                (<SelectItem value={country.name} key={country.name}>{country.name}</SelectItem>)
                ))
    }, [])

    return (
    <Select onValueChange={(v) => setCountry(v)}>
        <SelectTrigger className="w-[180px] bg-[hsl(var(--popover))]">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="main-div-auth-child">
            <SelectLabel>Country</SelectLabel>
            {items}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
}
