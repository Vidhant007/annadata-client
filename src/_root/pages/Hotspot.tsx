import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import ReactMapGl from "react-map-gl";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Hotspot = () => {
  const [viewport, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
    width: "100%",
    height: "100%",
  });
  const position = [51.505, -0.09];
  return (
    <ScrollArea className="h-full">
      <style>
        {`
            .leaflet-container {
                height:100vh;
                width:100vw;
            }
            `}
      </style>
      <div className="w-full h-full">
        <MapContainer
          {...{ center: position, zoom: 16, scrollWheelZoom: false }}
        >
          <TileLayer
            {...{
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            }}
          />
          <Marker {...{ position: position }}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>

        {/* TODO: Map over the responses */}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Hotspot;
