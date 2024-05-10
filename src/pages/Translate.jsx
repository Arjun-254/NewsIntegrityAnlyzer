import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { TranslateInterface } from "../components/TranslateInterface";
import { UserInterface } from "../components/UserInterface";

export const Translate = () => {
  return (
    <div className="flex flex-col no-scrollbar no-scrollbar overflow-y-auto max-h-screen">
      <Navbar />
      {/* <TranslateInterface /> */}
      <UserInterface/>
    </div>
  );
};
