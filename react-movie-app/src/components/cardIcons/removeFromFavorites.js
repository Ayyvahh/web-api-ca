import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {MoviesContext} from "../../contexts/moviesContext";
import {useNavigate} from "react-router-dom";

const RemoveFromFavoritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);
    const {isAuthenticated} = context;
    const {navigate} = useNavigate();

    const handleRemoveFromFavorites = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        context.removeFromFavorites(movie);
    };
    return (
        <IconButton
            aria-label="remove from favorites"
            onClick={handleRemoveFromFavorites}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavoritesIcon;