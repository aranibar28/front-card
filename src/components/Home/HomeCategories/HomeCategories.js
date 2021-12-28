import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Container, Image, Item } from "semantic-ui-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { map } from "lodash";
import "./HomeCategories.scss";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export function HomeCategories(props) {
  const { categories } = props;
  const location = useLocation();
  const history = useHistory();
  const goToCategory = (id) => {
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <Container>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        className="carousel"
      >
        {map(categories, (category) => (
          <Item key={category.id}>
            <Image
              src={category.image}
              onClick={() => goToCategory(category.id)}
            />
            <div className="carousel__title">{category.title}</div>
          </Item>
        ))}
      </Carousel>
    </Container>
  );
}
