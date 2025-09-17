import type { Product } from "../lib/types"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowLeft, X, Trash2 } from "lucide-react"

interface ComparisonPanelProps {
  products: Product[]
  onClose: () => void
  onRemoveProduct: (productId: number) => void
  onClearAll: () => void
}

export function ComparisonPanel({ products, onClose, onRemoveProduct, onClearAll }: ComparisonPanelProps) {
  const allSpecKeys = Array.from(new Set(products.flatMap((product) => Object.keys(product.specs))))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Product Comparison</h2>
            <p className="text-muted-foreground">Compare {products.length} selected products</p>
          </div>
        </div>
        <Button variant="outline" onClick={onClearAll}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear All
        </Button>
      </div>

      {/* Product Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <Card key={product.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveProduct(product.id)}
              className="absolute top-2 right-2 z-10 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </Button>

            <CardHeader className="pb-4">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted mb-4">
                <img
                  src={product.image || "/placeholder.svg?height=200&width=200"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-balance">{product.name}</CardTitle>
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">{product.brand}</p>
                <Badge variant="secondary">${product.price}</Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Key Features:</h4>
                {product.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Detailed Specifications</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                <th className="border border-border p-3 text-left font-medium">Specification</th>
                {products.map((product) => (
                  <th key={product.id} className="border border-border p-3 text-left font-medium min-w-48">
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecKeys.map((specKey) => (
                <tr key={specKey} className="hover:bg-muted/50">
                  <td className="border border-border p-3 font-medium capitalize">
                    {specKey.replace(/([A-Z])/g, " $1").trim()}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="border border-border p-3">
                      {product.specs[specKey] || "N/A"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
