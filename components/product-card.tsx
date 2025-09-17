"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Plus } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  onAddToComparison: (product: Product) => void
  isSelected: boolean
  canAddMore: boolean
}

export function ProductCard({ product, onAddToComparison, isSelected, canAddMore }: ProductCardProps) {
  const handleAddToComparison = () => {
    if (!isSelected && canAddMore) {
      onAddToComparison(product)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="p-4">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg leading-tight text-balance">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
            <Badge variant="secondary" className="ml-2 shrink-0">
              ${product.price}
            </Badge>
          </div>

          <div className="space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                <div className="w-1 h-1 bg-primary rounded-full shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToComparison}
          disabled={isSelected || !canAddMore}
          className="w-full"
          variant={isSelected ? "secondary" : "default"}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Compare
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add to Compare
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
