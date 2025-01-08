import React, {useState} from "react";
import {useQuery} from "react-query";
import {getActors} from "../api/tmdb-api";
import ActorListPageTemplate from "../components/templateActorListPage";
import Spinner from "../components/spinner";
import {Pagination} from "@mui/material";
import AddToFavoritesIcon from "../components/cardIcons/addToFavouriteActors";

const ActorListPage = () => {
    const [currPage, setCurrPage] = useState(1);
    const {data, error, isLoading, isError} = useQuery(['actors', currPage], () => getActors(currPage));

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const actors = data.results;
    const totalPages = data.total_pages;

    const handlePageChange = (event, value) => {
        setCurrPage(value);
        window.scroll(0, 0);
    };

    return (
        <>
            <ActorListPageTemplate
                title="Popular Actors"
                actors={actors}
                action={(actor) => (
                    <>
                        <AddToFavoritesIcon actor={actor}/>
                    </>
                )}
            />
            <Pagination
                style={{marginBottom: '25vh', display: 'flex', justifyContent: 'center'}}
                count={totalPages}
                color="primary"
                onChange={handlePageChange}
                page={currPage}
                size="large"
            />
        </>
    );
};

export default ActorListPage;