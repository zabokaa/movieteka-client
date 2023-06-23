import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";


export const MovieView = ({ movie, onBackClick, movies }) => {
  const [sameDirector, setSameDirector] = useState([]);
  const sameDirectorClick = () => {
    const moviesSameDirector = movies.filter(
      (m) => m.director === movie.director
    );
    setSameDirector(moviesSameDirector);
  };

  return (
    <Container fluid="md">
      <Row>
        <Col cs={12} md={6}> 
          <Card style={{ marginTop: 80 }}>
            <Card.Img src={movie.image} />
          </Card>
        </Col>

        <Col cs={12} md={6}>
          <Card style={{ marginTop: 80}}>
            <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
              <Row>
                <Col xs={6} md={4}>
                  <Card.Text>
                    {movie.genre}
                  </Card.Text>
                </Col>
                <Col xs={6} md={4}>
                <Card.Text>
                  {movie.year}
                </Card.Text>
              </Col>
              </Row>
              <br></br>
              <Card.Text>DESCRIPTION  {movie.description}</Card.Text>             
              <Card.Text>DIRECTOR {movie.director}</Card.Text>
              <Row>
              <Col xs={6} md={6}>
                  <Card.Text>
                  born in {movie.byear}
                  <br></br>
                  <br></br>
                  {movie.gender}
                  </Card.Text>
                </Col>
                <Col xs={6} md={6}>
                <Card.Text>
                  {movie.bio}
                </Card.Text>
                </Col>
                </Row>
            </Card.Body>
          </Card>
        </Col>

      </Row>



      <Button className="button-find" onClick={sameDirectorClick}>find movies</Button>
      {sameDirector.length > 0 && (
        <div>
          <h3>movies from same director:</h3>
          {sameDirector.map((movie) => (
            <div key={movie.id}>
              <span>{movie.title}</span>
            </div>
          ))}
        </div>
      )}
      <Button className="button" onClick={onBackClick}>Back</Button>
    </Container>
  );
};



MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};