import React from "react";
import { Carousel,Container } from "react-bootstrap";

const BannerCarousel = () => {
  return (
    <Container> <Carousel style={{ marginTop: "12px" }}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/slide.jpg"
        alt="First slide"
      />
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/slide.jpg"
        alt="First slide"
      />
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/slide.jpg"
        alt="First slide"
      />
    </Carousel.Item>
  </Carousel>
  </Container>
   
  );
};

export default BannerCarousel;
