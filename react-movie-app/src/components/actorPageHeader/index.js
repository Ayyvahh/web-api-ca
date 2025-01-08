import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const ActorHeader = ({actor}) => {
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                padding: 1.5,
                marginTop: 1,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                <ArrowBackIcon color="primary" fontSize="large"/>
            </IconButton>

            <Typography
                variant="h4"
                component="h3"
                sx={{
                    fontWeight: "600",
                    flexGrow: 1,
                    textAlign: "center",
                    fontSize: {xs: "1.5rem", sm: "2rem", md: "2.5rem"},
                }}
            >
                {actor?.name || "Actor Name Not Available"}
            </Typography>

            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
                <ArrowForwardIcon color="primary" fontSize="large"/>
            </IconButton>
        </Paper>
    );
};

export default ActorHeader;
