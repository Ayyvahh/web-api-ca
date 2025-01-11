import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import {Avatar} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {updateFavouriteMovies, updateMustWatchMovies} from "../../api/tmdb-api";

const AddToMustWatch = ({ movie }) => {
    const context = useContext(MoviesContext);
    const { isAuthenticated, userName } = useContext(AuthContext);
    const navigate = useNavigate();

    const isMustWatch = context.mustWatch.find((id) => id === movie.id);

    const handleMustWatch = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            let updatedFavorites;

            if (isMustWatch) {

                context.removeFromMustWatchList(movie);
                updatedFavorites = context.mustWatch.filter(id => id !== movie.id);
            } else {
                context.addToMustWatchList(movie);
                updatedFavorites = [...context.mustWatch, movie.id];
            }

            await updateMustWatchMovies(userName, updatedFavorites);

        } catch (error) {
            console.error("Failed to update favorites:", error);
        }
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleMustWatch}>
            {isMustWatch ? (
                <Avatar sx={{ backgroundColor: '#FF3131' }}>
                    <PlaylistIcon />
                </Avatar>
            ) : (
                <PlaylistIcon color="primary" fontSize="large" sx={{color: '#FF3131'}} />
            )}
        </IconButton>
    );
};



export default AddToMustWatch;