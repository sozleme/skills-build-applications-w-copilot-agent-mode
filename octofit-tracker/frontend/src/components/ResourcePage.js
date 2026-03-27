import { useMemo, useState } from 'react';

function formatCellValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'None';
  }

  if (value === null || value === undefined || value === '') {
    return 'None';
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function ResourcePage({ columns, data, description, endpoint, error, loading, onRefresh, title }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((item) =>
      columns.some((column) => formatCellValue(item[column.key]).toLowerCase().includes(query))
    );
  }, [columns, data, searchTerm]);

  return (
    <section className="resource-panel card border-0 shadow-lg">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3 mb-4">
          <div>
            <p className="text-uppercase text-primary-emphasis small fw-semibold mb-2">Data View</p>
            <h2 className="h2 fw-bold mb-2">{title}</h2>
            <p className="text-body-secondary mb-0">{description}</p>
          </div>

          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="badge rounded-pill text-bg-primary px-3 py-2">{filteredData.length} shown</span>
            <span className="badge rounded-pill text-bg-light border px-3 py-2">{data.length} total</span>
          </div>
        </div>

        <div className="card section-card border-0 shadow-sm mb-4">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-12 col-lg-6">
                <label htmlFor={`${title}-search`} className="form-label fw-semibold">
                  Search records
                </label>
                <input
                  id={`${title}-search`}
                  className="form-control form-control-lg"
                  type="search"
                  placeholder={`Filter ${title.toLowerCase()} by any visible field`}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>

              <div className="col-12 col-lg-6">
                <label className="form-label fw-semibold">API endpoint</label>
                <div className="d-flex flex-wrap gap-2">
                  <button type="button" className="btn btn-primary btn-lg" onClick={onRefresh}>
                    Refresh Data
                  </button>
                  <a
                    className="btn btn-outline-primary btn-lg"
                    href={endpoint}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open API
                  </a>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Filter
                  </button>
                </div>
                <a className="d-inline-block link-primary mt-2 text-break" href={endpoint} target="_blank" rel="noreferrer">
                  {endpoint}
                </a>
              </div>
            </div>
          </div>
        </div>

        {loading ? <div className="alert alert-info mb-4">Loading {title.toLowerCase()}...</div> : null}
        {error ? <div className="alert alert-danger mb-4">{error}</div> : null}

        {!loading && !error ? (
          <div className="card section-card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
              <h3 className="h5 fw-semibold mb-0">{title} Table</h3>
              <span className="text-body-secondary small">Bootstrap table layout</span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 resource-table">
                <thead className="table-light">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.key} scope="col" className={column.headerClassName || ''}>
                        {column.label}
                      </th>
                    ))}
                    <th scope="col" className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.id || `${title}-${index}`}>
                        {columns.map((column) => (
                          <td key={column.key} className={column.cellClassName || ''}>
                            {formatCellValue(item[column.key])}
                          </td>
                        ))}
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-dark"
                            onClick={() => setSelectedItem(item)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length + 1} className="text-center py-5 text-body-secondary">
                        No matching records available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>

      {selectedItem ? (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header border-0 pb-0">
                  <div>
                    <p className="text-uppercase text-primary-emphasis small fw-semibold mb-1">Record Details</p>
                    <h3 className="modal-title h4 mb-0">{title} Details</h3>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>

                <div className="modal-body pt-3">
                  <div className="row g-3">
                    {Object.entries(selectedItem).map(([key, value]) => (
                      <div key={key} className="col-12 col-md-6">
                        <div className="card h-100 border-0 bg-body-tertiary">
                          <div className="card-body">
                            <h4 className="h6 text-uppercase text-body-secondary fw-semibold mb-2">{key}</h4>
                            <p className="mb-0 fw-medium">{formatCellValue(value)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer border-0 pt-0">
                  <a className="btn btn-outline-primary" href={endpoint} target="_blank" rel="noreferrer">
                    Open API
                  </a>
                  <button type="button" className="btn btn-primary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedItem(null)} />
        </>
      ) : null}
    </section>
  );
}

export default ResourcePage;