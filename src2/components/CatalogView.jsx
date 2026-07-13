import { useCallback, useEffect, useState } from 'react'
import { fetchCategories, fetchProducts } from '../services/productsService.js'
import DataTable from './DataTable.jsx'
import Pagination from './Pagination.jsx'

const VALID_LIMITS = [10, 20, 40, 50]

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
    const params = new URLSearchParams()
    const normalizedParams = {
      page: Math.max(1, Number(nextParams.page) || 1),
      limit: VALID_LIMITS.includes(Number(nextParams.limit)) ? Number(nextParams.limit) : 10,
      search: nextParams.search.trim(),
      category: nextParams.category.trim(),
    }

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

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    updateQueryParams({ ...queryParams, search: searchInput, page: 1 })
  }

  const handleCategoryChange = (event) => {
    updateQueryParams({ ...queryParams, category: event.target.value, page: 1 })
  }

  const handleResetFilters = () => {
    setSearchInput('')
    updateQueryParams({ page: 1, limit: 10, search: '', category: '' })
  }

  return (
    <main className="catalog-view">
      <div className="dashboard-header">
        <div>
          <p className="section-kicker">AURAHOGAR</p>
          <h2 className="dashboard-title">Catálogo</h2>
        </div>
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
        <form className="catalog-search" onSubmit={handleSearchSubmit}>
          <label htmlFor="product-search">Buscar producto</label>
          <div className="catalog-search-controls">
            <input
              id="product-search"
              type="search"
              placeholder="Buscar por título..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button type="submit" className="filters-reset">Buscar</button>
          </div>
        </form>

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

        <button type="button" className="filters-reset" onClick={handleResetFilters}>
          <span className="material-symbols-outlined">filter_list</span>
          Reiniciar filtros
        </button>
      </section>

      <DataTable products={products} loading={loading} error={error} />

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
