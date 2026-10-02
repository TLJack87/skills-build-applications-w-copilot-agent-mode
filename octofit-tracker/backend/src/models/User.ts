import { Schema, model } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    grade: { type: Number, required: true, min: 9, max: 12 },
    points: { type: Number, required: true, min: 0, default: 0 },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
)

export default model('User', userSchema)