// src/index.js
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import songsRouter from './routes/songs.js';
import { PORT, mongoDBURL } from './config.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:3000/songsdb')

// Routes
app.use('/api/songs', songsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
