import React, { useEffect, useState } from "react";
import "./carousel.css";

const Carousel = () => {
  const [count, setCount] = useState(0);

  const [direction, setDirection] = useState("increment");

  const images = [
    "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/39855/lamborghini-brno-racing-car-automobiles-39855.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    "https://images.pexels.com/photos/733745/pexels-photo-733745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/831475/pexels-photo-831475.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/248687/pexels-photo-248687.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  ];

  useEffect(() => {
    const clear = setInterval(() => {
      if (direction === "decrement") {
        setDirection("increment");
      }

      if (count === images.length - 1) {
        setCount((state) => 0);
        return;
      }
      setCount((count) => count + 1);
    }, 3000);

    return () => {
      clearInterval(clear);
    };
  }, [count]);

  const increment = () => {
    setDirection("increment");
    if (count === images.length - 1) {
      setCount(0);
      return;
    }
    setCount(count + 1);
  };
  const decrement = () => {
    setDirection("decrement");
    if (count === 0) {
      setCount(images.length - 1);
      return;
    }
    setCount(count - 1);
  };

  return (
    <div className="carousel_wrapper">
      <button onClick={decrement}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <div
        className={`img_wrapper ${
          direction === "increment" ? "" : "decrement"
        }`}
      >
        {/* <img src={images[count]} alt="count" /> */}

        {images.map(
          (el, i) => i === count && <img key={i} src={el} alt="car" />
        )}

        <div className="dots">
          {images.map((el, i) => {
            return (
              <div
                key={i}
                className={`dot ${i === count ? "active" : ""}`}
              ></div>
            );
          })}
        </div>
      </div>
      <button onClick={increment}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Carousel;
