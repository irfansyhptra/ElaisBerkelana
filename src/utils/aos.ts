export const fadeIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number = 0
) => {
  return {
    "data-aos": `fade-${direction}`,
    "data-aos-delay": delay,
    "data-aos-duration": "1000",
    "data-aos-easing": "ease-out",
  };
};

export const zoomIn = (delay: number = 0) => {
  return {
    "data-aos": "zoom-in",
    "data-aos-delay": delay,
    "data-aos-duration": "1000",
    "data-aos-easing": "ease-out",
  };
};

export const slideIn = (
  direction: "up" | "down" | "left" | "right",
  delay: number = 0
) => {
  return {
    "data-aos": `slide-${direction}`,
    "data-aos-delay": delay,
    "data-aos-duration": "1000",
    "data-aos-easing": "ease-out",
  };
};

export const flip = (
  direction: "up" | "down" | "left" | "right",
  delay: number = 0
) => {
  return {
    "data-aos": `flip-${direction}`,
    "data-aos-delay": delay,
    "data-aos-duration": "1000",
    "data-aos-easing": "ease-out",
  };
};
