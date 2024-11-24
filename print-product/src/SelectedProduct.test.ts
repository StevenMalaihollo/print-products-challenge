import { describe, it, expect } from 'vitest'
import { SelectedProduct } from './SelectedProduct'

import businesscardRaw from './data/businesscards.json'
import type { Product, ProductProperty } from './types'
import { SelectedProductProperty } from './SelectedProductProperty'

describe('SelectedProductProperty ', () => {
  it('Select a product with its default product properties', () => {
    const product = businesscardRaw as Product
    const businessCard = new SelectedProduct(product)

    expect(businessCard.getOption('copies')).toEqual({ name: '25', slug: 25, type: 'digital' })
    expect(businessCard.getOption('clean_cut')).toEqual({ name: 'Yes', slug: 'yes' })
  })

  it('Product property - options all available', () => {
    const product = businesscardRaw as Product
    const businesscard = new SelectedProduct(product)
    const printingType = product.properties.find((p) => p.slug === 'printtype')

    expect(printingType).toBeDefined()
    const selectedPrintingType = new SelectedProductProperty(
      businesscard,
      printingType as ProductProperty,
    )

    const options = selectedPrintingType.getSelectOptions()
    expect(options).toHaveLength(10)
    expect(options.filter((o) => o.disabled === false)).toHaveLength(10)
  })

  it('Product property - exclusion rules disable options', () => {
    const product = businesscardRaw as Product
    const businessCard = new SelectedProduct(product)

    businessCard.selectOption('material', {
      slug: '290gr_sirio_color_nero',
      name: '290 g/m² Sirio Colour Nero',
    })

    // If the first element of the exclusion rule is met;
    // the second element is not allowed to select the option
    const printingType = product.properties.find((p) => p.slug === 'printtype')

    expect(printingType).toBeDefined()
    const selectedPrintingType = new SelectedProductProperty(
      businessCard,
      printingType as ProductProperty,
    )

    const options = selectedPrintingType.getSelectOptions()
    expect(options).toHaveLength(10)
    expect(options.find((o) => o.value === '33').disabled).toBe(false)
    expect(options.find((o) => o.value === '40').disabled).toBe(true)
    expect(options.find((o) => o.value === '44').disabled).toBe(true)
    expect(options.find((o) => o.value === '55_full_color_plus_white').disabled).toBe(false)
  })
})
