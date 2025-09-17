import { ProductCard } from "./product-card"
import type { Product } from "../lib/types"

interface ProductGridProps {
  products: Product[]
  onAddToComparison: (product: Product) => void
  isProductSelected: (productId: number) => boolean
  canAddMore: boolean
}

export function ProductGrid({ products, onAddToComparison, isProductSelected, canAddMore }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToComparison={onAddToComparison}
          isSelected={isProductSelected(product.id)}
          canAddMore={canAddMore}
        />
      ))}
    </div>
  )
}
