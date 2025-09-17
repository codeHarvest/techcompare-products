import type { Product } from "../lib/types"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { X, Eye, Trash2 } from "lucide-react"

interface ComparisonBarProps {
  selectedProducts: Product[]
  onCompare: () => void
  onRemoveProduct: (productId: number) => void
  onClearAll: () => void
  hasMinimumForComparison: boolean
}

export function ComparisonBar({
  selectedProducts,
  onCompare,
  onRemoveProduct,
  onClearAll,
  hasMinimumForComparison,
}: ComparisonBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Compare Products:</span>
              <Badge variant="secondary">{selectedProducts.length}/3</Badge>
            </div>

            <div className="flex items-center gap-2 max-w-md overflow-x-auto">
              {selectedProducts.map((product) => (
                <Card key={product.id} className="flex items-center gap-2 px-3 py-2 min-w-fit">
                  <span className="text-sm font-medium truncate max-w-32">{product.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveProduct(product.id)}
                    className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClearAll} size="sm">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button onClick={onCompare} disabled={!hasMinimumForComparison} size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Compare ({selectedProducts.length})
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
