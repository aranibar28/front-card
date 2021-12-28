import React from "react";
import { Segment, Grid } from "semantic-ui-react";

export function HomeAbout() {
  return (
    <Segment vertical textAlign="center" className="animate__animated animate__zoomIn">
      <h3>ACERCA DE NOSOTROS</h3>
      <Grid divided="vertically" stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              doloribus omnis delectus fugit vitae expedita possimus sapiente
              voluptate, dolores odit quisquam similique atque at minus rerum
              debitis recusandae! Explicabo, facere! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dicta doloribus omnis delectus fugit
              vitae expedita possimus sapiente voluptate, dolores odit quisquam
              similique atque at minus rerum debitis recusandae! Explicabo,
              facere!
            </p>
          </Grid.Column>
          <Grid.Column>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              doloribus omnis delectus fugit vitae expedita possimus sapiente
              voluptate, dolores odit quisquam similique atque at minus rerum
              debitis recusandae! Explicabo, facere! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dicta doloribus omnis delectus fugit
              vitae expedita possimus sapiente voluptate, dolores odit quisquam
              similique atque at minus rerum debitis recusandae! Explicabo,
              facere!
            </p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              doloribus omnis delectus fugit vitae expedita possimus sapiente
              voluptate, dolores odit quisquam similique atque at minus rerum
              debitis recusandae! Explicabo, facere!
            </p>
          </Grid.Column>
          <Grid.Column>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              doloribus omnis delectus fugit vitae expedita possimus sapiente
              voluptate, dolores odit quisquam similique atque at minus rerum
              debitis recusandae! Explicabo, facere!
            </p>
          </Grid.Column>
          <Grid.Column>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              doloribus omnis delectus fugit vitae expedita possimus sapiente
              voluptate, dolores odit quisquam similique atque at minus rerum
              debitis recusandae! Explicabo, facere!
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
