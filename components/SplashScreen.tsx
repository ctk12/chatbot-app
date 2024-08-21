"use client"

import { useEffect } from 'react';
import SimpleBotGreeting from './SimpleBotGreeting';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 seconds delay for the splash screen

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <SimpleBotGreeting />
  );
};

export default SplashScreen;
