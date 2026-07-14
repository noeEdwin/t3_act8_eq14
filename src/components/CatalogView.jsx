import { useCallback, useEffect, useState } from 'react'
import { fetchCategories, fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/productsService.js'
import { showConfirmDialog, showProductFormModal, showSuccessAlert, showErrorAlert } from '../services/alertService.js'
import DataTable from './DataTable.jsx'
import Pagination from './Pagination.jsx'

const VALID_LIMITS = [10, 20, 40, 50]
const CATALOG_QUERY_KEYS = ['page', 'limit', 'search', 'category']

function readQueryParams() {
  const params = new URLSearchParams(window.location.search)
  const limit = Number(params.get('limit'))

  return {
    page: Math.max(1, Number(params.get('page')) || 1),
    limit: VALID_LIMITS.includes(limit) ? limit : 10,
    search: params.get('search') || '',
    category: params.get('category') || '',
  }
}

function CatalogView() {
  const [queryParams, setQueryParams] = useState(readQueryParams)
  const [searchInput, setSearchInput] = useState(queryParams.search)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const updateQueryParams = useCallback((nextParams) => {
    const params = new URLSearchParams(window.location.search)

    const normalizedParams = {
      page: Math.max(1, Number(nextParams.page) || 1),
      limit: VALID_LIMITS.includes(Number(nextParams.limit)) ? Number(nextParams.limit) : 10,
      search: (nextParams.search || '').trim(),
      category: (nextParams.category || '').trim(),
    }

    CATALOG_QUERY_KEYS.forEach((key) => params.delete(key))

    if (normalizedParams.page > 1) params.set('page', normalizedParams.page)
    if (normalizedParams.limit !== 10) params.set('limit', normalizedParams.limit)
    if (normalizedParams.search) params.set('search', normalizedParams.search)
    if (normalizedParams.category) params.set('category', normalizedParams.category)

    const queryString = params.toString()
    window.history.pushState(
      {},
      '',
      queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname,
    )
    setQueryParams(normalizedParams)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const nextParams = readQueryParams()
      setQueryParams(nextParams)
      setSearchInput(nextParams.search)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    let isActive = true

    const loadCategories = async () => {
      try {
        const data = await fetchCategories()
        if (isActive) setCategories(data)
      } catch {
        if (isActive) setCategories([])
      }
    }

    loadCategories()
    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true

    const loadProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await fetchProducts(queryParams)
        if (!isActive) return
        setProducts(data.products || [])
        setTotal(data.total || 0)
      } catch (requestError) {
        if (!isActive) return
        setProducts([])
        setTotal(0)
        setError(requestError.message || 'No se pudieron cargar los productos.')
      } finally {
        if (isActive) setLoading(false)
      }
    }

    loadProducts()
    return () => {
      isActive = false
    }
  }, [queryParams])

  useEffect(() => {
    const normalizedSearch = searchInput.trim()

    if (normalizedSearch === queryParams.search) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      updateQueryParams({ ...queryParams, search: searchInput, page: 1 })
    }, 300)

    return () => window.clearTimeout(timeoutId)
  }, [searchInput, queryParams, updateQueryParams])

  const handleCategoryChange = (event) => {
    updateQueryParams({ ...queryParams, category: event.target.value, page: 1 })
  }

  const handleResetFilters = () => {
    setSearchInput('')
    updateQueryParams({ page: 1, limit: 10, search: '', category: '' })
  }

  // ==========================================
  // LÓGICA CRUD CON SWEETALERT2 (FASE 4)
  // ==========================================

  const handleCreateClick = async () => {
    const productData = await showProductFormModal()
    if (!productData) return

    try {
      const newProduct = await createProduct(productData)
      setProducts((prevProducts) => [newProduct, ...prevProducts])
      setTotal((prevTotal) => prevTotal + 1)
      showSuccessAlert('¡Producto registrado!', `El producto "${newProduct.title}" fue agregado al catálogo exitosamente.`)
    } catch (err) {
      showErrorAlert('No se pudo crear el producto', err.message)
    }
  }

  const handleEditClick = async (product) => {
    const updatedData = await showProductFormModal(product)
    if (!updatedData) return

    const confirmed = await showConfirmDialog({
      title: '¿Confirmas la edición?',
      text: `Se modificarán los datos del registro #${product.id} en el sistema.`,
      confirmButtonText: 'Sí, guardar cambios'
    })
    if (!confirmed) return

    try {
      const resultFromApi = await updateProduct(product.id, updatedData)
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? { ...p, ...resultFromApi } : p))
      )
      showSuccessAlert('¡Cambios guardados!', `El producto #${product.id} fue actualizado correctamente.`)
    } catch (err) {
      showErrorAlert('No se pudo editar el producto', err.message)
    }
  }

  const handleDeleteClick = async (product) => {
    const confirmed = await showConfirmDialog({
      title: '¿Eliminar este producto?',
      text: `El registro "${product.title}" será eliminado permanentemente del catálogo.`,
      confirmButtonText: 'Sí, eliminar'
    })
    if (!confirmed) return

    try {
      await deleteProduct(product.id)
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id))
      setTotal((prevTotal) => Math.max(0, prevTotal - 1))
      showSuccessAlert('¡Producto eliminado!', 'El registro fue borrado del catálogo.')
    } catch (err) {
      showErrorAlert('No se pudo eliminar el producto', err.message)
    }
  }

  return (
    <main className="catalog-view">
      <div className="dashboard-header">
        <div>
          <p className="section-kicker">AURAHOGAR</p>
          <h2 className="dashboard-title">Catálogo</h2>
        </div>
        <button
          type="button"
          onClick={handleCreateClick}
          className="dashboard-cta cursor-pointer"
        >
          <span className="material-symbols-outlined">add</span>
          <span>Registrar nuevo producto</span>
        </button>
      </div>

      <section className="dashboard-banner">
        <img
          src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80"
          alt="Interior decor banner"
        />
        <div className="dashboard-banner-overlay"></div>
        <div className="dashboard-banner-copy">
          <p>Elevando el diseño de interiores con una curaduría orgánica y precisa.</p>
        </div>
      </section>

      <section className="filters-panel">
        <div className="catalog-search">
          <label htmlFor="product-search">Buscar producto</label>
          <div className="catalog-search-controls">
            <input
              id="product-search"
              type="search"
              placeholder="Buscar por título..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="product-category">Categoría</label>
          <select
            id="product-category"
            value={queryParams.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="button" className="filters-reset cursor-pointer" onClick={handleResetFilters}>
          <span className="material-symbols-outlined">filter_list</span>
          Reiniciar filtros
        </button>
      </section>

      <DataTable
        products={products}
        loading={loading}
        error={error}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {!loading && !error ? (
        <Pagination
          currentPage={queryParams.page}
          total={total}
          limit={queryParams.limit}
          onPageChange={(page) => updateQueryParams({ ...queryParams, page })}
          onLimitChange={(limit) =>
            updateQueryParams({ ...queryParams, limit, page: 1 })
          }
        />
      ) : null}
    </main>
  )
}

export default CatalogView
