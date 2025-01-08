import Header from "../headerMovieList";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";

function MovieListPageTemplate({movies, title, action}) {

    return (
        <>
            <Grid container>
                <Grid size={12} sx={{marginTop: '17px'}}>
                    <Header title={title}/>
                </Grid>
                <Grid container item spacing={3} sx={{flex: "1 1 500px", padding: "30px"}}>
                    <MovieList action={action} movies={movies}></MovieList>
                </Grid>
            </Grid>
        </>
    );
}

export default MovieListPageTemplate;