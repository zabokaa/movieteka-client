import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export let MovieCard = ({ movie, user, updateUser }) => {
  let [isFavorite, setIsFavorite] = useState("");
  const [heartColor, setHeartColor] = useState("lavenderBlush");

  useEffect(() => {
    if (user && user.favMovies && user.favMovies.includes(movie.id)) {
    setIsFavorite(true);
    setHeartColor("orange")
    }
  }, [user, movie.id]);

  //heart icon
  const handleHeart = () => {
    if (heartColor === "lavenderBlush") {
      setHeartColor("orange");
      handleAddFav();
    } else if (heartColor === "orange") {
      setHeartColor("grey");
      handleUnlist();
    }
  };

  //adding movie to favMovies
  const handleAddFav = () => {
    const token = localStorage.getItem("token");

    if (!isFavorite) {
      fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}/favMovies/${movie.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ id: movie._id })
      })
        .then(response => {
          if (response.ok) {
            alert("movie added to favs");
          } else {
            alert("adding movie failed");
          }
          return response.json();
        })
        .then((data) => {
          setIsFavorite(true);
          updateUser(data);
          setHeartColor=("orange")
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  //deleting movie from favMovies
  const handleUnlist = () => {
    const token = localStorage.getItem("token");
    fetch(`https://movieteka-zabokaa.herokuapp.com/users/${user.username}/favMovies/${movie.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        if (response.ok) {
          alert("movie removed from favs");
        } else {
          alert("failed");
        }
        return response.json();
      })
      .then((data) => {
        setIsFavorite(true);
        updateUser(data);
        setHeartColor("grey")
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
        <Button className="button" onClick={handleHeart}>
          <FontAwesomeIcon icon={faHeart} color={heartColor} />
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