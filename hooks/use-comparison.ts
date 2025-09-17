"use client"

import { useState, useCallback } from "react"
import type { Product } from "@/lib/types"
import { useLocalStorage } from "./use-local-storage"

export function useComparison() {
  const [selectedProducts, setSelectedProducts] = useLocalStorage<Product[]>("comparison-products", [])
  const [isComparing, setIsComparing] = useState(false)

  const addToComparison = useCallback(
    (product: Product) => {
      setSelectedProducts((prev) => {
        if (prev.length >= 3) return prev
        if (prev.some((p) => p.id === product.id)) return prev
        return [...prev, product]
      })
    },
    [setSelectedProducts],
  )

  const removeFromComparison = useCallback(
    (productId: number) => {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))
    },
    [setSelectedProducts],
  )

  const clearComparison = useCallback(() => {
    setSelectedProducts([])
    setIsComparing(false)
  }, [setSelectedProducts])

  const toggleCompareView = useCallback(() => {
    setIsComparing((prev) => !prev)
  }, [])

  const isProductSelected = useCallback(
    (productId: number) => {
      return selectedProducts.some((p) => p.id === productId)
    },
    [selectedProducts],
  )

  return {
    selectedProducts,
    isComparing,
    addToComparison,
    removeFromComparison,
    clearComparison,
    toggleCompareView,
    isProductSelected,
    canAddMore: selectedProducts.length < 3,
    hasMinimumForComparison: selectedProducts.length >= 2,
  }
}
