import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import "./App.css";
import PannellumViewer from "./components/PannellumViewer";
import photoS1 from './photos/S1.jpg';
import photoS2 from './photos/S2.jpg';
import photoS3 from './photos/S3.jpg';
import photoS4S5 from './photos/S4S5.jpg';
import photoS6 from './photos/S6.jpg';
import photoS7 from './photos/S7.jpg';

const pageConfig = {
  S1: {
    header: "pageTemplate.s1",
    imagePath: photoS1,
    hotspots: [
      {
        pitch: 3,
        yaw: 65,
        text: "S3 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S3",
      },
      {
        pitch: 2,
        yaw: 3,
        text: "S1 įėjimas",
      },
      {
        pitch: 5,
        yaw: 29,
        text: "S2 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S2",
      },
    ],
  },
  S2: {
    header: "pageTemplate.s2",
    imagePath: photoS2,
    hotspots: [
      {
        pitch: 2,
        yaw: 0,
        text: "S2 įėjimas",
      },
      {
        pitch: 3,
        yaw: -105,
        text: "S4/S5 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S4",
      },
      {
        pitch: 0,
        yaw: 62,
        text: "S3 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S3",
      },
      {
        pitch: 0,
        yaw: 94,
        text: "S1 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S1",
      },
      {
        pitch: 4,
        yaw: -66,
        text: "S6 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S6",
      },
    ],
  },
  S3: {
    header: "pageTemplate.s3",
    imagePath: photoS3,
    hotspots: [
      {
        pitch: 8,
        yaw: 2,
        text: "S3 įėjimas",
      },
      {
        pitch: 1,
        yaw: -83,
        text: "S1 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S1",
      },
      {
        pitch: 4,
        yaw: -52,
        text: "S2 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S2",
      },
    ],
  },
  S4: {
    header: "pageTemplate.s4",
    imagePath: photoS4S5,
    hotspots: [
      {
        pitch: 2,
        yaw: 0,
        text: "S4/S5 įėjimas",
      },
      {
        pitch: -1,
        yaw: 60,
        text: "S2 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S2",
      },
    ],
  },
  S5: {
    header: "pageTemplate.s5",
    imagePath: photoS4S5,
    hotspots: [
      {
        pitch: 2,
        yaw: 0,
        text: "S4/S5 įėjimas",
      },
      {
        pitch: -1,
        yaw: 60,
        text: "S2 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S2",
      },
    ],
  },
  S6: {
    header: "pageTemplate.s6",
    imagePath: photoS6,
    hotspots: [
      {
        pitch: 5,
        yaw: 19,
        text: "S6 įėjimas",
      },
      {
        pitch: -3,
        yaw: 111,
        text: "S2 įėjimas (Paspausti, kad priartinti)",
        targetPageId: "S2",
      },
    ],
  },
  S7: {
    header: "pageTemplate.s7",
    imagePath: photoS7,
    hotspots: [
      {
        pitch: 2,
        yaw: 4,
        text: "S6 galinis įėjimas. Pro jį galima patekti į S7 korpusą.",
      },
    ],
  },
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

const predeterminedLocations = [
  { id: "loc1", name: "pageTemplate.loc1", coordinates: { lat: 54.720406, lng: 25.33752 } },
  { id: "loc2", name: "pageTemplate.loc2", coordinates: { lat: 54.724101, lng: 25.334603 } },
  { id: "loc3", name: "pageTemplate.loc3", coordinates: { lat: 54.723438, lng: 25.341579 } },
];

const containerStyle = {
  width: "90%",
  height: "800px",
};
const defaultCenterCoordinates = {
  lat: 54.722313,
  lng: 25.337344,
};

const PageTemplate = ({ t }) => {
  const { pageId } = useParams();
  const config = pageConfig[pageId];
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);
  const [directions, setDirections] = useState(null);
  const [destination, setDestination] = useState(null);
  const navigate = useNavigate();

  const onLoad = useCallback((mapInstance) => setMap(mapInstance), []);
  const onUnmount = useCallback(() => setMap(null), []);

  useEffect(() => {
    if (map) {
      const timeout = setTimeout(() => {
        window.google.maps.event.trigger(map, "resize");
        const center = selectedStart ? selectedStart.coordinates : userLocation || defaultCenterCoordinates;
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
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    const targetMarker = markers.find((marker) => marker.id === pageId || marker.id.startsWith(pageId));
    if (targetMarker) {
      setDestination({ lat: targetMarker.lat, lng: targetMarker.lng });
    }
  }, [pageId]);

  useEffect(() => {
    if ((selectedStart || userLocation) && destination) {
      const origin = selectedStart ? selectedStart.coordinates : userLocation;
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [selectedStart, userLocation, destination]);

  const handleStartLocationSelect = (location) => {
    setSelectedStart(location);
  };

  const currentCenter = selectedStart ? selectedStart.coordinates : userLocation || defaultCenterCoordinates;

  if (!config) {
    return <div>{t('pageTemplate.notFound')}</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-header">{t(config.header)}</h1>

      {!userLocation && (
        <>
          <div className="header-buttons">{t('pageTemplate.selectStart')}</div>
          <div className="buttons-container">
            {predeterminedLocations.map((loc) => (
              <button
                key={loc.id}
                className="start-location-button"
                onClick={() => handleStartLocationSelect(loc)}
              >
                {t(loc.name)}
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
              text: t('pageTemplate.startPoint'),
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
              text: t('pageTemplate.youAreHere'),
              fontSize: "15px",
              fontWeight: "bold",
              color: "blue",
            }}
          />
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#FF0000',
                strokeOpacity: 0.7,
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>

      <div className="container">
        <h2>{t('pageTemplate.facultyView')}</h2>
        <PannellumViewer
          imagePath={config.imagePath}
          hotspots={config.hotspots.map(h => ({
            ...h,
            onClick: h.targetPageId
              ? () => navigate(`/${h.targetPageId}`)
              : undefined,
          }))}
        />
      </div>
    </div>
  );
};

export default PageTemplate;
