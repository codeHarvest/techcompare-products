"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, X, Trash2 } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/lib/types"

interface ComparisonPanelProps {
  products: Product[]
  onClose: () => void
  onRemoveProduct: (productId: number) => void
  onClearAll: () => void
}

export function ComparisonPanel({ products, onClose, onClearAll }: ComparisonPanelProps) {
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
            {/* Added a button to remove product */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onClearAll(product.id)}
              className="absolute top-2 right-2 z-10 h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </Button>

            <CardHeader className="pb-4">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-muted mb-4">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
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
      <Card>
        <CardHeader>
          <CardTitle>Detailed Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Specification</th>
                  {products.map((product) => (
                    <th key={product.id} className="text-left py-3 px-4 font-medium min-w-48">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-muted/50">
                  <td className="py-3 px-4 font-medium">Price</td>
                  {products.map((product) => (
                    <td key={product.id} className="py-3 px-4">
                      <Badge variant="secondary">${product.price}</Badge>
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Brand</td>
                  {products.map((product) => (
                    <td key={product.id} className="py-3 px-4">
                      {product.brand}
                    </td>
                  ))}
                </tr>
                {allSpecKeys.map((specKey) => (
                  <tr key={specKey} className="border-b">
                    <td className="py-3 px-4 font-medium capitalize">{specKey.replace(/_/g, " ")}</td>
                    {products.map((product) => (
                      <td key={product.id} className="py-3 px-4">
                        {product.specs[specKey] ? (
                          Array.isArray(product.specs[specKey]) ? (
                            <div className="space-y-1">
                              {(product.specs[specKey] as string[]).map((item, index) => (
                                <Badge key={index} variant="outline" className="mr-1 mb-1">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          ) : (
                            <span>{product.specs[specKey] as string}</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
