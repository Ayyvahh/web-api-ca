import React, {useContext} from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {ActorsContext} from "../../contexts/actorsContext";

const RemoveFromFavoritesIcon = ({actor}) => {
    const context = useContext(ActorsContext);

    const handleRemoveFromFavorites = (e) => {
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