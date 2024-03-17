import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import RewardItem from "@/components/RewardItem";
import { useState, useEffect } from "react";
import axios from "axios";
import "./rewards.css";
const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    //fetch reward items
    var config = {
      method: "get",
      url: "http://localhost:8000/api/reward/getRewards",
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setRewards(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <ScrollArea className="rewards h-full px-3">
      <h1 className="head text-primary">
        Redeem <br /> <span className="pt">Points</span>{" "}
      </h1>
      <div className="cont gap-4 ">
        {rewards.map((data, index) => {
          return <RewardItem key={index} data={data} />;
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Rewards;
