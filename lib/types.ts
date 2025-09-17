export interface Product {
  id: number
  name: string
  brand: string
  price: number
  image: string
  category: "smartphones" | "laptops" | "headphones"
  features: string[]
  specs: Record<string, string | string[]>
}

export interface ComparisonState {
  selectedProducts: Product[]
  isComparing: boolean
}
