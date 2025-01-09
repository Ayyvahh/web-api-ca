import movieModel from './movieModel.js';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getGenres,
    getMovies,
    getUpcomingMovies
} from '../backend-tmdb-api.js';




const router = express.Router(); // eslint-disable-line

router.get('/', asyncHandler(async (req, res) => {
    const { page = 1, genre = "" } = req.query;

    try {
        const movies = await getMovies(page, genre);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch movies.' });
    }
}));



router.get('/home', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query;
    [page, limit] = [+page, +limit];

    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit);

    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


router.get('/upcoming', asyncHandler(async (req, res) => {
    const movies = await getUpcomingMovies();
    res.status(200).json(movies);
}));


router.get('/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getGenres()
        res.status(200).json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
}));


router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid movie ID.' });
    }
    const movie = await movieModel.findByMovieDBId(id);
    res.status(200).json(movie);
}));


export default router;

