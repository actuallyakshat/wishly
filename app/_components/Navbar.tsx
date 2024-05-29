import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="w-full border-b fixed bg-background h-16 top-0 left-0 z-50">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-full px-4 mx-auto">
        <Link
          href={user ? "/dashboard" : "/"}
          className="font-extrabold text-xl"
        >
          Wishly
        </Link>
        <div>
          <SignedIn>
            <Link href={"/dashboard"}>
              <Button variant={"ghost"}>Dashboard</Button>
            </Link>
            <SignOutButton>
              <Button variant={"ghost"}>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant={"ghost"} className="font-medium text-sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
