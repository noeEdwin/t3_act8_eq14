import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

const products = [
  {
    id: 'DEC-001-SF',
    name: 'Sofa Nordico Minimal',
    detail: 'Lino Beige y Roble',
    category: 'Muebles',
    stock: '12 u.',
    price: '$1,250.00',
    status: 'En Stock',
    statusClass: 'status-success',
  },
  {
    id: 'PLT-045-FC',
    name: 'Ficus Lyrata Senior',
    detail: 'Maceta Ceramica Blanca',
    category: 'Plantas',
    stock: '8 u.',
    price: '$85.00',
    status: 'En Stock',
    statusClass: 'status-success',
  },
  {
    id: 'WD-202-ER',
    name: 'Estanteria de Roble Macizo',
    detail: 'Acabado Aceite Natural',
    category: 'Madera',
    stock: '5 u.',
    price: '$450.00',
    status: 'Pocas Unid.',
    statusClass: 'status-muted',
  },
  {
    id: 'SCL-110-MB',
    name: 'Escultura Fluidez',
    detail: 'Marmol de Carrara',
    category: 'Esculturas',
    stock: '2 u.',
    price: '$890.00',
    status: 'Agotado',
    statusClass: 'status-empty',
  },
]

function DashboardPage({ user, onLogout }) {
  return (
    <section className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar user={user} onLogout={onLogout} />
        <div className="dashboard-header">
          <div>
            <p className="section-kicker">AURAHOGAR</p>
            <h2 className="dashboard-title">Catálogo</h2>
          </div>
          <button type="button" className="dashboard-cta">
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
            <p>
              Elevando el diseño de interiores con una curaduria organica y precisa.
            </p>
          </div>
        </section>

        <section className="filters-panel">
          <div className="filter-group">
            <label>Rango de fechas</label>
            <select defaultValue="ultimos-30">
              <option value="ultimos-30">Ultimos 30 dias</option>
              <option value="trimestre">Ultimo trimestre</option>
              <option value="fiscal-2024">Ano fiscal 2025</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Estado</label>
            <select defaultValue="todos">
              <option value="todos">Todos los estados</option>
              <option value="stock">En Stock</option>
              <option value="agotado">Agotado</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Categoria</label>
            <select defaultValue="todas">
              <option value="todas">Todas las categorias</option>
              <option value="muebles">Muebles</option>
              <option value="plantas">Plantas</option>
              <option value="decoracion">Decoracion</option>
            </select>
          </div>
          <button type="button" className="filters-reset">
            <span className="material-symbols-outlined">filter_list</span>
            Reiniciar filtros
          </button>
        </section>

        <section className="table-card">
          <div className="table-scroll">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Categoria</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Estado</th>
                  <th className="actions-column">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="product-code">{product.id}</td>
                    <td>
                      <div className="product-copy">
                        <span>{product.name}</span>
                        <small>{product.detail}</small>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.stock}</td>
                    <td className="product-price">{product.price}</td>
                    <td>
                      <span className={`status-pill ${product.statusClass}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="actions-column">
                      <button type="button" className="table-action">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="table-meta">
              <span>MOSTRANDO 5 DE 212 PRODUCTOS</span>
            </div>
            <div className="pagination">
              <button type="button" className="page-button" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button type="button" className="page-button page-button-active">
                1
              </button>
              <button type="button" className="page-button">
                2
              </button>
              <button type="button" className="page-button">
                3
              </button>
              <button type="button" className="page-button">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default DashboardPage
