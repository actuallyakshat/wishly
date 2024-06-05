import Image from "next/image";
import Navbar from "./_components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/db";

const headingGradient =
  "bg-gradient-to-br from-lime-400 to-lime-600 text-transparent bg-clip-text inline-block";

export default async function Home() {
  const user = await currentUser();
  return (
    <main>
      <Navbar />
      <section className="herobg mx-auto grid h-full min-h-screen grid-cols-2 gap-8 px-6 pb-20 pt-40">
        <div className="col-span-2 flex flex-col items-center justify-center gap-4 xl:col-span-1 xl:items-start xl:pl-20">
          <h1 className="max-w-xl text-center text-5xl font-black leading-[1.10] md:text-7xl xl:text-start">
            <span className={`${headingGradient} mr-2`}>We Remember, </span>
            So That You
            <span className={`${headingGradient} ml-2`}>
              Don&apos;t Have To.
            </span>
          </h1>
          <p className="max-w-lg text-center text-lg font-medium text-muted-foreground xl:text-start">
            Wishly helps you set reminder for those special days you can&apos;t
            afford to forget. Get started today for free.
          </p>
          <div className="flex items-center justify-center xl:justify-start">
            <Link href={user ? "/dashboard" : "/sign-up"} className="w-full">
              <Button className="w-fit" variant={"alternative"}>
                {user ? "Dashboard" : "Get Started"}
              </Button>
            </Link>
          </div>
        </div>
        <div className="col-span-1 hidden h-full items-center justify-center xl:flex">
          <Image
            src="/hero-graphic.svg"
            alt={"Person marking a calendar"}
            width={1000}
            height={500}
            className="w-full max-w-[45rem]"
          />
        </div>
      </section>
    </main>
  );
}
