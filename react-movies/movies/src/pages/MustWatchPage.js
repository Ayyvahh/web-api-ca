import React, {useContext} from "react";
import PageTemplate from "../components/templateMovieList";
import {MoviesContext} from "../contexts/moviesContext";
import {useQueries} from "react-query";
import {getMovie} from "../api/tmdb-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIcons/writeReview";


const MustWatchPage = () => {
    const {mustWatch: movieIds } = useContext(MoviesContext);

    const favoriteMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", { id: movieId }],
                queryFn: getMovie,
            };
        })
    );

    const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const movies = favoriteMovieQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    const toDo = () => true;

    return (
        <PageTemplate
            title="Must Watch List"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <WriteReview movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default MustWatchPage;