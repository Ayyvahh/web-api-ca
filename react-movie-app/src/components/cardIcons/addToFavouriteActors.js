import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {ActorsContext} from "../../contexts/actorsContext";
import {Avatar} from "@mui/material";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {updateFavouriteActors} from "../../api/tmdb-api";

const AddToFavoritesIcon = ({actor}) => {

    const {favorites, addToFavorites, removeFromFavorites} = useContext(ActorsContext);
    const context = useContext(ActorsContext);
    const authContext= useContext(AuthContext);
    const navigate = useNavigate();

    const isFavorite = favorites.includes(actor.id);


    const handleFavorites = async (e) => {
        e.preventDefault();

        if (!authContext.isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            let updatedFavorites;

            if (isFavorite) {

                removeFromFavorites(actor);
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
        <IconButton aria-label="add to favorites" onClick={handleFavorites}>
            {isFavorite ? (
                <Avatar sx={{backgroundColor: '#FF3131'}}>
                    <FavoriteIcon/>
                </Avatar>
            ) : (
                <FavoriteIcon color="primary" fontSize="large" sx={{color: '#FF3131'}}/>
            )}
        </IconButton>
    );
};

export default AddToFavoritesIcon;
