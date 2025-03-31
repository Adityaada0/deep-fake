import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    // Mock login - store user in localStorage
    localStorage.setItem("user", JSON.stringify({ email }));
    toast.success("Login successful!");
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col justify-center items-start h-screen w-80 m-auto">
        <div className="border rounded-2xl p-12 flex flex-col gap-8">
          <h1 className="text-left font-bold text-2xl">Welcome Back</h1>
          <div className="flex flex-col justify-center items-start w-80 gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col justify-center items-start w-80 gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Button
              type="submit"
              className="w-full bg-[#398D8D] hover:bg-[#2e6e6e]"
            >
              Login
            </Button>
            <div>
              <p>Don't have an account?</p>
              <Link to={"/register"} className="underline">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
