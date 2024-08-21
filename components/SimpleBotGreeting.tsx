"use client"

import React from 'react';
import Image from "next/image";

const SimpleBotGreeting: React.FC = () => {
  return (
    <div className="flex w-full justify-center items-center h-screen bg-white">
      <div className="text-center">
        <Image
            src="/bot.svg"
            width={100}
            height={100}
            alt="Picture of the author"
        />
        <p className="text-black text-lg font-semibold">Hello!</p>
      </div>
    </div>
  );
};

export default SimpleBotGreeting;
