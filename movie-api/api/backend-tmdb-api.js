import fetch from 'node-fetch';


export const getUpcomingMovies = async (page = 1) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // Get today's date
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}&primary_release_date.gte=${today}&sort_by=popularity.desc`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch upcoming movies from TMDB");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovies = async (page = 1, genre = "") => {
    try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}&include_adult=false&include_video=true`;

        if (genre && genre !== "0") {
            url += `&with_genres=${genre}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Failed to fetch movies from TMDB");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};


export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getNowShowingMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieImages = (id) => {

    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    ).then( (response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();

    })
        .catch((error) => {
            throw error
        });
};


export const getMovie = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || "Failed to fetch movie details");
        }

        return data;
    } catch (error) {
        console.error("Error in getMovie:", error.message);
        throw error;
    }
};

export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieCast = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.status_message || "Failed to fetch movie cast");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in getMovieCast:", error.message);
        throw error;
    }
};

export const getRecommendedMovies = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.status_message || "Failed to fetch recommended movies");
        }

        return await response.json();
    } catch (error) {
        console.error("Error in getRecommendedMovies:", error.message);
        throw error;
    }
};


export const getActors = (page = 1) => {
    return fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getActor = async (id) => {

    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getActorImages = async (id) => {

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.TMDB_KEY}`
        );
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getActorMovieRoles = async(id) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};