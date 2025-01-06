import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid2";

const ActorList = (props) => {
    let actorCards = props.actors.map((actor) => (
        <Grid container spacing={2} sx={{padding: "2px"}}>
            <Grid item key={actor.id} xs={12} sm={6} md={2.4}>
                <ActorCard key={actor.id} actor={actor}/>
            </Grid>
        </Grid>
    ));
    return actorCards;
};

export default ActorList;
