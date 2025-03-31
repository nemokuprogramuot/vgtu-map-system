import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker} from "@react-google-maps/api";
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

const markers = [
  { id: "S1", lat: 54.72274383397544, lng: 25.33764722315543 },
  { id: "S2", lat: 54.72203499177293, lng: 25.33709238422004 },
  { id: "S3", lat: 54.72250984691805, lng: 25.33618418529878 },
  { id: "S4/5", lat: 54.72163036759537, lng: 25.337439235351688},
  { id: "S6", lat: 54.7217984077603, lng: 25.336478409431674 },
  { id: "S6", lat: 54.72178798668516, lng: 25.336187455101744 },
  { id: "S7", lat: 54.72125260034498, lng: 25.33614685682314 }
  
];
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
        {markers.map((marker) => (
   <Marker 
  key={marker.id}
  position={{ lat: marker.lat, lng: marker.lng }}
  label={{
    text: marker.id,
    fontSize: "15px",
    fontWeight: "bold",
    color: "black",
  }}
/>
  ))}
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