import asyncHandler from 'express-async-handler';
import express from 'express';
import FavMovie from './favMovieModel';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const favourites = await FavMovie.findByUsername(id);
        if (favourites) {
            res.status(200).json(favourites);
        } else {
            res.status(404).json({ error: 'Favourite movies not found' });
        }
    } catch (error) {
        console.error('Error fetching favourite movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch favourite movies' });
    }
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { movie_ids } = req.body;
    const updatedMovies = await FavMovie.findOneAndUpdate({username: id}, {movie_ids}, {new: true, upsert: true});
    res.status(200).json(updatedMovies);
}));

export default router;