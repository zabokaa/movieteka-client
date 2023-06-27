import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const MovieCard = ({ movie, user, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [username, setUsername] = useState("");
  const handleFavoriteToggle = () => {
    setIsFavorite(prevState => !prevState);

    if (!isFavorite) {
      fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}/favMovies/${movie.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ movieID: movie.id })
      })
        .then(response => {
          if (response.ok) {
            alert("movie added to favs");
          } else {
            alert("adding movie failed");
          }
        })
        .catch(e => {
          console.error(e);
        });
    } else {
      handleUnlist(movie.id);
    }
  };
  const handleUnlist = (movieID) => {

    fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}/favMovies/${movie.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          alert("removed");
        } else {
          alert("failed");
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <Container>

      <Card
        className="align-items-center"
        style={{ marginTop: 50 }}
      >
        <Card.Img
          variant="top"
          src={movie.image}
          style={{ width: "200px", height: "300px" }}
          rounded

        />
        <Card.Body >
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="align-items-center">{movie.year}</Card.Text>
        </Card.Body>
        <Button className="button" onClick={handleFavoriteToggle}>
          {isFavorite ? (<FontAwesomeIcon icon={faHeart} color="orange" />
  ) : (
    <FontAwesomeIcon icon={faHeart} color="LavenderBlush" />)}
        </Button>
        <Link to={`/movies/${movie.id}`}>
          <Button className="button-find">more..</Button>
        </Link>
      </Card>

    </Container>

  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  user: PropTypes.object.isRequired
};

// if create export default -> no need for {} at import 
// export default MovieCard;   