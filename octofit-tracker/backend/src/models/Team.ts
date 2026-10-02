import { Schema, model } from 'mongoose'

const teamSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
)

export default model('Team', teamSchema)