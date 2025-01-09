import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {Avatar} from "@mui/material";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


    const isFavorite = context.favorites.find((id) => id === movie.id);

    const handleFavorites = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        if (isFavorite) {
            context.removeFromFavorites(movie);
        } else {
            context.addToFavorites(movie);
        }
    }

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