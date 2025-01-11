export const getMovies = async (page = 1, genre = "") => {
    try {
        const url = `http://localhost:8080/api/movies?page=${page}&genre=${genre}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch movies");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};



export const getUpcomingMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `http://localhost:8080/api/movies/upcoming?page=${page}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to fetch upcoming movies");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        throw error;
    }
};




export const getMovie = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/movies/${id}`
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


export const getGenres = () => {
    return fetch(
        "http://localhost:8080/api/movies/genres"
    ).then( (response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `http://localhost:8080/api/movies/images/${id}`
    ).then( (response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
        `http://localhost:8080/api/movies/reviews/${id}`
    ).then( (response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getNowShowingMovies = (page = 1) => {
    return fetch(
    `http://localhost:8080/api/movies/nowShowing?page=${page}
    `).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => {
                throw new Error(error.status_message || "Something went wrong");
            });
        }
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};


export const getMovieCast = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const url = `http://localhost:8080/api/movies/cast/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || "Something went wrong");
        }

        return data.cast || [];
    } catch (error) {
        console.error("Error fetching recommended react-movie-app:", error);
        throw error;
    }
};


export const getRecommendedMovies = async ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    const url = `http://localhost:8080/api/movies/recommended/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || "Something went wrong");
        }

        // Sort the results by popularity and return the top 10
        return data.results || [];
    } catch (error) {
        console.error("Error fetching recommended react-movie-app:", error);
        throw error;
    }
};







export const getActors = (page = 1) => {
    return fetch(
        `http://localhost:8080/api/actors?page=${page}`
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

export const getActor = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/actors/${id}`
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

export const getActorImages = ({queryKey}) => {
    const [, idPart] = queryKey;
    const {id} = idPart;
    return fetch(
        `http://localhost:8080/api/actors/images/${id}`
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

export const getActorMovieRoles = (args) => {
    const [, {id}] = args.queryKey;
    return fetch(
        `http://localhost:8080/api/actors/roles/${id}`
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

export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const signup = async (username, password) => {
    const response = await fetch('http://localhost:8080/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    });
    return response.json();
};

export const getFavouriteActors = async (user) => {
    try {
        const response = await fetch(`http://localhost:8080/api/favourites/actors/${user}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch favorite actors.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching favorite actors:", error);
        return [];
    }
};

export const getFavouriteMovies = async (user) => {
    try {
        const response = await fetch(`http://localhost:8080/api/favourites/movies/${user}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch favorite movies.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching favorite movies:", error);
        return [];
    }
};

export const getMustWatchMovies = async (user) => {
    try {
        const response = await fetch(`http://localhost:8080/api/mustwatch/${user}`, {
            headers: {
                'Authorization': window.localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch must-watch movies.");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching must-watch movies:", error);
        return [];
    }
};


export const updateFavouriteMovies = async (user, ids) => {
    const response = await fetch(
        `http://localhost:8080/api/favourites/movies/${user}`,{
            headers: {
                'Authorization': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({ movie_ids: ids })
        }
    );
    return response.json();
}

export const updateFavouriteActors = async (user, ids) => {
    const response = await fetch(
        `http://localhost:8080/api/favourites/actors/${user}`,{
            headers: {
                'Authorization': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({ actor_ids: ids })
        }
    );
    return response.json();
}

export const updateMustWatchMovies = async (user, ids) => {
    const response = await fetch(
        `http://localhost:8080/api/mustwatch/${user}`,{
            headers: {
                'Authorization': window.localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify({ movie_ids: ids })
        }
    );
    return response.json();
}