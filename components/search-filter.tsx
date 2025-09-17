"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SearchFilter({ searchQuery, onSearchChange }: SearchFilterProps) {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
