// URL base de la API para el módulo de productos
const BASE_URL = 'https://dummyjson.com/products'
const LOW_STOCK_THRESHOLD = 15

function matchesStockStatus(product, stockStatus) {
  const stock = Number(product.stock) || 0

  if (stockStatus === 'in-stock') {
    return stock > LOW_STOCK_THRESHOLD
  }

  if (stockStatus === 'low-stock') {
    return stock > 0 && stock <= LOW_STOCK_THRESHOLD
  }

  if (stockStatus === 'out-of-stock') {
    return stock <= 0
  }

  return true
}

async function fetchProductsCollection(url) {
  return fetch(url).then((res) =>
    handleResponse(res, 'No se pudieron cargar los productos del catálogo.'),
  )
}

// Procesa las respuestas HTTP y formatea los errores en español para la UI
async function handleResponse(response, defaultErrorMessage) {
  if (!response.ok) {
    let errorMessage = defaultErrorMessage
    try {
      const errorData = await response.json()
      if (errorData && errorData.message) {
        errorMessage = `Error: ${errorData.message}`
      }
    } catch {
      errorMessage = `${defaultErrorMessage} (Código: ${response.status})`
    }
    throw new Error(errorMessage)
  }
  return await response.json()
}

// Obtiene el catálogo con soporte para paginación, búsqueda y filtros
export async function fetchProducts({
  page = 1,
  limit = 10,
  search = '',
  category = '',
  stockStatus = '',
} = {}) {
  try {
    const validPage = Math.max(1, Number(page) || 1)
    const validLimit = Math.max(1, Number(limit) || 10)
    const skip = (validPage - 1) * validLimit

    const cleanSearch = search.trim()
    const cleanCategory = category.trim()
    const cleanStockStatus = stockStatus.trim()
    const isFilteringCategory = cleanCategory && cleanCategory !== 'all' && cleanCategory !== 'todas'
    const needsLocalCategoryFilter = cleanSearch && isFilteringCategory
    const needsLocalStockFilter = Boolean(cleanStockStatus)
    const needsLocalFiltering = needsLocalCategoryFilter || needsLocalStockFilter

    let endpoint = BASE_URL

    if (cleanSearch) {
      endpoint = `${BASE_URL}/search?q=${encodeURIComponent(cleanSearch)}`
    } else if (isFilteringCategory) {
      endpoint = `${BASE_URL}/category/${encodeURIComponent(cleanCategory)}`
    }

    if (needsLocalFiltering) {
      const separator = endpoint.includes('?') ? '&' : '?'
      const initialData = await fetchProductsCollection(`${endpoint}${separator}limit=1&skip=0`)
      const totalResults = Math.max(0, Number(initialData.total) || 0)

      if (totalResults === 0) {
        return {
          ...initialData,
          products: [],
          total: 0,
        }
      }

      const allData = await fetchProductsCollection(`${endpoint}${separator}limit=${totalResults}&skip=0`)
      const filteredProducts = allData.products
        .filter((product) => {
          if (needsLocalCategoryFilter) {
            return product.category.toLowerCase() === cleanCategory.toLowerCase()
          }

          return true
        })
        .filter((product) => matchesStockStatus(product, cleanStockStatus))

      return {
        ...allData,
        products: filteredProducts.slice(skip, skip + validLimit),
        total: filteredProducts.length,
      }
    }

    const separator = endpoint.includes('?') ? '&' : '?'
    const data = await fetchProductsCollection(`${endpoint}${separator}limit=${validLimit}&skip=${skip}`)

    return data
  } catch (error) {
    console.error('Error en fetchProducts:', error)
    throw new Error(error.message || 'Error de conexión al obtener el catálogo de productos.', {
      cause: error,
    })
  }
}

// Obtiene la lista de categorías disponibles para llenar el selector del filtro
export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`)
    const data = await handleResponse(response, 'No se pudieron cargar las categorías del sistema.')

    // Estandariza el formato para que el componente <select> siempre reciba el mismo tipo de objeto
    return data.map((cat) => {
      if (typeof cat === 'string') {
        return { slug: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }
      }
      return { slug: cat.slug || cat.name, name: cat.name || cat.slug }
    })
  } catch (error) {
    console.error('Error en fetchCategories:', error)
    throw new Error('No se pudo cargar la lista de categorías para el filtro.', {
      cause: error,
    })
  }
}

// Envía la petición POST para simular el registro de un nuevo producto en la API
export async function createProduct(productData) {
  // Validaciones front-end obligatorias antes de llamar a la red
  if (!productData || typeof productData !== 'object') {
    throw new Error('Los datos del producto son inválidos.')
  }
  if (!productData.title || !productData.title.trim()) {
    throw new Error('El nombre o título del producto es obligatorio.')
  }
  if (productData.price === undefined || productData.price === '' || isNaN(productData.price) || Number(productData.price) < 0) {
    throw new Error('El precio debe ser un número válido mayor o igual a $0.')
  }
  if (!productData.category || !productData.category.trim()) {
    throw new Error('Debes seleccionar o escribir una categoría para el producto.')
  }

  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: productData.title.trim(),
        price: Number(productData.price),
        category: productData.category.trim(),
        stock: Number(productData.stock) || 0,
        brand: productData.brand ? productData.brand.trim() : 'Aura Hogar',
        description: productData.description
          ? productData.description.trim()
          : 'Producto registrado en catálogo Aura Hogar',
      }),
    })

    const createdProduct = await handleResponse(response, 'No se pudo registrar el nuevo producto en el servidor.')
    return createdProduct
  } catch (error) {
    console.error('Error en createProduct:', error)
    throw new Error(error.message || 'Ocurrió un error al intentar guardar el producto.', {
      cause: error,
    })
  }
}

// Envía la petición PUT para simular la actualización de un producto existente
export async function updateProduct(productId, productData) {
  if (!productId) {
    throw new Error('No se identificó el ID del producto que deseas editar.')
  }
  if (!productData || Object.keys(productData).length === 0) {
    throw new Error('No se enviaron datos nuevos para actualizar el producto.')
  }

  if (productData.price !== undefined && (isNaN(productData.price) || Number(productData.price) < 0)) {
    throw new Error('El precio modificado debe ser un número válido.')
  }

  try {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })

    const updatedProduct = await handleResponse(
      response,
      `No se pudieron guardar los cambios en el producto #${productId}.`,
    )
    return updatedProduct
  } catch (error) {
    console.error('Error en updateProduct:', error)
    throw new Error(error.message || 'Ocurrió un error al intentar modificar el producto.', {
      cause: error,
    })
  }
}

// Envía la petición DELETE para simular la eliminación de un registro
export async function deleteProduct(productId) {
  if (!productId) {
    throw new Error('ID faltante: No se especificó qué registro eliminar.')
  }

  try {
    const response = await fetch(`${BASE_URL}/${productId}`, {
      method: 'DELETE',
    })

    const deletedData = await handleResponse(
      response,
      `No se pudo eliminar el registro del producto #${productId}.`,
    )
    return deletedData
  } catch (error) {
    console.error('Error en deleteProduct:', error)
    throw new Error(error.message || 'Ocurrió un error al intentar eliminar el registro.', {
      cause: error,
    })
  }
}
