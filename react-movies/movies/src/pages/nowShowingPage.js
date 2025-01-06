import React, {useState} from "react";
import {getNowShowingMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateHomeMovieListPage';
import {useQuery} from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatch from "../components/cardIcons/addToMustWatch";
import {Pagination} from "@mui/material";

const NowShowingMovies = (props) => {
    const [currPage, setCurrPage] = useState(1);

    const {data, error, isLoading, isError} = useQuery(['now_playing', currPage], () => getNowShowingMovies(currPage))

    if (isLoading) {
        return <Spinner/>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }
    const movies = data.results;
    const totalPages = data.total_pages;
    const mustWatch = movies.filter(m => m.mustWatch)


    const handlePageChange = (event, value) => {
        setCurrPage(value);
    };


    localStorage.setItem('mustWatch', JSON.stringify(mustWatch))
    const addToMustWatch = (movieId) => true

    return (<>
        <PageTemplate
            title="Now In Cinemas"
            movies={movies}
            action={(movie) => {
                return <AddToMustWatch movie={movie}/>
            }}
        />

        <Pagination
            style={{marginBottom: '25vh', display: 'flex', justifyContent: 'center'}}
            count={totalPages}
            color="primary"
            onChange={handlePageChange}
            page={currPage}
            size="large"
        />
    </>);
};
export default NowShowingMovies;