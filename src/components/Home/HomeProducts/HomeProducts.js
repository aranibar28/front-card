import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { map } from "lodash";
import "./HomeProducts.scss";

export function HomeProducts(props) {
  const { products } = props;
  return (
    <Grid columns={4} textAlign="center" stackable className="home-products">
      {map(products, (product) => (
        <Grid.Column key={product.id}>
          <div className="home-products__figure">
            <Image src={product.image} />
            <div className="container">
              <span>S/. {parseFloat(product.price).toFixed()}</span>
              <p>Antes S/. {(parseFloat(product.price) * 1.1).toFixed()}</p>
            </div>
          </div>
          <h4>{product.title}</h4>
          <p>{product.description}</p>
        </Grid.Column>
      ))}
    </Grid>
  );
}
