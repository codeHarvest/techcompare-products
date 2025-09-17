import { useMemo } from "react"
import { Button } from "./ui/button"

interface CategoryFilterProps {
  products: { category: string }[] 
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

function prettyLabel(s: string) {
  return s
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
}

export function CategoryFilter({ products, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p) => {
      if (p?.category) set.add(String(p.category))
    })
    return [{ id: "all", label: "All Products" as string }, ...Array.from(set).map((c) => ({ id: c, label: prettyLabel(c) }))]
  }, [products])

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
