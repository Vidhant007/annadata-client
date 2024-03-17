import React, { useState, useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PickupDetails = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    mealName: "",
    mealImage: "",
    mealTypeSelection: "fresh",
    mealQuantity: 1,
    address: "",
    description: "",
    latitude: null,
    longitude: null,
    ownerId: user._id,
  });

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleSliderChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      mealQuantity: value[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const formDataToSend = new FormData();
      formDataToSend.append("mealName", formData.mealName);
      formDataToSend.append("mealImage", formData.mealImage);
      formDataToSend.append("mealTypeSelection", formData.mealTypeSelection);
      formDataToSend.append("mealQuantity", formData.mealQuantity);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("latitude", formData.latitude);
      formDataToSend.append("longitude", formData.longitude);
      formDataToSend.append("ownerId", formData.ownerId);

      const response = await axios.post(
        "http://localhost:8000/api/ticket/createTicket",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        toast({
          title: "Ticket Generated",
          description: "Ticket generated successfully",
        });
        setTimeout(() => navigate("/home"), 2000);
      }
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
          setFormData((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ScrollArea className="h-full">
        <style>
          {`.icon-shadow{
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          }`}
        </style>
        <div className="w-full h-full flex flex-col gap-3 p-3">
          <div>
            <label htmlFor="mealName">Meal</label>
            <Input
              id="mealName"
              type="text"
              name="mealName"
              placeholder="Breakfast | Lunch | Dinner | Dish Name"
              className="focus:!ring-0 focus:!ring-offset-0 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
              value={formData.mealName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="mealImage">Image</label>
            <Input
              id="mealImage"
              type="file"
              name="mealImage"
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="mb-1">Meal Type</p>
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="fresh"
                  id="option-one"
                  name="mealTypeSelection"
                  onChange={handleChange}
                />
                <label htmlFor="option-one">Fresh Meal</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="leftovers"
                  id="option-two"
                  name="mealTypeSelection"
                  onChange={handleChange}
                />
                <label htmlFor="option-two">Leftovers</label>
              </div>
            </RadioGroup>
          </div>
          <label htmlFor="mealQuantity">Meal Quantity</label>
          <Slider
            defaultValue={[1]}
            max={50}
            step={1}
            id="mealQunatity"
            onValueChange={handleSliderChange}
          />
          <p>{formData.mealQuantity} Persons</p>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              className="border rounded-md p-2 resize-none"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              className="border rounded-md p-2 resize-none"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <Button
            className="text-lg focus:bg-red-200 hover:bg-red-200"
            type="submit"
          >
            Send Request
          </Button>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </form>
  );
};

export default PickupDetails;
