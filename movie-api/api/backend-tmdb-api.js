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
