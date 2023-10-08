import React, { useEffect, useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveImage] = useState(0);

  const handleClickPrevious = () => {
    if (activeIndex === 0) {
      return setActiveImage(IMAGES.length - 1);
    }
    return setActiveImage(activeIndex - 1);
  };

  const handleClickNext = () => {
    if (activeIndex === IMAGES.length - 1) {
      return setActiveImage(0);
    }
    return setActiveImage(activeIndex + 1);
  };

  useEffect(() => {
    console.log({ activeIndex });
  }, [activeIndex]);

  return (
    <div>
      <div className="carousel">
        <ul className="carousel__slides">
          {IMAGES.map((image, index) => {
            return (
              <>
                <input
                  type="radio"
                  name="radio-buttons"
                  checked={activeIndex === index}
                  readOnly
                />
                <li className="carousel__slide-container">
                  <div className="carousel__slide-img">
                    <img alt={`scenery ${index}`} src={image} />
                  </div>
                  <div className="carousel__controls">
                    <label
                      onClick={handleClickPrevious}
                      className="carousel__slide-prev"
                    >
                      <span>&lsaquo;</span>
                    </label>
                    <label
                      onClick={handleClickNext}
                      className="carousel__slide-next"
                    >
                      <span>&rsaquo;</span>
                    </label>
                  </div>
                </li>
              </>
            );
          })}

          <div className="carousel__dots">
            {IMAGES.map((_, index) => {
              return (
                <label
                  onClick={() => setActiveImage(index)}
                  className={`carousel__dot ${
                    activeIndex === index ? "active" : ""
                  }`}
                  id={`img-dot-${index}`}
                ></label>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
