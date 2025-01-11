import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ActorsContext} from "../../contexts/actorsContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {updateFavouriteActors} from "../../api/tmdb-api";

const RemoveFromFavoritesIcon = ({actor}) => {
    const context = useContext(ActorsContext);
    const {isAuthenticated} = useContext(AuthContext);
    const {navigate} = useNavigate();

    const handleRemoveFromFavorites = async (e) => {
        e.preventDefault();

        if (isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            let updatedFavorites;

            if (isFavorite) {

                context.removeFromFavorites(actor);
                updatedFavorites = context.favorites.filter(id => id !== actor.id);
            } else {
                addToFavorites(actor);
                updatedFavorites = [...context.favorites, actor.id];
            }

            await updateFavouriteActors(authContext.userName, updatedFavorites);

        } catch (error) {
            console.error("Failed to update favorites:", error);
        }
    };

    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFavorites}
        >
            <DeleteIcon color="primary" fontSize="large"/>
        </IconButton>
    );
};

export default RemoveFromFavoritesIcon;