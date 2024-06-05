"use client";
import React from "react";
const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-2 bg-background">
      <div className="bg-alternative size-14 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
      <div className="bg-alternative size-14 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
      <div className="bg-alternative size-14 animate-bounce rounded-full"></div>
    </div>
  );
};

export default Loading;
