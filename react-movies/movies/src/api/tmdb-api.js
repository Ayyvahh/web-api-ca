const BASE_URL = "http://localhost:8080/api";

//Re-usable method for fetching data to keep code cleaner
const sendGetRequest = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    } catch (error) {
        console.error(`Error fetching data from: ${endpoint}`, error);
        throw error;
    }
};

export const getMovies = (page = 1, genre = "") => {
    return sendGetRequest(`/movies?page=${page}${genre && genre !== "0" ? `&genre=${genre}` : ""}`);
};

export const getUpcomingMovies = (page = 1) => {
    return sendGetRequest(`/movies/upcoming?page=${page}&sort_by=popularity.desc`);
};

export const getNowShowingMovies = (page = 1) => {
    return sendGetRequest(`/movies/nowplaying?page=${page}&sort_by=popularity.desc`);
};

export const getMovie = (id) => {
    return sendGetRequest(`/movies/${id}`);
};

export const getMovieImages = (id) => {
    return sendGetRequest(`/movies/${id}/images`);
};

export const getMovieReviews = (id) => {
    return sendGetRequest(`/movies/${id}/reviews`);
};

export const getMovieCast = async (id) => {
    const data = await sendGetRequest(`/movies/${id}/cast`);
    return data.cast?.sort((a, b) => b.popularity - a.popularity).slice(0, 10) || [];
};

export const getRecommendedMovies = async (id) => {
    const data = await sendGetRequest(`/movies/${id}/recommendations`);
    return data.results?.sort((a, b) => b.popularity - a.popularity).slice(0, 10) || [];
};

export const getGenres = () => {
    return sendGetRequest(`/genres`);
};

export const getActors = (page = 1) => {
    return sendGetRequest(`/actors?page=${page}&sort_by=popularity.desc`);
};

export const getActor = (id) => {
    return sendGetRequest(`/actors/${id}`);
};

export const getActorImages = (id) => {
    return sendGetRequest(`/actors/${id}/images`);
};

export const getActorMovieRoles = (id) => {
    return sendGetRequest(`/actors/${id}/roles`);
};

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username: username, password: password })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username: username, password: password })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
    }

    return response.json();
};