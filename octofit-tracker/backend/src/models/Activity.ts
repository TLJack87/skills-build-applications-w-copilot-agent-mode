import { Schema, model } from 'mongoose'

const activitySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0, default: 0 },
    calories: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

export default model('Activity', activitySchema)