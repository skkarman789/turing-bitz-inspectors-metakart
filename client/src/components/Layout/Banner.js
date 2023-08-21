import { Box, styled } from "@mui/material";
import First from "../../assets/image1.png";
import Second from "../../assets/image2.png";
import Third from "../../assets/image3.png";
import Fourth from "../../assets/image4.png";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const StyledBanner = styled(Box)`
  margin-top: 3%;
`;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const ImageCarousel = () => {
  return (
    <StyledBanner>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={200}
        keyBoardControl={true}
        showDots={false}
        slidesToSlide={1}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div>
          <img src={First} alt="Image 1" />
        </div>
        <div>
          <img src={Second} alt="Image 2" />
        </div>
        <div>
          <img src={Third} alt="Image 3" />
        </div>
        <div>
          <img src={Fourth} alt="Image 4" />
        </div>
      </Carousel>
    </StyledBanner>
  );
};

export default ImageCarousel;