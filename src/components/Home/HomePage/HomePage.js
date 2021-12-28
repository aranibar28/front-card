import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Image, Button, Icon } from "semantic-ui-react";
import banner from "../../../assets/banner-center.png";
import "./HomePage.scss";

export function HomePage() {
  const services = [
    {
      icon: "motorcycle",
      title: "Fasted Delivered",
      text: "Promesa de entrega en 30 minutos",
    },
    {
      icon: "shopping bag",
      title: "Pick up",
      text: "Recogida en la puerta de su casa",
    },
    {
      icon: "utensils",
      title: "Dane in",
      text: "Disfruta de tu comida fresca y caliente",
    },
  ];

  return (
    <Container>
      <Grid columns={3} stackable className="grid-container ">
        <Grid.Column className="animate__animated animate__zoomIn">
          <h1>
            <b>Facilidad</b> de pedido y <b>rapidez</b> en entrega
          </h1>
          <p>
            Si le da pereza llamar al mesero <br />
            con un click te hacemos caso!
          </p>
          <Button primary as={Link} to="./client">
            Ver Carta
          </Button>
        </Grid.Column>
        <Grid.Column className="animate__animated animate__rotateIn">
          <Image fluid src={banner} />
        </Grid.Column>
        <Grid.Column>
          {services.map((item, i) => {
            return (
              <div className="items animate__animated animate__flipInX" key={i}>
                <div>
                  <Icon name={item.icon} />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            );
          })}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
