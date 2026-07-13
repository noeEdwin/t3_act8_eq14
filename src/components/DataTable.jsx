import React from 'react';

// Componente de tabla reutilizable para mostrar el catálogo de productos
export default function DataTable({ products = [], loading, error, onEdit, onDelete }) {
  // Estado de carga: muestra un indicador mientras se consumen los datos de la API
  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">Cargando catálogo...</p>
        <p className="text-sm">Por favor espera un momento.</p>
      </div>
    );
  }

  // Estado de error: muestra un mensaje claro si la petición falla
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded-lg text-center my-4">
        <p className="font-semibold">Ocurrió un problema al cargar los datos</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  // Estado sin resultados: cuando un filtro no coincide con ningún producto
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-500 my-4">
        <p className="text-base font-medium">No se encontraron productos</p>
        <p className="text-sm mt-1">Intenta cambiar los filtros de búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
      <table className="w-full text-left border-collapse">
        {/* Encabezado */}
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
            <th className="py-4 px-6">ID</th>
            <th className="py-4 px-6">Producto</th>
            <th className="py-4 px-6">Categoría</th>
            <th className="py-4 px-6">Stock</th>
            <th className="py-4 px-6">Precio</th>
            <th className="py-4 px-6">Estado</th>
            <th className="py-4 px-6 text-right">Acciones</th>
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
          {products.map((product) => {
            // Determina el estado del producto basado en el stock disponible
            const inStock = product.stock > 0;

            return (
              <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                {/* ID del producto */}
                <td className="py-4 px-6 font-mono text-xs text-gray-400">
                  #{product.id}
                </td>

                {/* Título */}
                <td className="py-4 px-6 font-medium text-gray-900">
                  <div>{product.title}</div>
                  <div className="text-xs text-gray-400">{product.brand || 'Aura Hogar'}</div>
                </td>

                {/* Categoría */}
                <td className="py-4 px-6 capitalize text-gray-600">
                  {product.category}
                </td>

                {/* Cantidad en stock */}
                <td className="py-4 px-6 text-gray-600">
                  {product.stock} u.
                </td>

                {/* Precio */}
                <td className="py-4 px-6 font-semibold text-gray-900">
                  ${Number(product.price).toFixed(2)}
                </td>

                {/* Etiqueta de estado*/}
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {inStock ? 'EN STOCK' : 'AGOTADO'}
                  </span>
                </td>

                {/* Botones de acción CRUD*/}
                <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-gray-400 hover:text-amber-800 font-medium text-xs px-2 py-1 rounded border border-gray-200 hover:border-amber-800 transition-colors"
                    title="Editar registro"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(product)}
                    className="text-gray-400 hover:text-red-600 font-medium text-xs px-2 py-1 rounded border border-gray-200 hover:border-red-600 transition-colors"
                    title="Eliminar registro"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}