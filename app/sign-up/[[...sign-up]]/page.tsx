import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-white lg:grid lg:grid-cols-12">
      <div className="col-span-7 hidden h-screen w-full lg:flex">
        <Image
          alt=""
          src={"/signup.jpg"}
          width={1000}
          height={1000}
          className="w-full flex-1 object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center lg:col-span-5">
        <SignUp />
      </div>
    </section>
  );
}
