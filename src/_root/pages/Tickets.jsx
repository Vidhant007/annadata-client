import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useState } from "react";

const Tickets = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [ticketData, setTicketData] = useState();

  const getUserTickets = async () => {
    try {
      // const res = await axios.get
      try {
        const res = await axios.get(
          `http://localhost:8000/api/ticket/getUserTicket/${user._id}`
        );
        console.log(res.data);
        setTicketData([res.data]);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTickets = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/ticket/getTickets"
      );
      console.log(res.data);
      setTicketData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClaim = async (id) => {
    try {
      const res = await axios.patch(
        "http://localhost:8000/api/ticket/claimTicket/65f0ca76f3121f51aac73a99",
        { id, claimerid: user._id, claimed: true }
      );
      console.log(res);
      if (user.isVolunteer) {
        getAllTickets();
      } else {
        getUserTickets();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.isVolunteer) {
      getAllTickets();
    } else {
      getUserTickets();
    }
  }, []);

  return (
    <ScrollArea className="h-full">
      <style>
        {`.icon-shadow{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }`}
      </style>
      <div className="w-full h-full flex flex-col gap-4 p-3">
        {ticketData &&
          ticketData.map((ticket) => (
            <div className="w-full p-3 icon-shadow rounded-md flex gap-2">
              <img src={ticket.imageUrl} alt="" className="w-32 rounded-md" />
              <div className="flex flex-col">
                <p>{ticket.category}</p>
                <p>Address: {ticket.address}</p>
                <p>Quantity {ticket.quantity} Persons</p>
                <p className="text-primary font-bold">
                  {ticket.claimed ? "Claimed" : "Pending"}
                </p>

                {user.isVolunteer ? (
                  <Button
                    disabled={ticket.claimed}
                    onClick={() => onClaim(ticket._id)}
                    className="focus:bg-black hover:bg-black"
                  >
                    Claim
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Tickets;
