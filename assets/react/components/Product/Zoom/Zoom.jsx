import React from "react";
import styles from "./zoom.styles.scss";
import { creaDomElem } from "../../../utilities";

const Zoom = ({ src, alt }) => {
  const hoverInput = ({ target }) => {
    target.classList.add(styles.output);
  };

  const hoverOutput = ({ target }) => {
    target.classList.remove(styles.output);
  };

  const handleClick = () => {
    const containerImg = creaDomElem("div", "class", styles.bigImage);
    const bigImage = creaDomElem("img", "src", src);

    containerImg.addEventListener("click", () => {
      containerImg.classList.replace(styles.bigImage, styles.bigImageClose);
      setTimeout(() => containerImg.remove(), 50000);
    });

    containerImg.appendChild(bigImage);
    document.body.appendChild(containerImg);
  };

  return (
    <>
      <img
        className={styles.zoom}
        onMouseEnter={(e) => hoverInput(e)}
        onMouseLeave={(e) => hoverOutput(e)}
        onClick={() => handleClick()}
        src={src}
        alt={alt}
      />
    </>
  );
};

export default Zoom;
