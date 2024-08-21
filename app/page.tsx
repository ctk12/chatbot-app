"use client"

import Chat from "@/components/Chat";
import SplashScreen from "@/components/SplashScreen";
import { useState } from "react";

export default function Home() {
  const [isSplashScreenVisible, setSplashScreenVisible] = useState(true);

  const handleSplashFinish = () => {
    setSplashScreenVisible(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:px-24">
      {isSplashScreenVisible ? (
        <>
        <SplashScreen onFinish={handleSplashFinish} />
        </>
      ) : (
        <Chat />
      )}
    </main>
  );
}
