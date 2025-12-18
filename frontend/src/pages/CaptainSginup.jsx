import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainSginup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle signup logic here
    setUserData({
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
          <div className="flex gap-4 mb-5">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              required
              placeholder="First name"
            />

            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              required
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's our Captain's email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
            required
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the Google
         <span className="underline"> Privacy Policy </span>
          and
         <span className="underline"> Terms of Service </span>
          apply.
        </p>
      </div>
    </div>
  );
};

export default CaptainSginup;
