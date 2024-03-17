import "leaflet/dist/leaflet.css";
import React, { useEffect, useState, memo } from "react";
import ReactMapGl from "react-map-gl";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import { icons } from "lucide-react";

const markerIcon = new L.Icon({
  iconUrl: "/pin.png",
  iconSize: [35, 45],
});

const Hotspot = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isDisaster, setIsDiaster] = useState(true);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [ticketData, setTicketData] = useState();

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

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const [mapData, setMapData] = useState();

  const getDisaster = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/disaster/getDisaster"
      );
      console.log(res.data);
      setMapData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHotspots = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/hotspot/getHotspots"
      );
      console.log(res.data);
      setMapData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserLocation();
    if (user.isVolunteer) {
      getTickets();
    }
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
                    <Popup>{ticket.mealName || ticket.category}</Popup>
                  </Marker>
                ))}
            </MemoMarkerClusterGroup>
            <Marker
              {...{
                position: [userLocation.latitude, userLocation.longitude],
                icon: markerIcon,
              }}
            >
              <Popup>You</Popup>
            </Marker>
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
                height: 100vh;
                width:100vw;
            }
            `}
      </style>
      <div className="w-full bg-white flex">
        <Button
          className={
            isDisaster
              ? "w-full rounded-none border-r  bg-primary text-black"
              : "w-full rounded-none border-r  bg-white text-black"
          }
          onClick={() => {
            setIsDiaster(true), getDisaster();
          }}
        >
          Disaster
        </Button>
        <Button
          className={
            isDisaster
              ? "w-full rounded-none border-r  bg-white text-black"
              : "w-full rounded-none border-r  bg-primary text-black"
          }
          onClick={() => {
            setIsDiaster(false), getHotspots();
          }}
        >
          Hotspots
        </Button>
      </div>

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

          {mapData &&
            mapData.map((ticket: any, key: any) => (
              <Marker
                {...{ position: [ticket.latitude, ticket.longitude] }}
                key={key}
              >
                <Popup>{ticket.disasterType || ticket.name}</Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Hotspot;
