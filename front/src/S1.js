import React from "react";
import zemelapis from "./photos/placeholder1.jpg"
import pradine from "./photos/placeholder2.jpg"
import PannellumViewer from "./components/PannellumViewer";
import testas from "./photos/test1.jpg"

const Page1 = () => {

  const styles = {
    container: {
      margin: "20px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center",
      textAlign: "center", 
    },
    image: {
      maxWidth: "50%",
      marginBottom: "10px",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    subheader: {
      fontSize: "18px",
      marginTop: "10px",
    },
    description: {
      fontSize: "16px",
      marginTop: "10px",
    },
    photo: {
      maxWidth: "100%",
      margin: "20px 0",
    },
    photoContainer: {
      display: "flex",
      flexDirection: "column", 
      alignItems: "center", 
      gap: "20px", 
    },
    viewerContainer: {
      width: "50%", 
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      overflow: "hidden"
    },
   
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>S1 Centriniai rūmai</h1>
      <h3 style={styles.subheader}>SRC</h3>
      <img
        src= {pradine}
        alt="Map of S1 Centriniai rūmai"
        style={styles.image}
      />
      <div style={styles.viewerContainer}>
        <PannellumViewer
          imagePath={testas}
          hotspots={[
            {
              pitch: 10,
              yaw: 120,
              text: "Go here",
              onClick: () => alert("Hotspot clicked!"),
            },
            {
              pitch: -5,
              yaw: -90,
              text: "Another point",
              onClick: () => alert("Another hotspot clicked!"),
            },
          ]}
        />
      </div>
      <p style={styles.description}>
        <strong>Kaip patekti:</strong> Nuo centrinės aikštės (žr. žemėlapyje) pasukti
        kairėn. Eiti prie stiklinio pastato.
      </p>
      <p style={styles.description}>
        <strong>Navigacija:</strong>
      </p>
      <div style = {styles.photoContainer}>
      <img
        src = {zemelapis}
        alt="Photo 1"
        style={styles.photo}
      />
   
      </div>
    </div>
  );
};

export default Page1;