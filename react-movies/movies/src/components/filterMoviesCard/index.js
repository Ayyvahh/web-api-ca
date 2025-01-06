import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {useQuery} from "react-query";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {getGenres} from "../../api/tmdb-api";

const StyledCard = styled("div")({
    minHeight: "100%", width: "100%", borderRadius: "15px", backgroundColor: "#202020", padding: "20px",
});

const formControl = {
    margin: 1, minWidth: 220, borderRadius: "12px", width: {xs: "100%", sm: "auto"},
};

export default function FilterMoviesCard(props) {
    const {data, error, isLoading, isError} = useQuery("genres", getGenres);

    if (isLoading) {
        return <Spinner/>;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const genres = data.genres;

    if (genres[0].name !== "All") {
        genres.unshift({id: "0", name: "All"});
    }

    const handleChange = (e, type, value) => {
        e.preventDefault();
        props.onUserInput(type, value);
    };

    const handleTextChange = (e) => {
        handleChange(e, "name", e.target.value);
    };

    const handleGenreChange = (e) => {
        handleChange(e, "genre", e.target.value);
    };


    return (
        <StyledCard>
            <CardContent>
                <Box sx={{display: "flex", alignItems: "center", marginBottom: 2}}>
                    <SearchIcon fontSize="large" color="primary"/>
                    <Typography variant="h5" component="h2" sx={{marginLeft: 1, color: "white"}}>
                        Search Movies
                    </Typography>
                </Box>

                <TextField
                    sx={formControl}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />

                <Box sx={{display: "flex", alignItems: "center", marginTop: 3}}>
                    <FilterAltIcon fontSize="large" color="primary"/>
                    <Typography variant="h5" component="h3" sx={{marginLeft: 1, color: "white"}}>
                        Filter By Genre
                    </Typography>
                </Box>

                <FormControl sx={formControl}>
                    <InputLabel id="genre-label">Genre</InputLabel>
                    <Select
                        labelId="genre-label"
                        id="genre-select"
                        value={props.genreFilter}
                        onChange={handleGenreChange}
                    >
                        {genres.map((genre) => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{display: "flex", alignItems: "center", marginTop: 3}}>
                    <SortIcon fontSize="large" color="primary"/>
                    <Typography variant="h5" component="h3" sx={{marginLeft: 1, color: "white"}}>
                        Sort Movies
                    </Typography>
                </Box>

                <FormControl sx={formControl}>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        id="sort-select"
                        value={props.sortFilter}
                        onChange={(e) => props.onUserInput("sort", e.target.value)}
                    >
                        <MenuItem value="0">No Sorting</MenuItem>
                        <MenuItem value="popularity-asc">Popularity (Asc)</MenuItem>
                        <MenuItem value="popularity-desc">Popularity (Desc)</MenuItem>
                        <MenuItem value="rating-asc">Rating (Asc)</MenuItem>
                        <MenuItem value="rating-desc">Rating (Desc)</MenuItem>
                    </Select>
                </FormControl>

            </CardContent>
        </StyledCard>
    );
}
