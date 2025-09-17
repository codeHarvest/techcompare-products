import { useState } from "react"
import type { Product } from "../lib/types"
import { useLocalStorage } from "./use-local-storage"

const MAX_COMPARISON_ITEMS = 3

export function useComparison() {
  const [selectedProducts, setSelectedProducts] = useLocalStorage<Product[]>("comparison-products", [])
  const [isComparing, setIsComparing] = useState(false)

  const addToComparison = (product: Product) => {
    if (selectedProducts.length < MAX_COMPARISON_ITEMS && !isProductSelected(product.id)) {
      setSelectedProducts((prev) => [...prev, product])
    }
  }

  const removeFromComparison = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearComparison = () => {
    setSelectedProducts([])
    setIsComparing(false)
  }

  const toggleCompareView = () => {
    setIsComparing((prev) => !prev)
  }

  const isProductSelected = (productId: number) => {
    return selectedProducts.some((p) => p.id === productId)
  }

  const canAddMore = selectedProducts.length < MAX_COMPARISON_ITEMS
  const hasMinimumForComparison = selectedProducts.length >= 2

  return {
    selectedProducts,
    isComparing,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleCompareView,
    isProductSelected,
    canAddMore,
    hasMinimumForComparison,
  }
}
