import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="flex flex-col gap-8 items-center">
      <h1 className="text-5xl md:text-7xl text-center font-bold max-w-[900px]">
        Upload, Read, & Access Your PDFs
      </h1>
      <p className="md:text-2xl text-center">
        Manage and read your personal library of PDF files. Anytime access from
        any device.
      </p>
      <div className="mt-4 text-center">
        <Button className="py-8 px-12 text-lg" asChild>
          <Link href={`/upload`} className="text-xl">
            Upload Your First PDF Now!
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
