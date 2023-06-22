import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardGroup from 'react-bootstrap/CardGroup';

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = (s) => {
    s.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email
    };

    fetch("https://movieteka-zabokaa.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("signup successful");
        window.location.reload();
      } else {
        alert("signup failed");
      }
    });
  };

  ////////////

  return (
    <>
      <Container fluid="md">
        {/* <Row>
          <Col> */}
            <Card>
              <Card.Body>
                <Card.Title>SIGN UP! it's quick + easy </Card.Title>
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

                    <Form.Text></Form.Text>

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

                    <Form.Text></Form.Text>

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
                  <Button className="button-find" type="submit">sign up</Button>
                </Form>
              </Card.Body>
            </Card>

          {/* </Col>
        </Row> */}

      </Container>
    </>
  );
};
