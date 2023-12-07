// src/routes/songs.js
import express from 'express';
import Song from '../models/Song.js';

const router = express.Router();

// Create a new song
router.post('/', async (req, res) => {
  try {
    const { title, artist, album, genre } = req.body;
    const newSong = new Song({ title, artist, album, genre });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get overall statistics
router.get('/statistics', async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').count();
    const totalAlbums = await Song.distinct('album').count();
    const totalGenres = await Song.distinct('genre').count();

    // Add more statistics as needed

    res.json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      // Add more statistics as needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add more routes for updating and removing songs

export default router;
