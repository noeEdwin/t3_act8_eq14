import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct } from '../services/productsService';
import DataTable from './DataTable';
import Pagination from './Pagination';

// Componente principal
export default function CatalogView() {
  // Lectura inicial de los parámetros de la URL
  const getInitialParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      page: Number(params.get('page')) || 1,
      limit: Number(params.get('limit')) || 10,
      search: params.get('search') || '',
      category: params.get('category') || ''
    };
  };

  // Estados de datos de la tabla
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  // Estados de interfaz y retroalimentación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los filtros y la paginación sincronizados con la URL
  const [queryParams, setQueryParams] = useState(getInitialParams);
  const [searchInput, setSearchInput] = useState(queryParams.search);

  // FUNCIÓN PARA REFLEJAR CAMBIOS EN LA URL
  const updateURL = useCallback((newParams) => {
    const url = new URL(window.location);
    const params = new URLSearchParams();

    // Solo agregamos a la URL los parámetros que tengan valor para mantenerla limpia
    if (newParams.page > 1) params.set('page', newParams.page);
    if (newParams.limit !== 10) params.set('limit', newParams.limit);
    if (newParams.search.trim()) params.set('search', newParams.search.trim());
    if (newParams.category.trim()) params.set('category', newParams.category.trim());

    const queryString = params.toString();
    const newUrl = queryString ? `${url.pathname}?${queryString}` : url.pathname;

    // Actualiza la barra de direcciones del navegador sin recargar la página
    window.history.pushState({}, '', newUrl);
    setQueryParams(newParams);
  }, []);

  // Escuchador del botón atrás/adelante
  useEffect(() => {
    const handlePopState = () => {
      const params = getInitialParams();
      setQueryParams(params);
      setSearchInput(params.search);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Carga de categorias
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    };
    loadCategories();
  }, []);

  // Carga de productos
  useEffect(() => {
    const loadCatalog = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProducts(queryParams);
        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (err) {
        setError(err.message || 'Error al cargar el catálogo.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, [queryParams]);

  // Manejadores de eventos para la paginación y los filtros
  const handlePageChange = (newPage) => {
    updateURL({ ...queryParams, page: newPage });
  };

  const handleLimitChange = (newLimit) => {
    // Al cambiar la cantidad por página, regresamos a la página 1
    updateURL({ ...queryParams, limit: newLimit, page: 1 });
  };

  const handleCategoryChange = (e) => {
    updateURL({ ...queryParams, category: e.target.value, page: 1 });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateURL({ ...queryParams, search: searchInput, page: 1 });
  };

  const handleResetFilters = () => {
    setSearchInput('');
    updateURL({ page: 1, limit: 10, search: '', category: '' });
  };

  // Manejador de acciones CRUD
  const handleEditClick = (product) => {
    console.log('Editar producto:', product);
    // Aquí abriremos el modal de edición en el siguiente paso
  };

  const handleDeleteClick = (product) => {
    console.log('Eliminar producto:', product);

  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Encabezado principal */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-amber-900/60 uppercase tracking-widest">AURA HOGAR</span>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mt-1">Catálogo</h1>
        </div>
        <button
          onClick={() => console.log('Abrir modal para crear producto')}
          className="bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all flex items-center gap-2"
        >
          <span>+</span> REGISTRAR NUEVO PRODUCTO
        </button>
      </div>

      {/* Banner decorativo */}
      <div className="bg-gradient-to-r from-purple-50/50 to-pink-50/50 border border-purple-100/50 rounded-2xl p-6 sm:p-8 mb-8">
        <p className="text-lg sm:text-xl font-serif text-gray-800 max-w-2xl leading-relaxed">
          Elevando el diseño de interiores con una curaduría orgánica y precisa.
        </p>
      </div>

      {/* Barra superior de filtros */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 transition-all"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Buscar
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase">Categoría:</label>
            <select
              value={queryParams.category}
              onChange={handleCategoryChange}
              className="px-3 py-2 bg-gray-50/80 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-amber-800 transition-all cursor-pointer capitalize"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name || cat.slug}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleResetFilters}
            className="px-4 py-2 border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all"
          >
            ↺ Reiniciar Filtros
          </button>
        </div>
      </div>

      {/* Componente de Tabla */}
      <DataTable
        products={products}
        loading={loading}
        error={error}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* Componente de Paginación */}
      {!loading && !error && (
        <Pagination
          currentPage={queryParams.page}
          total={total}
          limit={queryParams.limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      )}

    </div>
  );
}