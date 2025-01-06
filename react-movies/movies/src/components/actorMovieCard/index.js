import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import StarRateIcon from "@mui/icons-material/StarRate";
import img from "../../images/film-poster-placeholder.png";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";

const StyledCard = styled(Card)(({theme}) => ({
    width: 215,
    minHeight: 400,
    backgroundColor: "#202020",
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "scale(1.05)",
    },
    [theme.breakpoints.down("sm")]: {
        width: 180,
        minHeight: 360,
    },
}));

const StyledCardMedia = styled(CardMedia)({
    height: 280,
    objectFit: "contain",
    display: "block",
    "&:hover": {
        opacity: 0.8,
    },
});

export default function ActorMovieCard({movie}) {
    const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
    const formattedReleaseDate = releaseDate
        ? releaseDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
        })
        : "N/A";

    return (
        <StyledCard>
            <Link to={`/movies/${movie.id}`} style={{textDecoration: "none"}}>
                <StyledCardMedia
                    image={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : img
                    }
                    alt={movie.title}
                />
            </Link>
            <CardContent sx={{paddingBottom: 2}}>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        paddingTop: 1,
                        height: "100%",
                    }}
                >
                    <Grid item xs={12} sx={{marginBottom: 1}}>
                        <Typography
                            variant="h6"
                            component="p"
                            sx={{
                                fontWeight: 600,
                                color: "white",
                                fontSize: "1rem",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                            }}
                        >
                            {movie.title}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: "grey",
                                fontSize: "0.8rem",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                            }}
                        >
                            {formattedReleaseDate}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            marginTop: 1,
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                fontWeight: 500,
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                            }}
                        >
                            <StarRateIcon
                                fontSize="small"
                                sx={{marginRight: 0.5, color: "#FF3131"}}
                            />
                            Rating: {movie.vote_average.toFixed(1)}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </StyledCard>
    );
}
