import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-white lg:grid lg:grid-cols-12">
      <div className="flex w-full flex-col items-center justify-center lg:col-span-5">
        <SignIn />
      </div>
      <div className="hidden h-screen w-full bg-yellow-500 lg:col-span-7 lg:flex">
        <Image
          alt=""
          src={"/signin.jpg"}
          width={1000}
          height={1000}
          className="w-full flex-1 object-cover"
        />
      </div>
    </section>
  );
}
