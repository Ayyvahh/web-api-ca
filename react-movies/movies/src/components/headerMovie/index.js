import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import {useNavigate} from "react-router-dom";

const MovieHeader = (props) => {
    const movie = props.movie;
    const navigate = useNavigate();

    return (
        <Paper
            component="div"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                padding: 1.5,
                marginTop: 1,
            }}
        >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <div style={{textAlign: "center", flex: 1}}>
                <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                        fontWeight: "600",
                        fontSize: {xs: "1.5rem", sm: "2rem", md: "2.5rem"},
                    }}
                >
                    {movie.title}
                    <a
                        href={movie.homepage}
                        style={{textDecoration: "none", padding: "10px"}}
                    >
                        <HomeIcon color="primary" fontSize="large"/>
                    </a>
                </Typography>

                <Typography
                    variant="body"
                    sx={{
                        fontStyle: "italic",
                        paddingTop: "10px",
                    }}
                >
                    {movie.tagline}
                </Typography>
            </div>

            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default MovieHeader;
