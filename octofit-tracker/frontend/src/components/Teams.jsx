import { useCollection } from '../hooks/useCollection.js'
import ResourceFrame from './ResourceFrame.jsx'

export default function Teams() {
  const { rows, loading, error, refresh } = useCollection('/api/teams/', fetch)

  return (
    <ResourceFrame
      eyebrow="Squad directory"
      title="Teams"
      description="Find your squad and follow its progress."
      rows={rows}
      loading={loading}
      error={error}
      refresh={refresh}
    >
      <div className="team-grid">
        {rows.map((team, index) => (
          <article className="team-row" key={team._id || team.slug || index}>
            <div className="team-monogram" aria-hidden="true">{(team.name || 'T').slice(0, 1).toUpperCase()}</div>
            <div className="team-identity">
              <h2>{team.name || 'Unnamed team'}</h2>
              <p>{team.school || 'Community team'}</p>
            </div>
            <div className="team-stat">
              <strong>{Array.isArray(team.members) ? team.members.length : 0}</strong>
              <span>members</span>
            </div>
            <div className="team-stat team-points">
              <strong>{Number(team.points ?? 0).toLocaleString()}</strong>
              <span>points</span>
            </div>
          </article>
        ))}
      </div>
    </ResourceFrame>
  )
}