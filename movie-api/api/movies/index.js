import movieModel from './movieModel.js';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getGenres, getMovie, getMovieCast, getMovieImages, getMovieReviews,
    getMovies, getNowShowingMovies, getRecommendedMovies,
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

router.get('/genres', asyncHandler(async (req, res) => {
    try {
        const genres = await getGenres()
        res.status(200).json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({error: 'Failed to fetch genres'});
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
    const { page = 1} = req.query;

    try {
        const movies = await getUpcomingMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }

}));


router.get('/recommended/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const movies = await getRecommendedMovies(id);
        if (movies) {
            res.status(200).json(movies);
        } else {
            res.status(404).json({ error: 'Recommended movies not found' });
        }
    } catch (error) {
        console.error('Error fetching recommended movies:', error.message);
        res.status(500).json({ error: 'Failed to fetch recommended movies' });
    }
}));



router.get('/nowShowing', asyncHandler(async (req, res) => {
    const {page = 1} = req.query;

    try {
        const movies = await getNowShowingMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({error: 'Failed to fetch movies'});
    }

}));

router.get('/images/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const images = await getMovieImages(id);
        if (images) {
            res.status(200).json(images);
        } else {
            res.status(404).json({ error: 'Images not found' });
        }
    } catch (error) {
        console.error('Error fetching movie images:', error.message);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}));


router.get('/reviews/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const reviews = await getMovieReviews(id);
        if (reviews) {
            res.status(200).json(reviews);
        } else {
            res.status(404).json({ error: 'Reviews not found' });
        }
    } catch (error) {
        console.error('Error fetching movie reviews:', error.message);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
}));


router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const movie = await getMovie(id);
        if (movie) {
            res.status(200).json(movie);
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie:', error.message);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
}));

router.get('/cast/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const cast = await getMovieCast(id);
        if (cast) {
            res.status(200).json(cast);
        } else {
            res.status(404).json({ error: 'Cast not found' });
        }
    } catch (error) {
        console.error('Error fetching movie cast:', error.message);
        res.status(500).json({ error: 'Failed to fetch cast' });
    }
}));

export default router;

