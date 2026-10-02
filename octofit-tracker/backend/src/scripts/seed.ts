import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({ username: { $in: ['maya-chen', 'jordan-lee', 'samira-patel'] } }),
      Team.deleteMany({ slug: { $in: ['trailblazers', 'motion-makers'] } }),
      Activity.deleteMany({ slug: { $in: ['maya-run', 'jordan-strength', 'samira-walk', 'maya-strength'] } }),
      Leaderboard.deleteMany({ slug: { $in: ['weekly-maya', 'weekly-jordan', 'weekly-samira'] } }),
      Workout.deleteMany({ slug: { $in: ['steady-start-run', 'bodyweight-basics', 'mobility-reset'] } }),
    ]);

    const users = await User.insertMany([
      { username: 'maya-chen', displayName: 'Maya Chen', grade: 10, points: 145 },
      { username: 'jordan-lee', displayName: 'Jordan Lee', grade: 11, points: 120 },
      { username: 'samira-patel', displayName: 'Samira Patel', grade: 9, points: 95 },
    ]);
    const userByUsername = new Map(users.map((user) => [user.username, user]));
    const requireUser = (username: string) => {
      const user = userByUsername.get(username);
      if (!user) throw new Error(`Seed user not found: ${username}`);
      return user;
    };

    const teams = await Team.insertMany([
      {
        slug: 'trailblazers',
        name: 'Trailblazers',
        school: 'Mergington High School',
        members: [requireUser('maya-chen')._id, requireUser('jordan-lee')._id],
        points: 265,
      },
      {
        slug: 'motion-makers',
        name: 'Motion Makers',
        school: 'Mergington High School',
        members: [requireUser('samira-patel')._id],
        points: 95,
      },
    ]);
    const teamBySlug = new Map(teams.map((team) => [team.slug, team]));
    const requireTeam = (slug: string) => {
      const team = teamBySlug.get(slug);
      if (!team) throw new Error(`Seed team not found: ${slug}`);
      return team;
    };

    await User.updateOne(
      { username: 'maya-chen' },
      { $set: { team: requireTeam('trailblazers')._id } },
    );
    await User.updateOne(
      { username: 'jordan-lee' },
      { $set: { team: requireTeam('trailblazers')._id } },
    );
    await User.updateOne(
      { username: 'samira-patel' },
      { $set: { team: requireTeam('motion-makers')._id } },
    );

    const seedDate = new Date();
    const weekStart = new Date(seedDate);
    weekStart.setDate(seedDate.getDate() - ((seedDate.getDay() + 6) % 7));
    const daysAgo = (days: number) => new Date(seedDate.getTime() - days * 24 * 60 * 60 * 1000);

    await Activity.insertMany([
      {
        slug: 'maya-run', user: requireUser('maya-chen')._id, type: 'running',
        durationMinutes: 28, distanceKm: 3.8, calories: 215, points: 34, performedAt: daysAgo(1),
      },
      {
        slug: 'jordan-strength', user: requireUser('jordan-lee')._id, type: 'strength',
        durationMinutes: 35, calories: 205, points: 32, performedAt: daysAgo(2),
      },
      {
        slug: 'samira-walk', user: requireUser('samira-patel')._id, type: 'walking',
        durationMinutes: 32, distanceKm: 2.4, calories: 128, points: 24, performedAt: daysAgo(1),
      },
      {
        slug: 'maya-strength', user: requireUser('maya-chen')._id, type: 'strength',
        durationMinutes: 24, calories: 146, points: 26, performedAt: daysAgo(4),
      },
    ]);

    await Leaderboard.insertMany([
      {
        slug: 'weekly-maya', period: 'weekly', periodStart: weekStart,
        user: requireUser('maya-chen')._id, team: requireTeam('trailblazers')._id, points: 60, rank: 1,
      },
      {
        slug: 'weekly-jordan', period: 'weekly', periodStart: weekStart,
        user: requireUser('jordan-lee')._id, team: requireTeam('trailblazers')._id, points: 48, rank: 2,
      },
      {
        slug: 'weekly-samira', period: 'weekly', periodStart: weekStart,
        user: requireUser('samira-patel')._id, team: requireTeam('motion-makers')._id, points: 38, rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        slug: 'steady-start-run', title: 'Steady Start Run',
        description: 'A gentle interval session for building running confidence.',
        difficulty: 'beginner', focus: 'cardio', estimatedMinutes: 24,
        exercises: [
          { name: 'Brisk walk warm-up', durationSeconds: 300, restSeconds: 30 },
          { name: 'Easy jog', durationSeconds: 120, restSeconds: 60 },
          { name: 'Cool-down walk', durationSeconds: 300, restSeconds: 0 },
        ],
      },
      {
        slug: 'bodyweight-basics', title: 'Bodyweight Basics',
        description: 'A balanced strength circuit using controlled bodyweight movements.',
        difficulty: 'beginner', focus: 'strength', estimatedMinutes: 20,
        exercises: [
          { name: 'Chair squats', sets: 3, reps: 10, restSeconds: 45 },
          { name: 'Incline push-ups', sets: 3, reps: 8, restSeconds: 45 },
          { name: 'Glute bridges', sets: 3, reps: 12, restSeconds: 45 },
        ],
      },
      {
        slug: 'mobility-reset', title: 'Mobility Reset',
        description: 'A short, low-impact routine to loosen up after a busy school day.',
        difficulty: 'beginner', focus: 'mobility', estimatedMinutes: 12,
        exercises: [
          { name: 'Standing reach', sets: 2, reps: 8, restSeconds: 20 },
          { name: 'Hip flexor stretch', sets: 2, durationSeconds: 30, restSeconds: 20 },
          { name: 'Calf stretch', sets: 2, durationSeconds: 30, restSeconds: 20 },
        ],
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
