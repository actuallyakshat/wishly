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
      <section className="px-6 pt-40 pb-20 min-h-screen h-full grid grid-cols-2 gap-8 mx-auto herobg">
        <div className="col-span-2 xl:col-span-1 flex flex-col gap-4 xl:pl-20 items-center xl:items-start justify-center">
          <h1 className="font-black text-5xl md:text-7xl leading-[1.10] max-w-xl text-center xl:text-start">
            <span className={`${headingGradient} mr-2`}>We Remember, </span>
            So That You
            <span className={`${headingGradient} ml-2`}>
              Don&apos;t Have To.
            </span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-lg text-center xl:text-start">
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
        <div className="col-span-1 xl:flex items-center justify-center h-full hidden ">
          <Image
            src="/hero-graphic.svg"
            alt={"Person marking a calendar"}
            width={1000}
            height={500}
            className="max-w-[45rem] w-full"
          />
        </div>
      </section>
    </main>
  );
}
