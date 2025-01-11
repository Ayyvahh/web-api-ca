import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Avatar} from "@mui/material";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {updateFavouriteMovies} from "../../api/tmdb-api";

const AddToFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const authContext= useContext(AuthContext);
    const navigate = useNavigate();


    const isFavorite = context.favorites.includes(movie.id);

    const handleFavorites = async (e) => {
        e.preventDefault();

        if (!authContext.isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            let updatedFavorites;

            if (isFavorite) {

                context.removeFromFavorites(movie);
                updatedFavorites = context.favorites.filter(id => id !== movie.id);
            } else {
                context.addToFavorites(movie);
                updatedFavorites = [...context.favorites, movie.id];
            }

            await updateFavouriteMovies(authContext.userName, updatedFavorites);

        } catch (error) {
            console.error("Failed to update favorites:", error);
        }
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleFavorites}>
            {isFavorite ? (
                <Avatar sx={{ backgroundColor: '#FF3131' }}>
                    <FavoriteIcon />
                </Avatar>
            ) : (
                <FavoriteIcon color="primary" fontSize="large" sx={{color: '#FF3131'}} />
            )}
        </IconButton>
    );
};

export default AddToFavoritesIcon;