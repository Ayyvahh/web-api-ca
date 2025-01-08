import React, {useState} from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Spinner from "../spinner";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {getActor, getActorMovieRoles} from "../../api/tmdb-api";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import WorkIcon from "@mui/icons-material/Work";
import Grid from "@mui/material/Grid2";
import ActorMoviesList from "../actorMoviesList";
import Divider from "@mui/material/Divider";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const chip = {margin: 0.5};

const ActorDetails = () => {
    const {id} = useParams();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const {data: actor, error: actorError, isLoading: isActorLoading} = useQuery(
        ["actor", {id}],
        () => getActor(id)
    );

    const {data: movies, isLoading: isMoviesLoading, error: movieError} = useQuery(
        ["movies", {id: actor?.id}],
        getActorMovieRoles,
    );

    if (isActorLoading || isMoviesLoading) {
        return <Spinner/>;
    }

    if (actorError || movieError) {
        return <h1>Error: {actorError?.message || movieError?.message}</h1>;
    }

    const toggleBiography = () => {
        setIsCollapsed((prev) => !prev);
    };

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
                Biography
            </Typography>
            <Collapse in={!isCollapsed} collapsedSize={120}>
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
                    {actor.biography || "No biography available."}
                </Typography>
            </Collapse>
            <Button
                onClick={toggleBiography}
                fontSize="small"
                sx={{
                    marginTop: "10px",
                    marginLeft: "10px",
                    alignSelf: "center",
                }}
                variant="contained"
                color="primary"
            >
                {isCollapsed ? "Show More" : "Show Less"}
            </Button>


            <Paper component="ul" sx={{...root, marginTop: 5}}>
                <Chip icon={<WorkIcon/>} label={`Known For: ${actor.known_for_department}`} sx={{...chip}}/>
                <Chip icon={<TrendingUpIcon/>} label={`Popularity: ${actor.popularity}`} sx={{...chip}}/>
                {actor.birthday && (
                    <Chip icon={<CalendarTodayIcon/>} label={`Birthday: ${actor.birthday}`} sx={{...chip}}/>
                )}
                {actor.place_of_birth && (
                    <Chip icon={<LocationOnIcon/>} label={`Born in: ${actor.place_of_birth}`} sx={{...chip}}/>
                )}
            </Paper>
            <Divider sx={{margin: "20px 0"}}/>

            <Typography
                variant="h6"
                component="h4"
                sx={{
                    marginTop: "20px",
                    fontSize: {xs: "1.1rem", sm: "1.2rem", md: "1.4rem"},
                    fontWeight: "bold",
                    fontStyle: "italic",
                    marginBottom: "15px",
                }}
            >
                <TheaterComedyIcon fontSize={'medium'} color={'primary'} sx={{marginRight: "8px"}}/>

                Top 10 Movie Roles
            </Typography>
            <Grid container item spacing={3} sx={{flex: "1 1 500px", padding: "5px"}}>
                <ActorMoviesList movies={movies?.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 10) || []}/>
            </Grid>
        </>
    );
};

export default ActorDetails;
