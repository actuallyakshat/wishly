import React from "react";
import Sidebar from "./_components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <div className="pt-10 lg:pl-72 lg:pt-0">{children}</div>
    </div>
  );
}
