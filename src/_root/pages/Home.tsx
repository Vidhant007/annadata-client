import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isAvailable, setAvailable] = useState(true);
  const [isVolunteer, setVolunteer] = useState(false);

  if (isVolunteer) {
    // TODO: Volunteer screen
  }

  return (
    <ScrollArea className="h-full">
      <style>
        {`.icon-shadow{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }`}
      </style>
      <div className="w-full h-full flex flex-col gap-4 p-3">
        {/* request button */}
        <Link to="/pickupDetails">
          <div className="w-full flex flex-col bg-secondary rounded-xl transition-all">
            <Button
              disabled={!isAvailable}
              className="h-32 bg-primary focus:bg-secondary justify-between"
            >
              <img src="/pickup.png" alt="" className="object-contain w-32 scale-125" />
              <p className="text-3xl font-semibold flex-1">Request Pickup</p>
            </Button>
            {/* {!isAvailable && (
            <p className="p-3 rounded-md font-semibold">
            Already Placed one Request
            </p>
          )} */}
          </div>
        </Link>

        {/* support us */}
        <p className="text-3xl font-bold ">
          {" "}
          Support <span className="text-primary">Us</span>
        </p>
        <div className="flex p-2 justify-between gap-2">
          <div className="bg-white w-full h-28 rounded-md flex flex-col justify-center items-center icon-shadow">
            <img src="/coin.png" alt="" className="w-20 object-contain" />
            <p className="font-semibold text-primary">Fund Us</p>
          </div>
          <div className="bg-white w-full h-28 rounded-md flex flex-col justify-center items-center icon-shadow">
            <img src="/tree.png" alt="" className="w-20 object-contain" />
            <p className="font-semibold text-primary">Plant Tree</p>
          </div>
          <div className="bg-white w-full h-28 rounded-md flex flex-col justify-center items-center icon-shadow">
            <img
              src="/flooded-house.png"
              alt=""
              className="w-20 object-contain"
            />
            <p className="font-semibold text-primary">Relief Fund</p>
          </div>
        </div>

        {/* ngos */}
        <p className="text-3xl font-bold ">
          Our <span className="text-primary">Partners</span>
        </p>
        <div className="w-full h-64 bg-white icon-shadow rounded-md flex flex-col">
          <img
            src="/ngo1.jpg"
            alt=""
            className="w-full h-3/4 object-cover rounded-t-md"
          />
          <div className="w-full flex p-2 px-4 justify-between items-center">
            <p className="font-semibold capitalize text-primary">
              XYZ Foundation
            </p>
            <Button>Donate</Button>
          </div>
        </div>
        <div className="w-full h-64 bg-white icon-shadow rounded-md flex flex-col">
          <img
            src="/ngo1.jpg"
            alt=""
            className="w-full h-3/4 object-cover rounded-t-md"
          />
          <div className="w-full flex p-2 px-4 justify-between items-center">
            <p className="font-semibold capitalize text-primary">
              XYZ Foundation
            </p>
            <Button>Donate</Button>
          </div>
        </div>
        <div className="w-full h-64 bg-white icon-shadow rounded-md flex flex-col">
          <img
            src="/ngo1.jpg"
            alt=""
            className="w-full h-3/4 object-cover rounded-t-md"
          />
          <div className="w-full flex p-2 px-4 justify-between items-center">
            <p className="font-semibold capitalize text-primary">
              XYZ Foundation
            </p>
            <Button>Donate</Button>
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Home;
