import "leaflet/dist/leaflet.css";
import React, { useEffect, useState, memo } from "react";
import ReactMapGl from "react-map-gl";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const Hotspot = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [viewport, setViewport] = useState({
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 6,
    width: "100%",
    height: "100%",
  });

  const [tickets, setTickets] = useState<any>();
  const position = [30.416512, 77.968515];
  const MemoMarkerClusterGroup = memo(MarkerClusterGroup);

  const getTickets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/ticket/getTickets"
      );

      console.log(res.data);

      setTickets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  if (user.isVolunteer) {
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

            <MemoMarkerClusterGroup
              chunkedLoading={true}
              disableClusteringAtZoom={18}
              animate={true}
              spiderfyOnMaxZoom={false}
            >
              {tickets &&
                tickets.map((ticket: any, key: any) => (
                  <Marker
                    {...{ position: [ticket.latitude, ticket.longitude] }}
                    key={key}
                  >
                    <Popup>{ticket.mealName}</Popup>
                  </Marker>
                ))}
            </MemoMarkerClusterGroup>
          </MapContainer>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    );
  }

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
        </MapContainer>

        {/* TODO: Map over the responses */}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Hotspot;
