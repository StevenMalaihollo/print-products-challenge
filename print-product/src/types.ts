export interface Product {
  sku: string
  title: string
  properties: ProductProperty[]
  excludes: ExlusionRule[]
}

export interface ProductProperty {
  slug: string
  title: string
  options: ProductOption[]
}

export interface ProductOption {
  slug: number | string
  title?: string
  name?: string
  width?: number | string
  height?: number | string
  type?: string
  description?: string
  customSizes?: {
    minHeight: number
    minWidth: number
    maxHeight: number
    maxWidth: number
  }
  nullable?: boolean
  eco?: boolean
}

export type ExlusionRule = [
  {
    property: string
    options: Array<ProductOption['slug']>
  },
  {
    property: string
    options: Array<ProductOption['slug']>
  },
]
