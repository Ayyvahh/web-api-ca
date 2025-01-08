import React, {useState} from "react";

export const ActorsContext = React.createContext(null);

const ActorsContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])

    const addToFavorites = (actor) => {
        let newFavorites = [];
        if (!favorites.includes(actor.id)) {
            newFavorites = [...favorites, actor.id];
        } else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };

    const removeFromFavorites = (actor) => {
        setFavorites(favorites.filter(
            (mId) => mId !== actor.id
        ))
    };

    return (
        <ActorsContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,


            }}
        >
            {props.children}
        </ActorsContext.Provider>
    );
};

export default ActorsContextProvider;