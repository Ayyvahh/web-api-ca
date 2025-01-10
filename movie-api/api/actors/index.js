import asyncHandler from 'express-async-handler';
import express from 'express';
import {getActor, getActorImages, getActorMovieRoles, getActors} from '../backend-tmdb-api.js';

const router = express.Router(); // eslint-disable-line


router.get('/', asyncHandler(async (req, res) => {
    const { page } = req.query;

    try {
        const actors = await getActors(page);
        res.status(200).json(actors);
    } catch (error) {
        console.error('Error fetching actors:', error.message);
        res.status(500).json({ error: 'Failed to fetch actors.' });
    }
}));

router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const actor = await getActor(id);
        if (actor)
            res.status(200).json(actor);
    } catch (error) {
        console.error('Error fetching movie actors:', error);
        res.status(500).json({ error: 'Failed to fetch movie actors' });
    }
}));

router.get('/roles/:id', asyncHandler(async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const actor = await getActorMovieRoles(id);
        if (actor)
            res.status(200).json(actor);
    } catch (error) {
        console.error('Error fetching movie roles:', error);
        res.status(500).json({ error: 'Failed to fetch movie roles' });
    }
}));

router.get('/images/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const images = await getActorImages(id);
        if (images) {
            res.status(200).json(images);
        } else {
            res.status(404).json({ error: 'Images not found' });
        }
    } catch (error) {
        console.error('Error fetching actor images:', error.message);
        res.status(500).json({ error: 'Failed to fetch images' });
    }
}));


export default router;