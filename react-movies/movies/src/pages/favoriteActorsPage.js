import React, {useContext} from "react";
import PageTemplate from "../components/templateActorListPage";
import {useQueries} from "react-query";
import {getActor} from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromFavorites from "../components/cardIcons/removeFromFavoriteActors";
import {ActorsContext} from "../contexts/actorsContext";


const FavoriteActorsPage = () => {
    const {favorites: actorIds} = useContext(ActorsContext);

    const favoriteActorQueries = useQueries(
        actorIds.map((actorId) => ({
            queryKey: ["actor", {id: actorId}],
            queryFn: getActor,
        }))
    );

    const isLoading = favoriteActorQueries.some((query) => query.isLoading);

    if (isLoading) {
        return <Spinner/>;
    }

    const actors = favoriteActorQueries.map((query) => query.data);


    return (
        <PageTemplate
            title="Favorite Actors"
            actors={actors}
            action={(actor) => {
                return (
                    <>
                        <RemoveFromFavorites actor={actor}/>
                    </>
                );
            }}
        />
    );
};
export default FavoriteActorsPage;
