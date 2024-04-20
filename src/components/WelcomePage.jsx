import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const router = useNavigate();
  return (
    <div
      style={{ background: "url(bg.png)" }}
      className="flex items-center justify-center h-screen w-screen"
    >
      <div className="w-[500px] p-20 bg-white/90 h-[400px] rounded-3xl flex flex-col justify-between items-center">
        <div>
          <h1 className="text-3xl text-center mb-3 font-bold">Welcome to</h1>
          <h1 className="logo-title">Employee Management UI Challenge</h1>
          <h1 className="title">
            Challenge by{" "}
            <i className="text-xl underline text-blue-900">Francis Baah</i>
          </h1>
        </div>
        <Button
          onClick={() => router("/Dashboard")}
          className="button-bar w-full"
        >
          See Challenge
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
