import { Router } from 'express'
import Activity from '../models/Activity.js'
import Leaderboard from '../models/Leaderboard.js'
import Team from '../models/Team.js'
import User from '../models/User.js'
import Workout from '../models/Workout.js'

const router = Router()

router.get('/api/users/', async (_request, response) => {
	const users = await User.find()
		.select('username displayName grade points team')
		.populate('team', 'name slug')
		.lean()
	response.json(users)
})

router.get('/api/teams/', async (_request, response) => {
	const teams = await Team.find()
		.populate('members', 'username displayName grade points')
		.sort({ name: 1 })
		.lean()
	response.json(teams)
})

router.get('/api/activities/', async (_request, response) => {
	const activities = await Activity.find()
		.populate('user', 'username displayName')
		.sort({ performedAt: -1 })
		.lean()
	response.json(activities)
})

router.get('/api/leaderboard/', async (_request, response) => {
	const leaderboard = await Leaderboard.find()
		.populate('user', 'username displayName')
		.populate('team', 'name slug')
		.sort({ periodStart: -1, rank: 1 })
		.lean()
	response.json(leaderboard)
})

router.get('/api/workouts/', async (_request, response) => {
	const workouts = await Workout.find().sort({ title: 1 }).lean()
	response.json(workouts)
})

export default router