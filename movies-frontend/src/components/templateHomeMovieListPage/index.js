import React, {useState} from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import Drawer from "@mui/material/Drawer";
import Fab from "@mui/material/Fab";

function MovieListPageTemplate({movies, title, action}) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortFilter, setSortFilter] = useState("");
    const genreId = Number(genreFilter);
    const [drawerOpen, setDrawerOpen] = useState(false);


    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        })
        .sort((a, b) => {
            if (sortFilter === "popularity-asc") {
                return a.popularity - b.popularity;
            } else if (sortFilter === "popularity-desc") {
                return b.popularity - a.popularity;
            } else if (sortFilter === "rating-asc") {
                return a.vote_average - b.vote_average;
            } else if (sortFilter === "rating-desc") {
                return b.vote_average - a.vote_average;
            } else {
                return 0;
            }
        });


    const handleChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else if (type === "genre") setGenreFilter(value);
        else if (type === "sort") setSortFilter(value);
    };


    return (
        <>
            <Grid container>
                <Grid size={12} sx={{marginTop: '17px'}}>
                    <Header title={title}/>
                </Grid>
                <Grid container item spacing={3} sx={{flex: "1 1 500px", padding: "30px"}}>
                    <MovieList action={action} movies={displayedMovies}></MovieList>
                </Grid>
            </Grid>
            <Fab
                color="primary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    marginTop: 11, position: "fixed", top: 2, right: 10,
                }}
            >
                Filter Movies
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={handleChange}
                    titleFilter={nameFilter}
                    genreFilter={genreFilter}
                    sortFilter={sortFilter}
                />
            </Drawer>
        </>
    );
}

export default MovieListPageTemplate;