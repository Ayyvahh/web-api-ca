import React, {useState} from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import NavigationIcon from "@mui/icons-material/Navigation";
import {getMovieImages} from "../../api/tmdb-api";
import {useQuery} from "react-query";
import Spinner from "../spinner";
import MovieReviews from "../movieReviews";

const TemplateMoviePage = ({ movie, children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {data, error, isLoading, isError} = useQuery(
        ["images", { id: movie.id }],
        getMovieImages
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const images = data.posters;

    return (
        <>
            <MovieHeader movie={movie} />

            <Grid container spacing={5} style={{padding: "15px"}}>
                <Grid item xs={3}>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-around",
                        }}
                    >
                        <ImageList
                            sx={{
                                height: "100vh",
                                width: "90%",
                            }}
                            cols={1}
                        >
                            {images.map((image) => (
                                <ImageListItem key={image.file_path}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={`Poster for ${movie.title}`}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>

                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>

            <Fab
                color="primary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "1em",
                    right: "1em",
                }}
            >
                <NavigationIcon sx={{mr: 1}}/>
                Reviews
            </Fab>

            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews movie={movie}/>
            </Drawer>
        </>
    );
};

export default TemplateMoviePage;
