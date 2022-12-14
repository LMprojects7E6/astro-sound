import React from "react";

import { Carousel } from "flowbite-react";

import Slide from "./Slide";
import img from "assets/slides/index";

const Carrousel = () => {
  let pos = -1;

  const threeSlides = [
    { text: "Don’t just listen, feel the music.", image: img.a },
    { text: "It will transport you to another world.", image: img.b },
    { text: "Where the music never stops!", image: img.c },
  ];

  return (
    <div className="md:flex hidden mt-8 ">
      <Carousel slideInterval={5000}>
        {threeSlides.map((slide, index) => {
          pos++;
          return (
            <Slide key={index} title={slide.text} slideImage={slide.image} />
          );
        })}
      </Carousel>
    </div>
  );
};

export default Carrousel;
