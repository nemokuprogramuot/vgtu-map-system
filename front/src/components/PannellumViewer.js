import React, { useEffect, useRef } from "react";
import 'pannellum/build/pannellum.css';
import 'pannellum';

// Make sure to include these in your public/index.html or import them
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css" />
// <script src="https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.js"></script>

const PannellumViewer = ({ imagePath, hotspots = [] }) => {
  const viewerId = `panorama-viewer-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for the viewer div
  const viewerInstance = useRef(null);

  useEffect(() => {
    // Clean up previous instance if it exists
    if (viewerInstance.current) {
      viewerInstance.current.destroy();
      viewerInstance.current = null;
    }

    // Load Pannellum if not already loaded
    const loadPannellum = () => {
      if (typeof window !== 'undefined' && window.pannellum) {
        try {
          viewerInstance.current = window.pannellum.viewer(viewerId, {
            type: "equirectangular",
            panorama: imagePath,
            autoLoad: true,
            showControls: true,
            showZoomCtrl: true,
            showFullscreenCtrl: true,
            hotSpots: hotspots.map((hotspot) => ({
              pitch: hotspot.pitch || 0,
              yaw: hotspot.yaw || 0,
              type: "info",
              text: hotspot.text || "Hotspot",
              clickHandlerFunc: hotspot.onClick || null,
            })),
          });
        } catch (error) {
          console.error("Error initializing Pannellum:", error);
        }
      } else {
        console.error("Pannellum is not loaded!");
      }
    };

    // Try to load Pannellum library if it's not already loaded
    if (typeof window !== 'undefined' && !window.pannellum) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css';
      document.head.appendChild(linkElement);

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.js';
      scriptElement.onload = loadPannellum;
      document.body.appendChild(scriptElement);
    } else {
      // If already loaded, initialize the viewer
      loadPannellum();
    }

    // Cleanup function to destroy the viewer when the component unmounts
    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
      }
    };
  }, [imagePath, hotspots, viewerId]);

  return (
    <div 
      id={viewerId} 
      style={{ 
        width: "100%", 
        height: "800px",
        backgroundColor: "#f0f0f0", // Background color while loading
        position: "relative"
      }}
    ></div>
  );
};

export default PannellumViewer;