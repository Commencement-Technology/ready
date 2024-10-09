import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-[1300px] mx-auto p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl md:text-5xl font-bold">About Ready</h1>

      <div className="flex justify-between items-center mt-4">
        <div>Simply put, a place for you to store your books!</div>
      </div>

      <Separator className="my-4" />

      <section className="flex flex-col gap-4 max-w-[700px]">
        <p>
          Have you always wanted to write a story of your own but too shy or
          reluctant to put it forward? Be{" "}
          <span className="text-red-400 font-bold">Ready</span> then!
        </p>
        <p>
          <span className="text-red-400 font-bold">Ready</span> is an online
          place that is built for you and your books!
        </p>
        <ul>
          <li>1. Sign in</li>
          <li>2. Upload</li>
          <li>3. That&apos;s it!</li>
        </ul>
      </section>
      <div className="mt-12 text-center">
        <Button className="py-8 px-28 text-lg" asChild>
          <Link href={`/upload`} className="text-xl">
            Get Started!
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default About;
