import asyncHandler from 'express-async-handler';
import express from 'express';
import FavActor from './favActorModel';

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const favourites = await FavActor.findByUsername(id);
        if (favourites) {
            res.status(200).json(favourites);
        } else {
            res.status(404).json({ error: 'Favourite actors not found' });
        }
    } catch (error) {
        console.error('Error fetching favourite actors:', error.message);
        res.status(500).json({ error: 'Failed to fetch favourite actors' });
    }
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { actor_ids } = req.body;
    const updatedActors = await FavoriteActor.findOneAndUpdate({username: id}, {actor_ids}, {new: true, upsert: true});
    res.status(200).json(updatedActors);
}));

export default router;