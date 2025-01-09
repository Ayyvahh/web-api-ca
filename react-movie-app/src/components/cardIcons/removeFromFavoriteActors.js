import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ActorsContext} from "../../contexts/actorsContext";
import {AuthContext} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";

const RemoveFromFavoritesIcon = ({actor}) => {
    const context = useContext(ActorsContext);
    const {isAuthenticated} = useContext(AuthContext);
    const {navigate} = useNavigate();

    const handleRemoveFromFavorites = (e) => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        e.preventDefault();
        context.removeFromFavorites(actor);
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