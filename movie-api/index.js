import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import usersRouter from './api/users/index.js';
import './db/index.js';
import defaultErrHandler from './errHandler/index.js'
import moviesRouter from './api/movies/index.js';
import actorsRouter from './api/actors/index.js';
import authenticate from "./authenticate";
import favActorRouter from './api/favourites/actors/index.js';
import favMovieRouter from './api/favourites/movies/index.js';
import mustWatchRouter from './api/mustWatch/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/favourites/actors', authenticate, favActorRouter);
app.use('/api/favourites/movies', authenticate, favMovieRouter);
app.use('/api/mustWatch', authenticate, mustWatchRouter);

app.use(defaultErrHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});