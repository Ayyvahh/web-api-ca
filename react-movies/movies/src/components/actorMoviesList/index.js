import React from "react";
import Grid from "@mui/material/Grid2";
import ActorMovieCard from "../actorMovieCard";

const ActorMovieList = ({movies}) => {
    return (
        <Grid container spacing={3} sx={{padding: '2px'}}>
            {movies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={2.4}>
                    <ActorMovieCard movie={movie}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default ActorMovieList;
