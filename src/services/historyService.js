const BASE_URL = 'https://dummyjson.com/products'

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'USD',
})

let allProductsPromise = null

const SALE_STATUS_MAP = {
  sent: { label: 'Enviado', value: 'sent', className: 'status-success' },
  pending: { label: 'Pendiente', value: 'pending', className: 'status-muted' },
  processing: { label: 'Preparando', value: 'processing', className: 'status-empty' },
}

async function handleResponse(response, defaultErrorMessage) {
  if (!response.ok) {
    throw new Error(`${defaultErrorMessage} (Codigo: ${response.status})`)
  }

  return response.json()
}

function formatCategoryName(category) {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function buildSaleDate(productId) {
  const saleDate = new Date()
  saleDate.setHours(0, 0, 0, 0)
  saleDate.setDate(saleDate.getDate() - ((productId * 11) % 180))
  return saleDate
}

function getSaleStatus(stock) {
  if (stock > 50) {
    return SALE_STATUS_MAP.sent
  }

  if (stock > 15) {
    return SALE_STATUS_MAP.pending
  }

  return SALE_STATUS_MAP.processing
}

function getSaleStatusByValue(statusValue = 'sent') {
  return SALE_STATUS_MAP[statusValue] || SALE_STATUS_MAP.sent
}

function mapProductToSale(product) {
  const units = Math.max(1, Math.min(5, product.minimumOrderQuantity || (product.id % 5) + 1))
  const status = getSaleStatus(product.stock)
  const saleDate = buildSaleDate(product.id)
  const brand = product.brand || 'Aura Hogar'
  const total = product.price * units

  return {
    id: `VTA-${String(product.id).padStart(3, '0')}`,
    product: product.title,
    brand,
    detail: `${brand} · ${saleDate.toLocaleDateString('es-MX')}`,
    category: formatCategoryName(product.category),
    categorySlug: product.category,
    units,
    unitsLabel: `${units} u.`,
    total,
    totalLabel: currencyFormatter.format(total),
    status: status.label,
    statusValue: status.value,
    statusClass: status.className,
    saleDate,
    source: 'remote',
  }
}

export function createSaleRecord({ product, brand, category, units, total, status }) {
  const saleDate = new Date()
  saleDate.setHours(0, 0, 0, 0)

  const normalizedUnits = Math.max(1, Number(units) || 1)
  const normalizedTotal = Math.max(0, Number(total) || 0)
  const normalizedStatus = getSaleStatusByValue(status)
  const uniqueCode = `${Date.now()}`.slice(-6)

  return {
    id: `VTA-${uniqueCode}`,
    product: product.trim(),
    brand: brand.trim(),
    detail: `${brand.trim()} · ${saleDate.toLocaleDateString('es-MX')}`,
    category: formatCategoryName(category),
    categorySlug: category.trim().toLowerCase(),
    units: normalizedUnits,
    unitsLabel: `${normalizedUnits} u.`,
    total: normalizedTotal,
    totalLabel: currencyFormatter.format(normalizedTotal),
    status: normalizedStatus.label,
    statusValue: normalizedStatus.value,
    statusClass: normalizedStatus.className,
    saleDate,
    source: 'custom',
  }
}

export function updateSaleRecord(currentSale, saleData) {
  const normalizedStatus = getSaleStatusByValue(saleData.status)
  const normalizedUnits = Math.max(1, Number(saleData.units) || 1)
  const normalizedTotal = Math.max(0, Number(saleData.total) || 0)
  const brand = saleData.brand.trim()

  return {
    ...currentSale,
    product: saleData.product.trim(),
    brand,
    detail: `${brand} · ${currentSale.saleDate.toLocaleDateString('es-MX')}`,
    category: formatCategoryName(saleData.category),
    categorySlug: saleData.category.trim().toLowerCase(),
    units: normalizedUnits,
    unitsLabel: `${normalizedUnits} u.`,
    total: normalizedTotal,
    totalLabel: currencyFormatter.format(normalizedTotal),
    status: normalizedStatus.label,
    statusValue: normalizedStatus.value,
    statusClass: normalizedStatus.className,
  }
}

async function fetchAllProducts() {
  if (!allProductsPromise) {
    allProductsPromise = (async () => {
      const firstResponse = await fetch(`${BASE_URL}?limit=1`)
      const firstPage = await handleResponse(
        firstResponse,
        'No se pudo consultar el total del historial.',
      )

      const total = Math.max(1, Number(firstPage.total) || 1)
      const response = await fetch(`${BASE_URL}?limit=${total}`)
      const data = await handleResponse(response, 'No se pudo cargar el historial de ventas.')

      return data.products || []
    })().catch((error) => {
      allProductsPromise = null
      throw error
    })
  }

  return allProductsPromise
}

export async function fetchSalesHistory({
  page = 1,
  limit = 10,
  search = '',
  category = '',
  status = '',
  customSales = [],
  editedSales = {},
  deletedSaleIds = [],
} = {}) {
  try {
    const products = await fetchAllProducts()
    const normalizedSearch = search.trim().toLowerCase()
    const normalizedCategory = category.trim().toLowerCase()
    const normalizedStatus = status.trim().toLowerCase()
    const validPage = Math.max(1, Number(page) || 1)
    const validLimit = Math.max(1, Number(limit) || 10)

    const filteredSales = [...customSales, ...products.map(mapProductToSale)]
      .filter((sale) => !deletedSaleIds.includes(sale.id))
      .map((sale) => editedSales[sale.id] || sale)
      .sort((leftSale, rightSale) => {
        const dateDifference = rightSale.saleDate.getTime() - leftSale.saleDate.getTime()

        if (dateDifference !== 0) {
          return dateDifference
        }

        return rightSale.id.localeCompare(leftSale.id)
      })
      .filter((sale) => {
        const matchesSearch =
          !normalizedSearch ||
          sale.id.toLowerCase().includes(normalizedSearch) ||
          sale.product.toLowerCase().includes(normalizedSearch) ||
          sale.detail.toLowerCase().includes(normalizedSearch)

        const matchesCategory =
          !normalizedCategory || sale.categorySlug.toLowerCase() === normalizedCategory

        const matchesStatus = !normalizedStatus || sale.statusValue === normalizedStatus

        return matchesSearch && matchesCategory && matchesStatus
      })

    const total = filteredSales.length
    const startIndex = (validPage - 1) * validLimit

    return {
      sales: filteredSales.slice(startIndex, startIndex + validLimit),
      total,
    }
  } catch (error) {
    throw new Error(error.message || 'No se pudo cargar el historial de ventas.', {
      cause: error,
    })
  }
}
