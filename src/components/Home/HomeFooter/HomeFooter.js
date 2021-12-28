import React from "react";
import { Segment, Container, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./HomeFooter.scss";

export function HomeFooter() {
  return (
    <Segment inverted vertical className="home-footer">
      <Container textAlign="center">
        <List horizontal inverted divided link size="small">
          <List.Item as={Link} to={"/contact"}>
            Contáctanos
          </List.Item>
          <List.Item as={Link} to={"/location"}>
            Ubicación
          </List.Item>
          <List.Item as={Link} to={"/politics"}>
            Política de privacidad
          </List.Item>
          <List.Item as={Link} to={"/terms"}>
            Terminos y condiciones
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
}
