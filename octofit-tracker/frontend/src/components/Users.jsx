import { useCollection } from '../hooks/useCollection.js'
import ResourceFrame from './ResourceFrame.jsx'

export default function Users() {
  const { rows, loading, error, refresh } = useCollection('/api/users/', fetch)

  return (
    <ResourceFrame
      eyebrow="People"
      title="Athletes"
      description="Meet the people building healthy habits together."
      rows={rows}
      loading={loading}
      error={error}
      refresh={refresh}
    >
      <div className="table-wrap">
        <table className="tracker-table">
          <thead>
            <tr><th>Athlete</th><th>Grade</th><th>Team</th><th>Points</th></tr>
          </thead>
          <tbody>
            {rows.map((user, index) => (
              <tr key={user._id || user.username || index}>
                <td>
                  <div className="person-cell">
                    <span className="person-initial" aria-hidden="true">{(user.displayName || user.username || 'A').slice(0, 1).toUpperCase()}</span>
                    <span><strong>{user.displayName || 'Athlete'}</strong><span className="cell-subtext">@{user.username || 'member'}</span></span>
                  </div>
                </td>
                <td>{user.grade ? `Grade ${user.grade}` : 'Not set'}</td>
                <td>{user.team?.name || 'No team'}</td>
                <td className="points-cell">{Number(user.points ?? 0).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ResourceFrame>
  )
}