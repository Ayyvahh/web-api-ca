import React from "react";
import MovieCard from "../movieCard";
import Grid from "@mui/material/Grid2";

const MovieList = (props) => {
    let movieCards = props.movies.map((m) => (
        <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}}>
            <MovieCard key={m.id} movie={m} action={props.action} />
        </Grid>
    ));
    return movieCards;
};

export default MovieList;