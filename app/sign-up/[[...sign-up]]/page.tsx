import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="bg-background w-full grid grid-cols-12">
      <div className="w-full h-screen flex col-span-7 bg-yellow-500">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="object-cover w-full flex-1"
        />
      </div>
      <div className="col-span-5 flex flex-col justify-center items-center">
        <SignUp />
      </div>
    </section>
  );
}
