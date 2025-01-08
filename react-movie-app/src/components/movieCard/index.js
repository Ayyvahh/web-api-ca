import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import EventIcon from "@mui/icons-material/Event";
import Grid from "@mui/material/Grid2";
import img from '../../images/film-poster-placeholder.png';
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
    minHeight: 360,
    width: '100%',
    backgroundColor: '#202020',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',


    },
});

const StyledCardMedia = styled(CardMedia)({
    height: 360,
    objectFit: 'contain',
    display: 'block',
    '&:hover': {
        opacity: '0.8',
    }

})



export default function MovieCard({ movie, action }) {
    const { favorites, mustWatches } = useContext(MoviesContext);

    if (favorites.find((id) => id === movie.id)) {
        movie.favorite = true;
    } else {
        movie.favorite = false;
    }


    if (mustWatches.find((id) => id === movie.id)) {
        movie.mustWatch = true;
    } else {
        movie.mustWatch = false;
    }

    const releaseDate = movie.release_date ? new Date(movie.release_date) : null;
    const formattedReleaseDate = releaseDate ? releaseDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    }) : 'N/A';



    return (
            <StyledCard>
                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                <StyledCardMedia

                    image={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : img
                    }
                />
                </Link>

                <CardContent sx={{ paddingBottom: 2 }}>
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            alignItems: 'flex-start',
                            paddingTop: 1,
                        }}
                    >
                        <Grid item xs={12} sx={{ width: '100%', marginBottom: 1 }}>
                            <Typography
                                variant="h5"
                                component="p"
                                sx={{
                                    fontWeight: 600,
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    paddingLeft: '5px',
                                    paddingRight: '5px',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '100%',
                                }}
                            >
                                {movie.title}
                            </Typography>
                            <Typography
                                variant="h5"
                                component="p"
                                sx={{
                                    color: 'grey',
                                    fontSize: '1rem',
                                    paddingLeft: '5px',
                                    paddingRight: '5px',
                                    paddingTop: '2px',

                                }}
                            >
                                Movie
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: 1,
                                width: '100%',
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 500,
                                    marginRight: 2,
                                }}
                            >
                                <StarRateIcon fontSize="small" sx={{ marginRight: 0.5, color: '#FF3131'}} />
                                {movie.vote_average.toFixed(1)}
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 500,
                                }}
                            >
                                <EventIcon fontSize="small" sx={{ marginRight: 0.5 , color: '#FF3131'}} />
                                {formattedReleaseDate}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions disableSpacing sx={{ paddingTop: 0 }}>
                    {action(movie)}
                </CardActions>
            </StyledCard>
    );
}
