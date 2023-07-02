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
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);


  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  //new serach 4 movie
  const searchMovie = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredMovies([]);
    } else {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };
  // use effect hooks:
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (!user || !token && storedToken && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  })

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



return (
  <BrowserRouter>
    <NavigationView
      user={user}
      onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}
    />
    <Routes>
      <Route
        path="/signup"
        element={
          <>
            {user ? (
              <Navigate to="/" />
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
              <Navigate to="/" />
            ) : (
              <Col md={5}>
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
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
            <ProfileView
              user={user}
              token={token}
              movies={movies}
              onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
              updateUser={updateUser}
            />
          )
        }
      />
      <Route
        path="/"
        element={
          <>
            {!user ? (
              <Navigate to="/login" replace />
            ) : (
              <>
                <Row>
                  <Col
                    className="d-flex justify-content-center"
                    style={{
                      marginTop: 30,
                      marginBottom: 20,
                      border: "2px solid orange",
                      borderRadius: "10px"
                    }}
                  >
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="&#x2665; search for a movie"
                      value={searchQuery}
                      onChange={searchMovie}
                    />
                  </Col>
                </Row>
                <Row>
                  {filteredMovies.length === 0 ? (
                    <Col>sry! that movie isn't listed</Col>
                  ) : (
                    filteredMovies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={movie.id}
                        sm={12}
                        md={6}
                        lg={4}
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          updateUser={updateUser}
                        />
                      </Col>
                    ))
                  )}
                </Row>
                <br></br>
                <br></br>
                <h2>all movies</h2>
                <Row>
                  {movies.length === 0 ? (
                    <Col md={12}>The list is empty.</Col>
                  ) : (
                    movies.map((movie) => (
                      <Col xs={12} md={6} lg={3} key={movie.id}>
                        <MovieCard
                          movie={movie}
                          user={user}
                          updateUser={updateUser}
                        />
                      </Col>
                    ))
                  )}
                </Row>
                <Container className="d-flex justify-content-end">
                  <Button
                    className="button"
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
);
      };
