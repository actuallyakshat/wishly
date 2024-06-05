import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="grid w-full grid-cols-12 bg-background">
      <div className="col-span-7 flex h-screen w-full bg-yellow-500">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="w-full flex-1 object-cover"
        />
      </div>
      <div className="col-span-5 flex flex-col items-center justify-center">
        <SignUp />
      </div>
    </section>
  );
}
