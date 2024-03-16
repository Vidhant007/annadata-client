import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const Profile = () => {
  return (
    <ScrollArea className="h-full">
      <style>
        {`.icon-shadow{
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }`}
      </style>
      <div className="w-full h-full flex flex-col items-center gap-3 p-3">
        <img src="/profile-user.png" alt="" className="w-32" />
        <div className="flex flex-col items-center">
          <p>Priyanshu Butola</p>
          <p className="text-muted-foreground text-sm">
            priyanshubutola@gmail.com
          </p>
        </div>

        <div className="w-full bg-primary shadow-md h-32 rounded-md p-4 text-white flex">
          <div className="w-full">
            <p className="text-xl">Donor Card</p>
            <p className="text-sm">Contribution Points</p>
            <p className="text-3xl font-bold">923</p>
          </div>
          <img src="/trophy.png" alt="" className="w-32 object-contain" />
        </div>
        <div className="w-full bg-white shadow-md icon-shadow rounded-md p-4 ">
          <div className="w-full">
            <p className="">Donation History</p>
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default Profile;