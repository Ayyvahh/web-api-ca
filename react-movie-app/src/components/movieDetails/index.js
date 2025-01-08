import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import Spinner from "../spinner";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getMovie, getMovieCast, getRecommendedMovies} from "../../api/tmdb-api";
import ActorList from "../movieActorList";
import Grid from "@mui/material/Grid2";
import ActorMoviesList from "../actorMoviesList";
import Divider from "@mui/material/Divider";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const chip = { margin: 0.5 };

const MovieDetails = () => {
    const {id} = useParams();

    const {data: movie, error: movieError, isLoading: isMovieLoading} = useQuery(
        ["movie", {id}],
        () => getMovie(id)
    );

    const {data: cast, error: castError, isLoading: isCastLoading} = useQuery(
        ["cast", id],
        () => getMovieCast(id)
    );

    const {data: recommendedMovies, error: recommendedError, isLoading: isRecommendedLoading} = useQuery(
        ["recommended", id],
        () => getRecommendedMovies(id)
    );

    if (isMovieLoading || isCastLoading || isRecommendedLoading) {
        return <Spinner/>;
    }

    if (movieError || castError) {
        return <h1>Error: {movieError?.message || castError?.message || recommendedError?.message}</h1>;
    }

    return (
        <>

            <Typography
                variant="h5"
                component="h3"
                sx={{
                    marginTop: "20px",
                    fontSize: {xs: "1rem", sm: "1.2rem", md: "1.5rem"},
                    fontWeight: "bold",
                    fontStyle: "italic",
                }}
            >
                Overview
            </Typography>

            <Typography
                variant="body1"
                component="p"
                sx={{
                    textAlign: "justify",
                    marginTop: "20px",
                    fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem"},
                    padding: "0 15px",
                }}
            >
                {movie.overview || "No overview available."}
            </Typography>

            <Paper component="ul" sx={{...root, marginTop: 5}}>
                <li>
                    <Chip label="Genres" sx={{...chip}} color="primary"/>
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{...chip}}/>
                    </li>
                ))}
            </Paper>

            <Paper component="ul" sx={{...root}}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count})`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>

            <Paper component="ul" sx={{...root}}>
                <li>
                    <Chip label="Production Countries" sx={{...chip}} color="primary"/>
                </li>
                {movie.production_countries.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{...chip}}/>
                    </li>
                ))}
            </Paper>

            <Divider sx={{margin: "20px 0"}}/>

            <Typography
                variant="h5"
                component="h3"
                sx={{
                    marginTop: "20px",
                    fontSize: {xs: "1.1rem", sm: "1.4rem", md: "1.5rem"},
                    fontWeight: "bold",
                    fontStyle: "italic",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <TheaterComedyIcon fontSize={'medium'} color={'primary'} sx={{marginRight: "8px"}}/>

                Top 10 Popular Cast Members starring in {movie.title}
            </Typography>

            <Grid container item spacing={3} sx={{flex: "1 1 500px", padding: "5px"}}>
                <ActorList actors={cast}/>
            </Grid>

            <Divider sx={{margin: "20px 0"}}/>

            <Typography
                variant="h5"
                component="h3"
                sx={{
                    marginTop: "20px",
                    fontSize: {xs: "1.1rem", sm: "1.4rem", md: "1.5rem"},
                    fontWeight: "bold",
                    fontStyle: "italic",
                    marginBottom: "15px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <MovieFilterIcon fontSize={'medium'} color={'primary'} sx={{marginRight: "8px"}}/>
                Top 10 Recommended Movies
            </Typography>

            <Grid container item spacing={3} sx={{flex: "1 1 500px", padding: "5px"}}>
                <ActorMoviesList movies={recommendedMovies}/>
            </Grid>
        </>
    );
};

export default MovieDetails;
