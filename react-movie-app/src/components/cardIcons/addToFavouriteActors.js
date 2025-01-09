import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {ActorsContext} from "../../contexts/actorsContext";
import {Avatar} from "@mui/material";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const AddToFavoritesIcon = ({actor}) => {

    const {favorites, addToFavorites, removeFromFavorites} = useContext(ActorsContext);
    const { isAuthenticated } = useContext(AuthContext);
    const isFavorite = favorites.some((id) => id === actor.id);
    const navigate = useNavigate();

    const handleFavorites = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        if (isFavorite) {
            removeFromFavorites(actor);
        } else {
            addToFavorites(actor);
        }
    }


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
