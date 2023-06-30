import React from "react";
import { PropTypes } from "prop-types";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useState } from "react";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bday, setBday] = useState("");
  let favMovies = movies.filter(movie => user.favMovies.includes(movie.id));


  // update user information

  const handleSubmit = (s) => {
    s.preventDefault();
    const data = {
      email,
      bday
    };

    fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("update failed");
        return false;
      }
    })
      .then(user => {
        if (user) {
          alert("update successful");
          updateUser(user);
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  //deleting user 
  const handleDeregister = () => {
    fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          alert("account successfully deleted");
          onLoggedOut();
        } else {
          alert("deregistration failed");
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  //deleting movie from favMovie array
  const handleUnlist = (movieID) => {
    fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}/favMovies/${movieID}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          console.log("movie successfully unlisted");
        } else {
          // Failed to unlist movie
          console.log("deleting movie failed");
        }
      })
      .catch(e => {
        console.error(e);
      });
  };


  return (
    <>
      <h2>welcome back to your account</h2>
      {/* display user data */}
      <Row>
        <Col xs={6} md={4}>
          <Card style={{ marginTop: 30 }}>
            <Card.Body>
              <Card.Title>hello {user.username}</Card.Title>
              <Card.Text>email: {user.email}</Card.Text>
              {/* formatting date according to browser's localsetting */}
              <Card.Text>birthday: {new Date(user.bday).toLocaleDateString()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

      {/* //UPDATE user data  */}

        <Col xs={6} md={8}>
          <Card style={{ marginTop: 30 }}>
            <Card.Body>
              <Card.Title>update your data</Card.Title>

              <Form onSubmit={handleSubmit}>
                {/* <Form.Group className="mb-3">

                <Form.Label>password:</Form.Label>

                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="new password"
                />
              </Form.Group> */}

                <Form.Group className="mb-3">

                  <Form.Label>email:</Form.Label>

                  <Form.Control
                    type="email"
                    value={email}
                    defaultValue={user.email}
                    onChange={(s) => setEmail(s.target.value)}
                    placeholder="new@email.com"
                    required
                  />

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>birthday:</Form.Label>

                  <Form.Control
                    type="date"
                    value={bday}
                    onChange={(s) => setBday(s.target.value)}
                    required
                  />

                  <Form.Text className="text-muted">
                    .. then you will get a surprise on your next bday
                  </Form.Text>

                </Form.Group>
                <Button className="button" type="submit">update</Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      { /* favMovies incl link more and unlike */}
      <Row >
        <Col >
          <Card style={{ marginTop: 30 }}>
            <Card.Body>
              <Card.Title>your favorite movies</Card.Title>
              <Card.Text>
                double click on the &#x2665; to delete movie from your favs
              </Card.Text>
              <Row>
              {favMovies.length > 0 ? (
                favMovies.map((movie) => (
 
                  <Col key={movie.id} xs={12} md={3} >
                  <div >
                    <MovieCard movie={movie} user={user} updateUser={updateUser} />
                  </div>
                  </Col>
                ))
              ) : (
                <Col>
                <p>up to now you have no favorite movies selected</p>
                </Col>
              )}

              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* delete user */}
      <Row>
        <Col xs={12} md={4}>
          <Card className="mb-3" style={{ marginTop: 30 }}>
            <Card.Body>
              <Card.Title>deregister here</Card.Title>
              <Button className="button-find" onClick={handleDeregister}>delete</Button>
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    bday: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};

