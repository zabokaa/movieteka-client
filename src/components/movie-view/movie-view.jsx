import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import {Link, useParams} from "react-router-dom";


export const MovieView = ({ movies}) => {
  const {movieId} = useParams();
  const movie= movies.find((f) => f.id === movieId);

  return (
    <Container fluid="md">
      <Row>
        <Col cs={12} md={6}> 
          <Card style={{ marginTop: 30 }}>
            <Card.Img src={movie.image} />
          </Card>
        </Col>

        <Col cs={12} md={6}>
          <Card style={{ marginTop: 30, border: "2px solid orange"}}>
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
              <Card.Text>{movie.description}</Card.Text>             
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


      <Container className="d-flex justify-content-end">

      <Link to="/">
        <Button className="button">home</Button>
      </Link>
      </Container>
      
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
  }).isRequired
};