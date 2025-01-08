import React, {useState} from "react";
import {getMovies} from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieList";
import {useQuery} from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToMustWatch from "../components/cardIcons/addToMustWatch";
import {Pagination} from "@mui/material";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import FilterCard from "../components/filterMoviesCard";

const HomePage = () => {
    const [currPage, setCurrPage] = useState(1);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortFilter, setSortFilter] = useState("");

    const genreId = Number(genreFilter);

    const {data, error, isLoading, isError} = useQuery(
        ["discover", currPage, genreId],
        () => getMovies(currPage, genreId)
    );

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data.results;

    const filteredMovies = movies
        .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
        .filter((m) => (genreId > 0 ? m.genre_ids.includes(genreId) : true));

    const sortedMovies = filteredMovies.sort((a, b) => {
        switch (sortFilter) {
            case "popularity-asc":
                return a.popularity - b.popularity;
            case "popularity-desc":
                return b.popularity - a.popularity;
            case "release_date-asc":
                return new Date(a.release_date) - new Date(b.release_date);
            case "release_date-desc":
                return new Date(b.release_date) - new Date(a.release_date);
            case "rating-asc":
                return a.vote_average - b.vote_average;
            case "rating-desc":
                return b.vote_average - a.vote_average;
            default:
                return 0;
        }
    });

    const handlePageChange = (event, value) => {
        setCurrPage(value);
        window.scroll(0, 0);
    };

    const handleFilterChange = (type, value) => {
        if (type === "name") setNameFilter(value);
        else if (type === "genre") setGenreFilter(value);
        else if (type === "sort") setSortFilter(value);
    };

    return (
        <>
            <PageTemplate
                title="Discover Movies"
                movies={sortedMovies}
                action={(movie) => (
                    <>
                        <AddToFavoritesIcon movie={movie}/>
                        <AddToMustWatch movie={movie}/>
                    </>
                )}
            />
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
                Filter Movies
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={handleFilterChange}
                    titleFilter={nameFilter}
                    genreFilter={genreFilter}
                    sortFilter={sortFilter}
                />
            </Drawer>
            <Pagination
                style={{marginBottom: "25vh", display: "flex", justifyContent: "center"}}
                count={500}
                color="primary"
                onChange={handlePageChange}
                page={currPage}
                size="large"
            />
        </>
    );
};

export default HomePage;
