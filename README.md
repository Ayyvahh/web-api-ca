# Assignment 2 - Web API

## Name: Ava Neary

## Features

- **All Requests Integrated**:  
  All requests from the React frontend are routed through the custom API instead of calling TMDB directly.

- **MongoDB Collections**:  
  Includes **Users**, **favouriteMovies**, **favouriteActors**, and **mustWatch** collections for storing user accounts and personalized data.

- **User-Specific Data**:  
  Favorites and must-watch items are tied to individual user accounts, ensuring each user’s lists are preserved when they log out and back in.

- **Sign Up & Log In with Notifications**:  
  Uses a snackbar to alert users about successful logins, signups, or errors.

- **Protected Routes**:  
  Certain pages require users to be logged in.

## Setup Requirements

1. **Clone** the repository and run `npm install` in both the **movies-api** and **react-movies** folders to install dependencies.
2. In **react-movies**, run `npm start` to launch the frontend.
3. In **movies-api**, run `npm start dev` to launch backend.

---
## API Config
```dotenv
NODEENV=development
PORT=8080
HOST=localhost
MONGO_DB=YOUR_MONGO_URL
TMDB_KEY=YOUR_TMDB_KEY
SECRET=YOUR_JWT_SECRET
```
2. **Add /react-movies-app/.env**:

```dotenv
REACT_APP_TMDB_KEY=YOUR_TMDB_KEY
FAST_REFRESH=false
```


---

## API Design


### Actors

- **GET** `/api/actors`  
  Returns all actors from TMDB.
- **GET** `/api/actors/{id}`  
  Returns a specific actor by **ID**.
- **GET** `/api/actors/images/{id}`  
  Returns images for a specified actor.
- **GET** `/api/actors/roles/{id}`  
  Returns roles for a specified actor.

### Favourites

- **GET** `/api/favourites/movies`  
  Returns **all** favourited movies (for all users).
- **GET** `/api/favourites/actors`  
  Returns **all** favourited actors (for all users).
- **GET** `/api/favourites/movies/{id}`  
  Returns favourited movies for a **specific** user (by **userID**).
- **PUT** `/api/favourites/movies/{id}`  
  Adds or removes movies from a user’s favourites.
- **GET** `/api/favourites/actors/{id}`  
  Returns favourited actors for a **specific** user (by **userID**).
- **PUT** `/api/favourites/actors/{id}`  
  Adds or removes actors from a user’s favourites.

### Genres

- **GET** `/api/genres`  
  Returns genres from the TMDB discover page.

### Movies

- **GET** `/api/movies`  
  Returns movies from the TMDB discover page.
- **GET** `/api/movies/upcoming`  
  Returns upcoming movies from TMDB.
- **GET** `/api/movies/nowShowing`  
  Returns now-playing movies from TMDB.
- **GET** `/api/movies/{id}`  
  Returns a movie by **ID**.
- **GET** `/api/movies/images/{id}`  
  Returns images for a specified movie.
- **GET** `/api/movies/reviews/{id}`  
  Returns reviews for a specified movie.
- **GET** `/api/movies/cast/{id}`  
  Returns cast for a specified movie.

### Must Watch

- **GET** `/api/mustwatch`  
  Returns **all** must-watch movies (across all users).
- **GET** `/api/mustwatch/{id}`  
  Returns must-watch movies for a **specific** user (by **userID**).
- **PUT** `/api/mustwatch/{id}`  
  Adds or removes movies from a user’s must-watch list.

### Users

- **GET** `/api/users`  
  Returns a list of **all** registered users.
- **POST** `/api/users`  
  Registers **or** authenticates a user (depending on request body parameters).
- **PUT** `/api/users/{id}`  
  Updates a user’s details by **ID** (e.g., password).



---

## Security & Authentication

- **User Registration & Login**:  
  Added input validation and requirements for unique usernames and strong passwords.
  
- **Hashed & Salted Passwords**:  
  Passwords are securely stored in MongoDB after salting and hashing, ensuring user credentials remain private.

- **JWT Tokens**:  
  Users receive a token upon successful authentication. Protected routes check for a valid token before granting access.

---

## Integrating with the React App

- **Data Fetching**:  
  The React frontend relies entirely on the backend API for fetching and updating data, avoiding any direct calls to TMDB.

- **Loading From Mongo**:  
  More lists of data are pre-loaded to mongo on initialisation.

- **User-Specific Collections**:  
  MongoDB includes dedicated collections for each user's favorites and must-watch lists:
    - `favouriteMovies`
    - `favouriteActors`
    - `mustWatch`

---


