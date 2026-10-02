import { useCollection } from '../hooks/useCollection.js'
import ResourceFrame from './ResourceFrame.jsx'

export default function Workouts() {
  const { rows, loading, error, refresh } = useCollection('/api/workouts/', fetch)

  return (
    <ResourceFrame
      eyebrow="Training library"
      title="Workouts"
      description="Choose a session that fits your focus and schedule."
      rows={rows}
      loading={loading}
      error={error}
      refresh={refresh}
    >
      <div className="workout-list">
        {rows.map((workout, index) => (
          <article className="workout-row" key={workout._id || workout.slug || index}>
            <div className="workout-intro">
              <div className="workout-tags">
                <span className="type-label">{workout.focus || 'Training'}</span>
                <span className="difficulty-label">{workout.difficulty || 'All levels'}</span>
              </div>
              <h2>{workout.title || 'Workout'}</h2>
              <p>{workout.description || 'A guided training session.'}</p>
            </div>
            <div className="workout-duration">
              <strong>{workout.estimatedMinutes ?? '--'}</strong>
              <span>minutes</span>
            </div>
            <details className="exercise-details">
              <summary>{Array.isArray(workout.exercises) ? workout.exercises.length : 0} exercises</summary>
              <ol>
                {(Array.isArray(workout.exercises) ? workout.exercises : []).map((exercise, exerciseIndex) => (
                  <li key={`${exercise.name || 'exercise'}-${exerciseIndex}`}>
                    <span>{exercise.name || 'Exercise'}</span>
                    <span>{exercise.sets ? `${exercise.sets} sets` : `${exercise.durationSeconds ?? 0} sec`}</span>
                  </li>
                ))}
              </ol>
            </details>
          </article>
        ))}
      </div>
    </ResourceFrame>
  )
}