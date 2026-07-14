function DataTable({ products = [], loading, error, onEdit, onDelete }) {
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
              const stock = Number(product.stock) || 0
              const status =
                stock <= 0
                  ? { label: 'Agotado', className: 'status-empty' }
                  : stock <= 15
                    ? { label: 'Pocas unidades', className: 'status-muted' }
                    : { label: 'En stock', className: 'status-success' }

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
                      <span className={`status-pill ${status.className}`}>{status.label}</span>
                    </td>
                  <td className="actions-column">
                    {/* Reemplazamos "Próximamente" por los botones interactivos del CRUD */}
                    <button
                      type="button"
                      onClick={() => onEdit(product)}
                      className="text-button cursor-pointer"
                      style={{ marginRight: '12px' }}
                      title="Editar registro"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(product)}
                      className="text-button cursor-pointer"
                      style={{ color: '#c94a4a' }}
                      title="Eliminar registro"
                    >
                      Eliminar
                    </button>
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
