import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignupView } from "../signup-view/signup-view";
import { NavigationView } from "../navigation-view/navigation-view";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  // movieid, title, description, directorid, genreid, imageurl, featured, year
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }
  // use effect hook:
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movieteka-zabokaa.herokuapp.com/movies",
      { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const moviesFromAPI = data.map((movie) => ({
            id: movie._id,
            image: movie.imagePath,
            title: movie.title,
            director: movie.director.name,
            byear: movie.director.birthyear,
            gender: movie.director.gender,
            bio: movie.director.bio,
            description: movie.description,
            genre: movie.genre.name,
            year: movie.year
          }));
          setMovies(moviesFromAPI);
        }
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
        movies={movies}  //array as a prop f movieView
      />
    );
  }

  return (
    <BrowserRouter>
      <NavigationView user={user} onLoggedOut={() => {
        setUser(null)
      }}
      />
      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to='/' />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to='/' />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={(user, token) => {
                    setUser(user); setToken(token);
                  }}
                  />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col>
                  <MovieView movies={movies} />
                </Col>
              )}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            !user ? (
              <Navigate to="/login" replace />
            ) : (
              <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }} updateUser={updateUser} />
            )
          }
        />
        <Route
          path='/'
          element={
            <>
              {!user ? (
                <Navigate to='/login' replace />
              ) : movies.length === 0 ? (
                <Col md={12}>the list is empty.</Col>
              ) : (
                <>
                  <Row>
                    {movies.map((movie) => (
                      <Col xs={12} md={6} lg={3} key={movie.id}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </Row>
                  <Container className='d-flex justify-content-end'>
                    <Button
                      className='button'
                      onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                    >
                      Logout
                    </Button>
                  </Container>
                </>
              )}
            </>

          }
        />
      </Routes>
    </BrowserRouter>
  )
};