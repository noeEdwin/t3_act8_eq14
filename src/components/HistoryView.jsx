const salesHistory = [
  {
    id: 'DEC-001-SF',
    product: 'Sofá Nórdico Minimal',
    detail: 'Lino Beige y Roble',
    category: 'Muebles',
    units: '1 u.',
    total: '$1,250.00',
    status: 'Enviado',
    statusClass: 'status-success',
  },
  {
    id: 'PLT-045-PC',
    product: 'Ficus Lyrata Senior',
    detail: 'Maceta Cerámica Blanca',
    category: 'Plantas',
    units: '1 u.',
    total: '$85.00',
    status: 'Enviado',
    statusClass: 'status-success',
  },
  {
    id: 'MD-292-ER',
    product: 'Estantería de Roble Macizo',
    detail: 'Acabado Aceite Natural',
    category: 'Madera',
    units: '1 u.',
    total: '$450.00',
    status: 'Pendiente',
    statusClass: 'status-muted',
  },
  {
    id: 'SCL-138-MB',
    product: 'Escultura “Fluidez”',
    detail: 'Mármol de Carrara',
    category: 'Esculturas',
    units: '1 u.',
    total: '$890.00',
    status: 'Pendiente',
    statusClass: 'status-muted',
  },
  {
    id: 'ACC-552-HU',
    product: 'Jarrón de Arcilla Ahumada',
    detail: 'Hecho a mano en Italia',
    category: 'Decoración',
    units: '1 u.',
    total: '$120.00',
    status: 'Enviado',
    statusClass: 'status-success',
  },
]

function HistoryView() {
  return (
    <main className="catalog-view history-view">
      <div className="dashboard-header">
        <div>
          <p className="section-kicker">AURAHOGAR</p>
          <h2 className="dashboard-title">Historial de ventas</h2>
        </div>
        <button type="button" className="dashboard-cta">
          <span className="material-symbols-outlined">add</span>
          <span>Registrar nueva venta</span>
        </button>
      </div>

      <section className="history-banner">
        <p>Registro general y seguimiento de pedidos emitidos.</p>
      </section>

      <section className="filters-panel history-filters">
        <div className="filter-group">
          <label htmlFor="history-date">Rango de fechas</label>
          <select id="history-date" defaultValue="last-month">
            <option value="last-month">Último mes</option>
            <option value="last-quarter">Último trimestre</option>
            <option value="all">Todo el historial</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="history-status">Estado</label>
          <select id="history-status" defaultValue="all">
            <option value="all">Todos los estados</option>
            <option value="sent">Enviado</option>
            <option value="pending">Pendiente</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="history-category">Categoría</label>
          <select id="history-category" defaultValue="all">
            <option value="all">Todas las categorías</option>
            <option value="furniture">Muebles</option>
            <option value="plants">Plantas</option>
            <option value="decoration">Decoración</option>
          </select>
        </div>

        <button type="button" className="filters-reset">
          <span className="material-symbols-outlined">filter_list_off</span>
          Reiniciar filtros
        </button>
      </section>

      <section className="table-card history-table-card">
        <div className="table-scroll">
          <table className="products-table history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Uni</th>
                <th>Total</th>
                <th>Estado</th>
                <th className="actions-column">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {salesHistory.map((sale) => (
                <tr key={sale.id}>
                  <td className="product-code">{sale.id}</td>
                  <td>
                    <div className="product-copy">
                      <span>{sale.product}</span>
                      <small>{sale.detail}</small>
                    </div>
                  </td>
                  <td>{sale.category}</td>
                  <td>{sale.units}</td>
                  <td className="product-price">{sale.total}</td>
                  <td>
                    <span className={`status-pill ${sale.statusClass}`}>{sale.status}</span>
                  </td>
                  <td className="actions-column">
                    <button type="button" className="table-action" aria-label={`Acciones de ${sale.product}`}>
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer history-table-footer">
          <span className="history-count">Mostrando 5 de 123 ventas</span>
          <div className="pagination" aria-label="Paginación del historial">
            <button type="button" className="page-button" aria-label="Página anterior">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button type="button" className="page-button page-button-active">1</button>
            <button type="button" className="page-button">2</button>
            <button type="button" className="page-button">3</button>
            <span className="history-pagination-gap">...</span>
            <button type="button" className="page-button">22</button>
            <button type="button" className="page-button" aria-label="Página siguiente">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HistoryView
