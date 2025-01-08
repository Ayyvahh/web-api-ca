import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistIcon from "@mui/icons-material/PlaylistAdd";
import {Avatar} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToMustWatch = ({ movie }) => {
    const context = useContext(MoviesContext);

    const isMustWatch = context.mustWatch.find((id) => id === movie.id);

    const handleMustWatch = (e) => {
        e.preventDefault();
        if (isMustWatch) {
            context.removeFromMustWatchList(movie);
        } else {
            context.addToMustWatchList(movie);
        }
    }

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