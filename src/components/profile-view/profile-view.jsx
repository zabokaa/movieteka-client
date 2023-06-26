import React from "react";
import {PropTypes} from "prop-types";
import { Card, Button, Col, Form } from "react-bootstrap";
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
      username: username,
      password: password
    };
    fetch("https://movieteka-zabokaa.herokuapp.com/login", {
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
        alert(e);
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
        alert(e);
      });
  }

  return (
    <>
      <h2>User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>email: {user.email}</Card.Text>
          <Card.Text>bday: {user.bday}</Card.Text>
          <Card.Text>your favorite Movies:</Card.Text>
          {user.favMovies.length > 0 ? (
            user.favMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p>up to now you have no favorite movies selected</p>
          )}
        </Card.Body>
      </Card>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>update your data</Card.Title>
            <Form onSubmit={handleSubmit} >
              <Form.Group className="mb-3" controlId="formGroupUsername">

                <Form.Label>username:</Form.Label>

                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="5"
                  placeholder="username must have a minimum of 5 characters"
                />


              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">

                <Form.Label>password:</Form.Label>

                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="new password"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">

                <Form.Label>email:</Form.Label>

                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@movies.com"
                />

                <Form.Text></Form.Text>

              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">

<Form.Label>birthday:</Form.Label>

<Form.Control
  type="date"
  value={bday}
  onChange={(e) => setBday(e.target.value)}
  placeholder="if you want to share your day of birth .. "
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


      <Column>
        <Card>
          <Card.Title>deregister here</Card.Title>
          <Button className="button-find" onClick={handleDeregister}>delete</Button>
        </Card>
      </Column>
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

