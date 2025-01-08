import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState( [] )
    const [mustWatches, setMustWatches] = useState( [] )

    const [myReviews, setMyReviews] = useState( {} )

    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)){
            newFavorites = [...favorites, movie.id];
        }
        else{
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const addToMustWatchList = (movie) => {
        let newMustWatchList = [];
        if (!mustWatches.includes(movie.id)){
            newMustWatchList = [...mustWatches, movie.id];
        }
        else{
            newMustWatchList = [...mustWatches];
        }
        setMustWatches(newMustWatchList)
    };

    const removeFromMustWatchList = (movie) => {
        setMustWatches( mustWatches.filter(
            (mId) => mId !== movie.id
        ) )
    };

    const addReview = (movie, review) => {
        setMyReviews( {...myReviews, [movie.id]: review } )
    };
    // We will use this function in the next step
    const removeFromFavorites = (movie) => {
        setFavorites( favorites.filter(
            (mId) => mId !== movie.id
        ) )
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                mustWatches,
                addToFavorites,
                removeFromFavorites,
                addReview,
                mustWatch: mustWatches,
                addToMustWatchList,
                removeFromMustWatchList

            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;