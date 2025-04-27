import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./App.css";
import PannellumViewer from "./components/PannellumViewer";
import logo from './photos/test3.jpg';

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
  width: "90%",
  height: "800px",
};
const defaultCenterCoordinates = {
  lat: 54.722313,
  lng: 25.337344,
};

const predeterminedLocations = [
    {
      id: "loc1",
      name: "Automobilių stovėjimo aikštelė",
      coordinates: { lat: 54.720406, lng: 25.33752},
    },
    {
      id: "loc2",
      name: "Saulėtekio alėjos stotelė",
      coordinates: { lat: 54.724101, lng: 25.334603 },
    },
    {
      id: "loc3",
      name: "Bendrabučiai",
      coordinates: { lat: 54.723438, lng: 25.341579},
    },
  ];

const PageTemplate = () => {
  const { pageId } = useParams();
  const config = pageConfig[pageId];
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);

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
        const center = selectedStart
          ? selectedStart.coordinates
          : userLocation || defaultCenterCoordinates;
        map.setCenter(center);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [map, userLocation, selectedStart]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error watching position: ", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleStartLocationSelect = (location) => {
    setSelectedStart(location);
  };

  const currentCenter = selectedStart
  ? selectedStart.coordinates
  : userLocation || defaultCenterCoordinates;

  if (!config) {
    return <div>Page not found</div>;
  }

  return (
    <div className="page-container">
    <h1 className="page-header">{config.header}</h1>
    {/* Only show the buttons if the user location is not available */}
    {!userLocation && (
      <>
        <div className="header-buttons">Pasirinkite pradinę poziciją.</div>
        <div className="buttons-container">
          {predeterminedLocations.map((loc) => (
            <button
              key={loc.id}
              className="start-location-button"
              onClick={() => handleStartLocationSelect(loc)}
            >
              {loc.name}
            </button>
          ))}
        </div>
      </>
    )}
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentCenter}
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
      {selectedStart && (
        <Marker
          position={selectedStart.coordinates}
          label={{
            text: "Pradžios taškas",
            fontSize: "15px",
            fontWeight: "bold",
            color: "black",
          }}
        />
      )}
      {userLocation && !selectedStart && (
        <Marker
          position={userLocation}
          label={{
            text: "You are here",
            fontSize: "15px",
            fontWeight: "bold",
            color: "blue",
          }}
        />
      )}
    </GoogleMap>
    <div style={{ width: '60%'}}>
      <h2>Fakulteto įėjimlo 360 laipsnių vaizdas</h2>
      <PannellumViewer
        imagePath={logo} // Change to your image path
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
  </div>
  );
};

export default PageTemplate;
