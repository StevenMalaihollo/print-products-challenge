import type { SelectedProduct } from './SelectedProduct'
import type { ProductOption, ProductProperty } from './types'
import type { GenericOption } from 'vue3-select-component/dist/Select.d.ts'

export class SelectedProductProperty {
  private selectedProduct: SelectedProduct
  private property: ProductProperty

  constructor(product: SelectedProduct, property: ProductProperty) {
    this.selectedProduct = product
    this.property = property
  }

  getSelectOptions(): GenericOption[] {
    const opts: ProductOption[] = this.property.options

    const disabledOptions = this.disabledOptions()

    return opts.map((option) => ({
      label: option.name ?? option.title,
      value: option.slug,
      disabled: disabledOptions.includes(option.slug),
    }))
  }

  disabledOptions() {
    const selectedOptions = this.selectedProduct.getSelectedOptions()
    const allRules = this.selectedProduct.getProduct().excludes

    const disabledOptions: ProductOption['slug'][] = []

    allRules.forEach(([propCondition, propApplied]) => {
      if (propApplied.property !== this.property.slug) return

      const selected = selectedOptions[propCondition.property]
      if (selected && propCondition.options.includes(selected.slug)) {
        // Passes the rule - apply second rules options to be disabled
        disabledOptions.push(...propApplied.options)
      }
      return
    })
    return disabledOptions
  }
}
