import React from "react";
import zemelapis from "./photos/placeholder1.jpg"
import pradine from "./photos/placeholder2.jpg"

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
   
  };

  return (
    <div style={styles.container}>
         <h1 style={styles.header}>S4 Auditorinis korpusas</h1>
         <h3 style={styles.subheader}>SRK-II</h3>
      <img
        src= {pradine}
        alt="Map of S1 Centriniai rūmai"
        style={styles.image}
      />
      <p style={styles.description}>
      <strong>Kaip patekti:</strong> Nuo centrinės aikštės (žr. žemėlapyje) eiti tiesiai. Užlipus laiptais pasukti kairėn. Tuomet užlipus laiptais pasukti dešinėn. Tuomet užlipus laiptais pasukti dešinėn prie įėjimo.
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