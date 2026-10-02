import { Schema, model } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], required: true },
    periodStart: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
)

export default model('Leaderboard', leaderboardSchema)