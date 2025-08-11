import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postgres from 'postgres';
import userRouter from './routes/routes.js';
import { supabase } from '../client/src/lib/supabase.js';
import { clerkMiddleware } from '@clerk/express'


// Load env variables
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware())




// Test database connection
const connectionString = process.env.DATABASE_URL
const sql = postgres(connectionString,{
    ssl:'require',
})
// Test DB connection
sql`SELECT 1`
  .then(() => {
    console.log('✅ Successfully connected to the Supabase PostgreSQL database!');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
  });

const { data: { session } } = await supabase.auth.getSession()
console.log("Session:", session)


// Routes
app.get('/', (req, res) => {
  res.send("🌍 Server is running!");
});

app.use('/api/user', userRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
