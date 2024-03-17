import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

const SignIn = () => {
  const navigate = useNavigate();

  const [creds, setCreds] = useState<Credentials>({ email: "", password: "" });
  const [isVolunteer, setIsVolunteer] = useState(false);

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    // TODO: Send auth request

    try {
      let response;

      if (isVolunteer) {
        response = await axios.post(
          "http://localhost:8000/api/user/loginVolunteer",
          creds
        );
      } else {
        response = await axios.post(
          "http://localhost:8000/api/user/loginDonor",
          creds
        );
      }

      console.log(response.data);

      if (response.data?.organisation) {
        response.data["isVolunteer"] = true;
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/hotspot-areas");
      } else {
        response.data["isVolunteer"] = false;
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col">
      <p className="font-bold text-4xl">
        Welcome <br /> Back!
      </p>
      <p className="text-muted-foreground font-semibold text-lg mt-2">
        {" "}
        <span className="text-primary">Sign in</span> to your account
      </p>

      <div className="w-full flex flex-col mt-5 gap-3">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.email}
          onChange={onType}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.password}
          onChange={onType}
        />
        <div className="flex items-center gap-2">
          <Input
            id="isVolunter"
            type="checkbox"
            name="isVolunteer"
            className="w-5"
            onChange={() => setIsVolunteer(!isVolunteer)}
          />
          <label htmlFor="isVolunter">
            Are you a volunteer? Sign up your organisation
          </label>
        </div>
        <Button className="py-6 text-lg hover:bg-secondary" onClick={onSubmit}>
          Sign in
        </Button>
      </div>
      <div className="mt-3 flex w-full items-center gap-2">
        <div className="h-[2px] bg-secondary w-full"></div>
        OR
        <div className="h-[2px] bg-secondary w-full"></div>
      </div>
      <p className="italic text-center">
        Don't have an account?
        <Link to="/register">
          <span className="text-primary"> Register Now</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
