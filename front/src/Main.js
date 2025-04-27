import React, { useState } from "react";
import { Link } from "react-router-dom";
import mainPhoto from "./photos/mainphoto.png";


const Main = () => {
  const [hoveredButton, setHoveredButton] = useState(null);

  const buttons = [
    { id: 1, top: "71%", left: "11.5%", width: "17.7%", height: "23.5%", path: "/S1" },
    { id: 2, top: "51%", left: "39%", width: "11.7%", height: "36.5%", path: "/S2" },
    { id: 3, top: "76%", left: "51.5%", width: "27%", height: "10.5%", path: "/S3" },
    { id: 4, top: "22%", left: "28.25%", width: "17%", height: "29%", path: "/S4" },
    { id: 5, top: "43%", left: "14.25%", width: "13.3%", height: "9%", path: "/S5" },
    { id: 6, top: "13%", left: "50%", width: "9.4%", height: "46%", path: "/S6" },
    { id: 7, top: "22%", left: "60%", width: "28%", height: "15.8%", path: "/S7" },
  ];

  const handleSubmit = (building) => {
    fetch("/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ building }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Data sent successfully:", data))
      .catch((error) => console.error("Error sending data:", error));
  };

  return (
    <div style={styles.content}>
      <h2>Patobulintas, lengviau suprantamas</h2>
      <div style={styles.imageContainer}>
        <img
          src={mainPhoto}
          alt="Vilnius Tech Map"
          style={styles.image}
        />
        {buttons.map((button) => (
          <Link
            key={button.id}
            onClick={() => handleSubmit(button.path)}
            to={button.path}
            style={{
              ...styles.button,
              top: button.top,
              left: button.left,
              width: button.width,
              height: button.height,
              borderColor: hoveredButton === button.id ? "gray" : "transparent",
              backgroundColor: hoveredButton === button.id ? "rgba(78, 44, 44, 0.2)" : "transparent",
            }}
            onMouseEnter={() => setHoveredButton(button.id)}
            onMouseLeave={() => setHoveredButton(null)}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  content: {
    flex: 1,
    padding: "20px",
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
    display: "inline-block",
    maxWidth: "100%", // Image container won't overflow
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginTop: "20px",
    display: "block",
  },
  button: {
    position: "absolute",
    backgroundColor: "transparent",
    border: "5px solid transparent",
    cursor: "pointer",
    transition: "background-color 0.3s, border-color 0.3s",
  },

  
};

export default Main;