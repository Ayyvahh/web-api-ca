import React from "react";
import ActorCard from "../actorListCard";
import Grid from "@mui/material/Grid2";

const ActorList = (props) => {
    let actorCards = props.actors.map((actor) => (
        <Grid key={actor.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}}>
            <ActorCard key={actor.id} actor={actor} action={props.action}/>
        </Grid>
    ));
    return actorCards;
};

export default ActorList;
