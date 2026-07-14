import { useCallback, useEffect, useState } from 'react'
import {
  showConfirmDialog,
  showSaleFormModal,
  showSuccessAlert,
} from '../services/alertService.js'
import {
  createSaleRecord,
  fetchSalesHistory,
  updateSaleRecord,
} from '../services/historyService.js'
import { fetchCategories } from '../services/productsService.js'
import Pagination from './Pagination.jsx'

const VALID_LIMITS = [10, 20, 40, 50]
const HISTORY_QUERY_KEYS = [
  'historyPage',
  'historyLimit',
  'historySearch',
  'historyCategory',
  'historyStatus',
]

function readHistoryQueryParams() {
  const params = new URLSearchParams(window.location.search)
  const limit = Number(params.get('historyLimit'))

  return {
    page: Math.max(1, Number(params.get('historyPage')) || 1),
    limit: VALID_LIMITS.includes(limit) ? limit : 10,
    search: params.get('historySearch') || '',
    category: params.get('historyCategory') || '',
    status: params.get('historyStatus') || '',
  }
}

function HistoryView() {
  const [queryParams, setQueryParams] = useState(readHistoryQueryParams)
  const [searchInput, setSearchInput] = useState(queryParams.search)
  const [sales, setSales] = useState([])
  const [customSales, setCustomSales] = useState([])
  const [editedSales, setEditedSales] = useState({})
  const [deletedSaleIds, setDeletedSaleIds] = useState([])
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
      status: (nextParams.status || '').trim(),
    }

    HISTORY_QUERY_KEYS.forEach((key) => params.delete(key))

    if (normalizedParams.page > 1) params.set('historyPage', normalizedParams.page)
    if (normalizedParams.limit !== 10) params.set('historyLimit', normalizedParams.limit)
    if (normalizedParams.search) params.set('historySearch', normalizedParams.search)
    if (normalizedParams.category) params.set('historyCategory', normalizedParams.category)
    if (normalizedParams.status) params.set('historyStatus', normalizedParams.status)

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
      const nextParams = readHistoryQueryParams()
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
        if (isActive) {
          setCategories(data)
        }
      } catch {
        if (isActive) {
          setCategories([])
        }
      }
    }

    loadCategories()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true

    const loadSalesHistory = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await fetchSalesHistory({
          ...queryParams,
          customSales,
          editedSales,
          deletedSaleIds,
        })
        if (!isActive) return
        setSales(data.sales || [])
        setTotal(data.total || 0)
      } catch (requestError) {
        if (!isActive) return
        setSales([])
        setTotal(0)
        setError(requestError.message || 'No se pudo cargar el historial de ventas.')
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    loadSalesHistory()

    return () => {
      isActive = false
    }
  }, [customSales, deletedSaleIds, editedSales, queryParams])

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

  const handleStatusChange = (event) => {
    updateQueryParams({ ...queryParams, status: event.target.value, page: 1 })
  }

  const handleResetFilters = () => {
    setSearchInput('')
    updateQueryParams({
      page: 1,
      limit: 10,
      search: '',
      category: '',
      status: '',
    })
  }

  const handleCreateSaleClick = async () => {
    const saleData = await showSaleFormModal(categories)

    if (!saleData) {
      return
    }

    const newSale = createSaleRecord(saleData)
    setCustomSales((currentSales) => [newSale, ...currentSales])
    updateQueryParams({ ...queryParams, page: 1 })

    showSuccessAlert(
      'Venta registrada',
      `La venta "${newSale.product}" fue agregada al historial correctamente.`,
    )
  }

  const handleEditSaleClick = async (sale) => {
    const saleData = await showSaleFormModal(categories, sale)

    if (!saleData) {
      return
    }

    const confirmed = await showConfirmDialog({
      title: '¿Confirmas la edición?',
      text: `Se actualizará la venta ${sale.id} en el historial.`,
      confirmButtonText: 'Sí, guardar cambios',
    })

    if (!confirmed) {
      return
    }

    const updatedSale = updateSaleRecord(sale, saleData)

    if (sale.source === 'custom') {
      setCustomSales((currentSales) =>
        currentSales.map((currentSale) =>
          currentSale.id === sale.id ? updatedSale : currentSale,
        ),
      )
    } else {
      setEditedSales((currentEditedSales) => ({
        ...currentEditedSales,
        [sale.id]: updatedSale,
      }))
    }

    showSuccessAlert(
      'Cambios guardados',
      `La venta ${sale.id} fue actualizada correctamente.`,
    )
  }

  const handleDeleteSaleClick = async (sale) => {
    const confirmed = await showConfirmDialog({
      title: '¿Eliminar esta venta?',
      text: `La venta ${sale.id} dejará de mostrarse en el historial actual.`,
      confirmButtonText: 'Sí, eliminar',
    })

    if (!confirmed) {
      return
    }

    if (sale.source === 'custom') {
      setCustomSales((currentSales) =>
        currentSales.filter((currentSale) => currentSale.id !== sale.id),
      )
    } else {
      setDeletedSaleIds((currentDeletedSaleIds) =>
        currentDeletedSaleIds.includes(sale.id)
          ? currentDeletedSaleIds
          : [...currentDeletedSaleIds, sale.id],
      )
      setEditedSales((currentEditedSales) => {
        const nextEditedSales = { ...currentEditedSales }
        delete nextEditedSales[sale.id]
        return nextEditedSales
      })
    }

    showSuccessAlert(
      'Venta eliminada',
      `La venta ${sale.id} fue retirada del historial actual.`,
    )
  }

  return (
    <main className="catalog-view history-view">
      <div className="dashboard-header">
        <div>
          <p className="section-kicker">AURAHOGAR</p>
          <h2 className="dashboard-title">Historial de ventas</h2>
        </div>
        <button
          type="button"
          className="dashboard-cta cursor-pointer"
          onClick={handleCreateSaleClick}
        >
          <span className="material-symbols-outlined">add</span>
          <span>Registrar nueva venta</span>
        </button>
      </div>

      <section className="history-banner">
        <p>Registro general y seguimiento de pedidos emitidos.</p>
      </section>

      <section className="filters-panel history-filters">
        <div className="catalog-search">
          <label htmlFor="history-search">Buscar venta</label>
          <div className="catalog-search-controls">
            <input
              id="history-search"
              type="search"
              placeholder="Buscar por folio, producto o marca..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="history-status">Estado</label>
          <select id="history-status" value={queryParams.status} onChange={handleStatusChange}>
            <option value="">Todos los estados</option>
            <option value="sent">Enviado</option>
            <option value="pending">Pendiente</option>
            <option value="processing">Preparando</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="history-category">Categoria</label>
          <select
            id="history-category"
            value={queryParams.category}
            onChange={handleCategoryChange}
          >
            <option value="">Todas las categorias</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="filters-reset cursor-pointer"
          onClick={handleResetFilters}
        >
          <span className="material-symbols-outlined">filter_list_off</span>
          Reiniciar filtros
        </button>
      </section>

      {loading ? <p className="catalog-state">Cargando historial...</p> : null}

      {!loading && error ? (
        <div className="catalog-state catalog-state-error">
          <strong>Ocurrio un problema al cargar el historial</strong>
          <span>{error}</span>
        </div>
      ) : null}

      {!loading && !error && sales.length === 0 ? (
        <p className="catalog-state">
          No se encontraron ventas. Intenta cambiar los filtros de busqueda.
        </p>
      ) : null}

      {!loading && !error && sales.length > 0 ? (
        <section className="table-card history-table-card">
          <div className="table-scroll">
            <table className="products-table history-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Categoria</th>
                  <th>Uni</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="actions-column">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="product-code">{sale.id}</td>
                    <td>
                      <div className="product-cell">
                        {sale.image ? (
                          <img
                            className="product-thumbnail"
                            src={sale.image}
                            alt={sale.product}
                            loading="lazy"
                          />
                        ) : (
                          <span className="product-thumbnail-placeholder" aria-hidden="true">
                            <span className="material-symbols-outlined">image</span>
                          </span>
                        )}
                        <div className="product-copy">
                          <span>{sale.product}</span>
                          <small>{sale.detail}</small>
                        </div>
                      </div>
                    </td>
                    <td>{sale.category}</td>
                    <td>{sale.unitsLabel}</td>
                    <td className="product-price">{sale.totalLabel}</td>
                    <td>
                      <span className={`status-pill ${sale.statusClass}`}>{sale.status}</span>
                    </td>
                    <td className="actions-column">
                      <button
                        type="button"
                        onClick={() => handleEditSaleClick(sale)}
                        className="text-button cursor-pointer"
                        style={{ marginRight: '12px' }}
                        title={`Editar ${sale.product}`}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSaleClick(sale)}
                        className="text-button cursor-pointer"
                        style={{ color: '#c94a4a' }}
                        title={`Eliminar ${sale.product}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={queryParams.page}
            total={total}
            limit={queryParams.limit}
            onPageChange={(page) => updateQueryParams({ ...queryParams, page })}
            onLimitChange={(limit) => updateQueryParams({ ...queryParams, limit, page: 1 })}
            className="history-table-footer"
            totalLabel="ventas"
            limitId="history-page-limit"
          />
        </section>
      ) : null}
    </main>
  )
}

export default HistoryView
