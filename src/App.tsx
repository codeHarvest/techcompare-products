import { useState, useMemo } from "react"
import { ProductGrid } from "./components/product-grid"
import { ComparisonPanel } from "./components/comparison-panel"
import { ComparisonBar } from "./components/comparison-bar"
import { CategoryFilter } from "./components/category-filter"
import { SearchFilter } from "./components/search-filter"
import { useComparison } from "./hooks/use-comparison"
import type { Product } from "./lib/types"
import productsData from "../public/products.json"
import "./index.css"
import ThemeToggle  from "./components/ThemeToggle"

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    selectedProducts,
    isComparing,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleCompareView,
    isProductSelected,
    canAddMore,
    hasMinimumForComparison,
  } = useComparison()
  const products = productsData.products as Product[]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, selectedCategory, searchQuery])

  if (isComparing) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ComparisonPanel
            products={selectedProducts}
            onClose={toggleCompareView}
            onRemoveProduct={removeFromComparison}
            onClearAll={clearComparison}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">TechCompare</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare the latest smartphones, laptops, and headphones to find your perfect tech match
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CategoryFilter products={products} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
            <SearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={filteredProducts}
            onAddToComparison={addToComparison}
            isProductSelected={isProductSelected}
            canAddMore={canAddMore}
          />
        </div>
      </div>

      {/* Comparison Bar */}
      {selectedProducts.length > 0 && (
        <ComparisonBar
          selectedProducts={selectedProducts}
          onCompare={toggleCompareView}
          onRemoveProduct={removeFromComparison}
          onClearAll={clearComparison}
          hasMinimumForComparison={hasMinimumForComparison}
        />
      )}
    </div>
  )
}

export default App
