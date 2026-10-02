import { useCollection } from '../hooks/useCollection.js'
import ResourceFrame from './ResourceFrame.jsx'

function formatDate(value) {
  if (!value) return 'Not recorded'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Not recorded' : date.toLocaleDateString()
}

export default function Activities() {
  const { rows, loading, error, refresh } = useCollection('/api/activities/', fetch)

  return (
    <ResourceFrame
      eyebrow="Movement log"
      title="Activities"
      description="Recent training sessions across your OctoFit community."
      rows={rows}
      loading={loading}
      error={error}
      refresh={refresh}
    >
      <div className="table-wrap">
        <table className="tracker-table">
          <thead>
            <tr><th>Athlete</th><th>Activity</th><th>Session</th><th>Points</th><th>Date</th></tr>
          </thead>
          <tbody>
            {rows.map((activity, index) => (
              <tr key={activity._id || activity.slug || index}>
                <td className="primary-cell">{activity.user?.displayName || activity.user?.username || 'Athlete'}</td>
                <td><span className="type-label">{activity.type || 'Activity'}</span></td>
                <td>
                  <strong>{activity.durationMinutes ?? 0} min</strong>
                  {Number(activity.distanceKm) > 0 && <span className="cell-subtext">{activity.distanceKm} km</span>}
                </td>
                <td className="points-cell">+{Number(activity.points ?? 0).toLocaleString()}</td>
                <td>{formatDate(activity.performedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResourceFrame>
  )
}