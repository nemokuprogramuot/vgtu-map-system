import React, { useState } from "react";
import { Link } from "react-router-dom";
import mainPhoto from "./photos/mainphoto.png";

const Main = () => {
  const [hoveredButton, setHoveredButton] = useState(null);
  

  
  const buttons = [
    { id: 1, top: "71%", left: "11%", width: "99px", height: "121px", path: "/1" },
    { id: 2, top: "51%", left: "39%", width: "80px", height: "187px", path: "/2" },
    { id: 3, top: "76%", left: "51%", width: "153px", height: "50px", path: "/3" },
    { id: 4, top: "22%", left: "28%", width: "101px", height: "150px", path: "/S4" },
    { id: 5, top: "43%", left: "14%", width: "82x", height: "45px", path: "/5" },
    { id: 6, top: "13%", left: "49%", width: "65px", height: "239px", path: "/6" },
    { id: 7, top: "22%", left: "60%", width: "177px", height: "83px", path: "/7" },
   
  ];


  return (
    <div style={styles.content}>
        <h1>VilniusTech</h1>
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
            to={button.path}
            style={{
              ...styles.button1,
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
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginTop: "20px",
  },
  button1: {
    position: "absolute",
    backgroundColor: "transparent",
    border: "5px solid transparent",
    cursor: "pointer",
    transition: "background-color 0.3s, border-color 0.3s",
  },
  button2: {
    position: "absolute",
    backgroundColor: "transparent",
    border: "5px solid transparent",
    cursor: "pointer",
    transition: "background-color 0.3s, border-color 0.3s",
  },
};



export default Main;
