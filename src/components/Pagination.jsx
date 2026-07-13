import React from 'react';

// Componente de paginación y selector de cantidad de registros por página
export default function Pagination({
  currentPage = 1,
  total = 0,
  limit = 10,
  onPageChange,
  onLimitChange
}) {
  // Calcula el número total de páginas en función del total de productos y el límite actual
  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Genera la lógica para no saturar la vista si hay muchas páginas (ej: 1, 2, ..., 10)
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white border border-gray-100 rounded-lg shadow-sm my-4 text-sm text-gray-600 gap-4">
      
      {/* Selector de cantidad de registros por página */}
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-400 uppercase font-semibold">Mostrar:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border border-gray-200 rounded px-2.5 py-1 text-gray-700 bg-gray-50/50 hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-amber-800 text-xs font-medium cursor-pointer transition-colors"
        >
          <option value={10}>10 registros</option>
          <option value={20}>20 registros</option>
          <option value={40}>40 registros</option>
          <option value={50}>50 registros</option>
        </select>
        <span className="text-xs text-gray-400 hidden md:inline">
          (Total: {total} {total === 1 ? 'producto' : 'productos'})
        </span>
      </div>

      {/* Controles de navegación de páginas */}
      <div className="flex items-center space-x-1">
        
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors border ${
            currentPage <= 1
              ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50/50'
              : 'border-gray-200 text-gray-600 hover:border-amber-800 hover:text-amber-800 bg-white'
          }`}
        >
          Anterior
        </button>

        {/* Números de página */}
        <div className="flex items-center space-x-1 px-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                page === currentPage
                  ? 'bg-amber-800 text-white font-semibold shadow-sm'
                  : page === '...'
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors border ${
            currentPage >= totalPages
              ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50/50'
              : 'border-gray-200 text-gray-600 hover:border-amber-800 hover:text-amber-800 bg-white'
          }`}
        >
          Siguiente
        </button>
      </div>

    </div>
  );
}