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
    <nav className="fixed left-0 top-0 z-50 h-16 w-full border-b bg-background">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-4">
        <Link
          href={user ? "/dashboard" : "/"}
          className="text-xl font-extrabold"
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
              <Button variant={"ghost"} className="text-sm font-medium">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
