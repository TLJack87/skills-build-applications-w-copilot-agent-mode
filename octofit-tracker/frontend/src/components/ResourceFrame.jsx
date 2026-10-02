export default function ResourceFrame({
  eyebrow,
  title,
  description,
  rows,
  loading,
  error,
  refresh,
  children,
}) {
  return (
    <section className="resource-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <button className="refresh-button" type="button" onClick={refresh} disabled={loading}>
          <span aria-hidden="true" className="refresh-mark">↻</span>
          Refresh
        </button>
      </div>

      <div className="resource-status" aria-live="polite">
        <span className="status-dot" />
        {loading ? 'Syncing data' : `${rows.length} ${rows.length === 1 ? 'record' : 'records'}`}
        <span className="status-source">API data</span>
      </div>

      {loading ? (
        <div className="state-panel" role="status">Loading {title.toLowerCase()}...</div>
      ) : error ? (
        <div className="state-panel state-error" role="alert">
          <div>
            <strong>Could not load {title.toLowerCase()}</strong>
            <p>{error}</p>
          </div>
          <button className="refresh-button" type="button" onClick={refresh}>Try again</button>
        </div>
      ) : rows.length === 0 ? (
        <div className="state-panel">
          <strong>No {title.toLowerCase()} yet</strong>
          <p>There is no data to show for this view.</p>
        </div>
      ) : children}
    </section>
  )
}