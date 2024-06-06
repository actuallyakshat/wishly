"use client";
import React from "react";
const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center space-x-2 bg-background">
      <div className="size-14 animate-bounce rounded-full bg-alternative [animation-delay:-0.3s]"></div>
      <div className="size-14 animate-bounce rounded-full bg-alternative [animation-delay:-0.15s]"></div>
      <div className="size-14 animate-bounce rounded-full bg-alternative"></div>
    </div>
  );
};

export default Loading;
