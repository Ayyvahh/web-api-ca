import React from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import ActorsContextProvider from "./contexts/actorsContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MustWatchPage from "./pages/MustWatchPage";
import NowShowingMovies from "./pages/nowShowingPage";
import ActorListPage from "./pages/actorListPage";
import ActorPage from "./pages/actorDetailsPage";
import AuthContextProvider from "./contexts/authContext";
import FavoriteActorsPage from "./pages/favoriteActorsPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import ProtectedRoutes from "./protectedRoutes";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            main: '#121010',
        },
        primary: {
            main: '#FF3131',
        },
        paper: {
            main: '#121010'
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <BrowserRouter>
                        <SiteHeader />
                        <MoviesContextProvider>
                            <ActorsContextProvider>
                                <Routes>
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/signup" element={<SignUpPage />} />
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="*" element={<Navigate to="/" />} />
                                    <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                                    <Route path="/movies/nowShowing" element={<NowShowingMovies />} />
                                    <Route path="/actors" element={<ActorListPage />} />
                                    <Route path="/actors/:id" element={<ActorPage />} />
                                    <Route path="/reviews/:id" element={<MovieReviewPage />} />
                                    <Route path="/movies/:id" element={<MoviePage />} />
                                    <Route element={<ProtectedRoutes />}>
                                        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                                        <Route path="/movies/mustWatch" element={<MustWatchPage />} />
                                        <Route path="/actors/favorites" element={<FavoriteActorsPage />} />
                                        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                                    </Route>
                                </Routes>
                            </ActorsContextProvider>
                        </MoviesContextProvider>
                    </BrowserRouter>
                </AuthContextProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);