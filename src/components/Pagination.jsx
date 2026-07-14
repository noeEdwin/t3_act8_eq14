function Pagination({
  currentPage = 1,
  total = 0,
  limit = 10,
  onPageChange,
  onLimitChange,
  className = '',
  totalLabel = 'productos',
  limitId = 'page-limit',
}) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const pages = []

  for (let page = 1; page <= totalPages; page += 1) {
    if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
      pages.push(page)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <div className={`table-footer ${className}`.trim()}>
      <div className="table-meta">
        <label htmlFor={limitId}>Mostrar</label>
        <select
          id={limitId}
          value={limit}
          onChange={(event) => onLimitChange(Number(event.target.value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
        <span>{total} {totalLabel}</span>
      </div>

      <div className="pagination">
        <button
          type="button"
          className="page-button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        {pages.map((page, index) => (
          <button
            key={`${page}-${index}`}
            type="button"
            className={`page-button ${page === currentPage ? 'page-button-active' : ''}`}
            disabled={page === '...'}
            onClick={() => typeof page === 'number' && onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className="page-button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  )
}

export default Pagination
