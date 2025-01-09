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

