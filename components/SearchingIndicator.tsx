"use client"

import React from 'react';
import Image from "next/image";

const SearchingIndicator: React.FC = () => {
  return (
    <div className="flex w-full justify-center items-center h-screen bg-white">
      <div className="text-center">
        <Image
            src="/bot-search.svg"
            width={100}
            height={100}
            alt="Picture of the author"
        />
        <p className="text-gray-500 text-lg font-medium">Searching..</p>
      </div>
    </div>
  );
};

export default SearchingIndicator;
