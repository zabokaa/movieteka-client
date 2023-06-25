import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import MovieCard from "./MovieCard";

const ProfileView = ({ user, onUpdateUser, onDeregister }) => {
  const handleUpdate = () => {
    // Implement the logic to update user information
  };

  const handleDeregister = () => {
    // Implement the logic to deregister the user
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.username}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Favorite Movies:</Card.Text>
          {user.favoriteMovies.length > 0 ? (
            user.favoriteMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p>No favorite movies selected.</p>
          )}
        </Card.Body>
      </Card>

      <h3>Update User Information</h3>
      <form onSubmit={handleUpdate}>
        <label>
          Username:
          <input type="text" value={user.username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={user.password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={user.email} onChange={handleEmailChange} />
        </label>
        <br />
        <Button type="submit">Update</Button>
      </form>

      <h3>Deregister</h3>
      <Button onClick={handleDeregister}>Deregister</Button>
    </div>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onDeregister: PropTypes.func.isRequired
};

