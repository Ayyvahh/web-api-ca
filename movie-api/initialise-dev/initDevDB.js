import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import users from './users.js';
import movies from './movies.js';
import User from '../api/users/userModel.js';
import Movie from '../api/movies/movieModel.js';
import FavMovie from '../api/favourites/movies/favMovieModel';
import FavActor from '../api/favourites/actors/favActorModel';
import MustWatchMovie from '../api/mustWatch/mustWatchModel';
import favActors from "./favouriteActors";
import favMovies from "./favouriteMovies";
import mustWatch from "./mustWatch";

async function main() {
    if (process.env.NODE_ENV !== 'development') {
        console.log('This script is only for the development environment.');
        return;
    }
    await mongoose.connect(process.env.MONGO_DB);
    // Drop collections
    await User.collection.drop().catch(err => console.log('User collection not found'));
    await Movie.collection.drop().catch(err => console.log('Movie collection not found'));
    await FavActor.collection.drop().catch(err => console.log('FavActors collection not found'));
    await FavMovie.collection.drop().catch(err => console.log('FavMovies collection not found'));
    await MustWatchMovie.collection.drop().catch(err => console.log('MustWatch collection not found'));

    await User.create(users);
    await Movie.create(movies);
    await FavActor.create(favActors);
    await FavMovie.create(favMovies);
    await MustWatchMovie.create(mustWatch);

    console.log('Database initialised');
    console.log(`${users.length} users loaded`);
    console.log(`${movies.length} movies loaded`)
    console.log(`${favActors.length} favourite actors loaded`)
    console.log(`${favMovies.length} favourite movies loaded`)
    console.log(`${mustWatch.length} must watch movies loaded`)
    ;
    await mongoose.disconnect();
}

main();
