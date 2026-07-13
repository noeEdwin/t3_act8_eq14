function DataTable({ products = [], loading, error }) {
  if (loading) {
    return <p className="catalog-state">Cargando catálogo...</p>
  }

  if (error) {
    return (
      <div className="catalog-state catalog-state-error">
        <strong>Ocurrió un problema al cargar los datos</strong>
        <span>{error}</span>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <p className="catalog-state">
        No se encontraron productos. Intenta cambiar los filtros de búsqueda.
      </p>
    )
  }

  return (
    <section className="table-card">
      <div className="table-scroll">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Estado</th>
              <th className="actions-column">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const inStock = product.stock > 0

              return (
                <tr key={product.id}>
                  <td className="product-code">#{product.id}</td>
                  <td>
                    <div className="product-copy">
                      <span>{product.title}</span>
                      <small>{product.brand || 'Aura Hogar'}</small>
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.stock} u.</td>
                  <td className="product-price">${Number(product.price).toFixed(2)}</td>
                  <td>
                    <span className={`status-pill ${inStock ? 'status-success' : 'status-empty'}`}>
                      {inStock ? 'En stock' : 'Agotado'}
                    </span>
                  </td>
                  <td className="actions-column">
                    <span className="table-action-placeholder">Próximamente</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default DataTable
