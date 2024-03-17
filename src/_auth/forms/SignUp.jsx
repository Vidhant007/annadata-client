import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [creds, setCreds] = useState({
    email: "",
    username: "",
    password: "",
    phone: "",
    isVolunteer: false,
    organisation: "",
  });

  const onType = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setCreds((prevCreds) => ({
      ...prevCreds,
      [name]: newValue,
    }));
  };

  const onSubmit = async () => {
    try {
      console.log(creds);
      let response;
      if (creds.isVolunteer) {
        // If user is a volunteer, hit the volunteer registration endpoint
        response = await axios.post(
          "http://localhost:8000/api/user/registerVolunteer",
          creds
        );
      } else {
        // If user is not a volunteer, hit the regular registration endpoint
        response = await axios.post(
          "http://localhost:8000/api/user/registerDonor",
          creds
        );
      }
      console.log(response.data);
      const { username, _id, email, points } = response.data;

      // Add isVolunteer field to user information
      const userInfo = {
        username,
        _id,
        email,
        points,
        isVolunteer: creds.isVolunteer,
      };

      // Store user information in local storage
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Store token in local storage
      if (creds.isVolunteer) {
        navigate("/hotspot-areas");
      }
      navigate("/home");

      // Optionally, you can redirect the user to a different page after successful registration
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error
    }
  };

  return (
    <div className="w-full flex flex-col">
      <p className="font-bold text-4xl">Welcome</p>
      <p className="text-muted-foreground font-semibold text-lg mt-2">
        {" "}
        <span className="text-primary">Sign up</span> to create your account
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
          type="username"
          name="username"
          placeholder="Username"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.username}
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
        <Input
          type="number"
          name="phone"
          placeholder="Phone number"
          className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
          value={creds.phone}
          onChange={onType}
        />
        <div className="flex items-center gap-2">
          <Input
            id="isVolunter"
            type="checkbox"
            name="isVolunteer"
            className="w-5"
            onChange={onType}
          />
          <label htmlFor="isVolunter">
            Are you a volunteer? Sign up your organisation
          </label>
        </div>

        {creds.isVolunteer && (
          <Input
            type="text"
            name="organisation"
            placeholder="Organisation"
            className="focus:!ring-0 focus:!ring-offset-0 py-6 border-secondary transition-shadow focus:shadow-primary focus:shadow-md"
            value={creds.organisation}
            onChange={onType}
          />
        )}

        <Button className="py-6 text-lg hover:bg-secondary" onClick={onSubmit}>
          Sign up
        </Button>
      </div>
      <div className="mt-3 flex w-full items-center gap-2">
        <div className="h-[2px] bg-secondary w-full"></div>
        OR
        <div className="h-[2px] bg-secondary w-full"></div>
      </div>
      <p className="italic text-center">
        Already have an account?
        <Link to="/login">
          <span className="text-primary"> Login Now</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
