"use client";
import { GlobalContext } from "@/services/GlobalContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Upload = () => {
  const { loggedInUser } = useContext(GlobalContext);
  const router = useRouter();

  //   if (!loggedInUser) {
  //     return router.push("/login");
  //   }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="md:text-4xl">Upload Doc</h1>
      </main>
    </div>
  );
};

export default Upload;
