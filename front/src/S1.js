import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import zemelapis from "./photos/placeholder1.jpg"
import pradine from "./photos/placeholder2.jpg"

const containerStyle = {
  width: "60%",
  height: "800px",
};

const centerCordinates = {
  lat: 54.722313,
  lng: 25.337344,
};
const Page1 = () => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map) {
      const timeout = setTimeout(() => {
        window.google.maps.event.trigger(map, "resize");
        map.setCenter(centerCordinates);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [map]);

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
      <h1 style={styles.header}>S1 Centriniai rūmai</h1>
      <h3 style={styles.subheader}>SRC</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerCordinates}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Add markers or other components if needed */}
      </GoogleMap>
      <p> CIA VIRTUALUS TURAS VIETOJ FT</p>
      <p>|</p>
      <p>v</p>
      <img
        src= {pradine}
        alt="Map of S1 Centriniai rūmai"
        style={styles.image}
      />

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