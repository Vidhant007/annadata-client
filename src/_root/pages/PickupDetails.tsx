import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PickupDetails = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <ScrollArea className="h-full">
      <style>
        {`.icon-shadow{
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
       }`}
      </style>
      <div className="w-full h-full flex flex-col gap-3 p-3">
        <div>
          <label htmlFor="mealType">Meal</label>
          <Input
            id="mealType"
            type="text"
            placeholder="Breakfast | Lunch | Dinner | Dish Name"
            className="focus:!ring-0 focus:!ring-offset-0 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          />
        </div>
        <div>
          <label htmlFor="mealImage">Image</label>
          <Input id="mealImage" type="file" />
        </div>
        <div>
          <p className="mb-1">Meal Type</p>
          <RadioGroup defaultValue="option-one">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fresh" id="option-one" />
              <label htmlFor="option-one">Fresh Meal</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="leftovers" id="option-two" />
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
          onValueChange={(value) => {
            setQuantity(value[0]);
          }}
        />
        <p>{quantity} Persons</p>
        <div className="flex flex-col">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            className="border rounded-md p-2 resize-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description (Optional)</label>
          <textarea
            id="description"
            className="border rounded-md p-2 resize-none"
          />
        </div>

        <Button className="text-lg focus:bg-red-200 hover:bg-red-200">
          Send Request
        </Button>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default PickupDetails;
