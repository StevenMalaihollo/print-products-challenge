import { reactive, type Reactive } from 'vue'
import type { Product, ProductOption } from './types'

export class SelectedProduct {
  private product: Product
  public selectedOptions: Reactive<Map<string, ProductOption>>

  constructor(product: Product) {
    this.product = product
    this.selectedOptions = reactive(new Map())
    this.initializeDefaultOptions()
  }

  private initializeDefaultOptions(): void {
    for (const property of this.product.properties) {
      if (property.options.length > 0) {
        this.selectedOptions.set(property.slug, property.options[0])
      }
    }
  }

  getProduct(): Product {
    return this.product
  }

  getQuantity(): number {
    const selection = this.getOption('copies')
    if (selection) {
      return selection.slug as number
    }
    return 0
  }

  getSelectedOptions(): Record<string, ProductOption> {
    return Object.fromEntries(this.selectedOptions)
  }

  selectOption(propertySlug: string, option: ProductOption): void {
    const property = this.product.properties.find((prop) => prop.slug === propertySlug)

    if (!property) {
      throw new Error(`Property with slug "${propertySlug}" does not exist.`)
    }

    const isValidOption = property.options.some((opt) => opt.slug === option.slug)

    if (!isValidOption) {
      throw new Error(
        `Option with slug "${option.slug}" is not valid for property "${propertySlug}".`,
      )
    }

    this.selectedOptions.set(propertySlug, option)
  }

  getOption(propertySlug: string): ProductOption | undefined {
    return this.selectedOptions.get(propertySlug)
  }
}
