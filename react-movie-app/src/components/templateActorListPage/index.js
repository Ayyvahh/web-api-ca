import React, {useState} from "react";
import Header from "../headerMovieList";
import ActorList from "../actorList";
import FilterCard from "../filterActorsCard";
import Grid from "@mui/material/Grid2";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";

function ActorListPageTemplate({actors, title, action}) {
    const [nameFilter, setNameFilter] = useState("");
    const [genderFilter, setGenderFilter] = useState("0");
    const [sortFilter, setSortFilter] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);

    let displayedActors = actors
        .filter((actor) => {
            return actor.name.toLowerCase().includes(nameFilter.toLowerCase());
        }).filter((actor) => {
            if (genderFilter === "0") return true;
            return actor.gender === parseInt(genderFilter);
        }).sort((a, b) => {
            if (sortFilter === "popularity-asc") {
                return a.popularity - b.popularity;
            } else if (sortFilter === "popularity-desc") {
                return b.popularity - a.popularity;
            } else {
                return 0;
            }
        });



    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        if (type === "gender") setGenderFilter(value);
        if (type === "sort") setSortFilter(value);
    };

    return (
        <>
            <Grid container>
                <Grid size={12} sx={{marginTop: "17px"}}>
                    <Header title={title}/>
                </Grid>
                <Grid container item spacing={3} sx={{flex: "1 1 500px", padding: "30px"}}>
                    <ActorList action={action} actors={displayedActors}/>
                </Grid>
            </Grid>
            <Fab
                color="primary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    marginTop: 11,
                    position: "fixed",
                    top: 2,
                    right: 10,
                }}
            >
                Filter Actors
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={handleChange}
                    titleFilter={nameFilter}
                    genderFilter={genderFilter}
                    sortFilter={sortFilter}
                />
            </Drawer>
        </>
    );
}

export default ActorListPageTemplate;
