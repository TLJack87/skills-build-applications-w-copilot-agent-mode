import { Schema, model } from 'mongoose'

const exerciseSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    durationSeconds: { type: Number, min: 1 },
    restSeconds: { type: Number, min: 0, default: 30 },
  },
  { _id: false },
)

const workoutSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    focus: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [exerciseSchema], required: true, validate: (items: unknown[]) => items.length > 0 },
  },
  { timestamps: true },
)

export default model('Workout', workoutSchema)