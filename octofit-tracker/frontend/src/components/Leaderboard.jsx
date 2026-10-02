import { useCollection } from '../hooks/useCollection.js'
import ResourceFrame from './ResourceFrame.jsx'

export default function Leaderboard() {
  const { rows, loading, error, refresh } = useCollection('/api/leaderboard/', fetch)

  return (
    <ResourceFrame
      eyebrow="Friendly competition"
      title="Leaderboard"
      description="See who is leading each training period."
      rows={rows}
      loading={loading}
      error={error}
      refresh={refresh}
    >
      <div className="table-wrap">
        <table className="tracker-table leaderboard-table">
          <thead>
            <tr><th>Rank</th><th>Athlete</th><th>Team</th><th>Period</th><th>Points</th></tr>
          </thead>
          <tbody>
            {rows.map((entry, index) => (
              <tr key={entry._id || entry.slug || index}>
                <td><span className={`rank-mark ${Number(entry.rank) <= 3 ? 'rank-top' : ''}`}>{entry.rank ?? index + 1}</span></td>
                <td className="primary-cell">{entry.user?.displayName || entry.user?.username || 'Athlete'}</td>
                <td>{entry.team?.name || 'Independent'}</td>
                <td><span className="type-label">{entry.period || 'All time'}</span></td>
                <td className="points-cell">{Number(entry.points ?? 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResourceFrame>
  )
}