import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import placeholderMap from "./photos/placeholder1.jpg";
import placeholderPageImage from "./photos/placeholder2.jpg";

const pageConfig = {
  S1: {
    header: "S1 Centriniai rūmai",
  },
  S2: {
    header: "S2 Auditorinis korpusas",
  },
  S3: {
    header: "S3 Mokomasis korpusas",
  },
  S4: {
    header: "S4 Auditorinis korpusas",
  },
  S5: {
    header: "S5 Mokomasis korpusas",
  },
  S6: {
    header: "S6 Laboratorinis korpusas",
  },
  S7: {
    header: "S7 Laboratorinis korpusas",
  },
  // Additional page configurations for S2, S3, etc.
};

const markers = [
  { id: "S1", lat: 54.72274383397544, lng: 25.33764722315543 },
  { id: "S2", lat: 54.72203499177293, lng: 25.33709238422004 },
  { id: "S3", lat: 54.72250984691805, lng: 25.33618418529878 },
  { id: "S4/5", lat: 54.72163036759537, lng: 25.337439235351688 },
  { id: "S6", lat: 54.7217984077603, lng: 25.336478409431674 },
  { id: "S6", lat: 54.72178798668516, lng: 25.336187455101744 },
  { id: "S7", lat: 54.72125260034498, lng: 25.33614685682314 }
];

const containerStyle = {
  width: "60%",
  height: "800px",
};

const centerCoordinates = {
  lat: 54.722313,
  lng: 25.337344,
};

const PageTemplate = () => {
  const { pageId } = useParams();
  const config = pageConfig[pageId];
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
        map.setCenter(centerCoordinates);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [map]);

  if (!config) {
    return <div>Page not found</div>;
  }

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
      <h1 style={styles.header}>{config.header}</h1>
      <h3 style={styles.subheader}>{config.subheader}</h3>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerCoordinates}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
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
    </div>
  );
};

export default PageTemplate;
