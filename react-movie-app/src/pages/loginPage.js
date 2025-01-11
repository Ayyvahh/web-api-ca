import React, {useContext, useEffect, useState} from "react";
import {Navigate, useLocation, Link, useNavigate} from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import {MoviesContext} from "../contexts/moviesContext";
import {getFavouriteActors, getFavouriteMovies, getMustWatchMovies} from "../api/tmdb-api";
import {ActorsContext} from "../contexts/actorsContext";

const StyledCard = styled("div")({
    minHeight: "400px",
    width: "400px",
    borderRadius: "15px",
    backgroundColor: "#202020",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
});

const formControl = {
    margin: "10px 0",
    width: "100%",
    borderRadius: "12px",
};

const LoginPage = () => {
    const { authenticate, setToken, isAuthenticated, setUserName } = useContext(AuthContext);
    const movieContext = useContext(MoviesContext);
    const actorContext = useContext(ActorsContext);
    const [userName, setUserNameInput] = useState("");
    const [password, setPassword] = useState("");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
    const navigate = useNavigate();

    const handleSnackClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUserName("");
        console.log("Token cleared on login page");
    }, []);

    const handleLogin = async () => {
        try {
            await authenticate(userName, password);
            setSnackbar({
                open: true,
                message: "Login successful! Redirecting...",
                severity: "success",
            });

            setTimeout(() => {
                navigate("/", { replace: true });
            }, 1000);
            const ids = await getFavouriteMovies(userName);
            if (ids && ids.movie_ids && Array.isArray(ids.movie_ids)) {
                movieContext.loadMyMovies(ids.movie_ids);
            } else {
                console.error("Invalid favorite movies data:", ids);
            }

            // Fetch and load favorite actors (Had to implement multiple error checks to get it to work)
            const actorIds = await getFavouriteActors(userName);
            if (actorIds && actorIds.actor_ids && Array.isArray(actorIds.actor_ids)) {
                actorContext.loadMyActors(actorIds.actor_ids);
            } else {
                console.error("Invalid favorite actors data:", actorIds);
            }

            // Fetch and load must-watch movies (Had to implement multiple error checks to get it to work)
            const mustWatchIds = await getMustWatchMovies(userName);
            if (mustWatchIds && mustWatchIds.movie_ids && Array.isArray(mustWatchIds.movie_ids)) {
                movieContext.loadMyWatches(mustWatchIds.movie_ids);
            }else {
            console.error("Invalid must-watch movies data:", mustWatchIds);
            }
            } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || "Invalid username or password.",
                severity: "error",
            });
        }
    };


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    backgroundColor: "#121212",
                    backgroundImage: `url('https://wallpapercave.com/wp/wp10615910.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <StyledCard>
                    <Typography variant="h4" component="h2" style={{ color: "white", marginBottom: "20px" }}>
                        Log In
                    </Typography>
                    <TextField
                        sx={formControl}
                        label="Username"
                        variant="filled"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        sx={formControl}
                        label="Password"
                        type="password"
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginTop: "20px", width: "100%" }}
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                    <Typography variant="body2" style={{ color: "white", marginTop: "10px" }}>
                        Not Registered?{" "}
                        <Link to="/signup" style={{ color: "#FF3131", textDecoration: "none" }}>
                            Sign Up!
                        </Link>
                    </Typography>
                </StyledCard>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbar.severity}
                    onClose={handleSnackClose}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </>
    );
};

export default LoginPage;
