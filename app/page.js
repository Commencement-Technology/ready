import FAQ from "@/components/onpage/FAQ";
import Hero from "@/components/onpage/Hero";
import KeyFeatures from "@/components/onpage/KeyFeatures";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pt-36 pb-20 font-[family-name:var(--font-geist-sans)] max-w-[1300px] mx-auto">
      <main className="flex flex-col gap-36 py-20">
        <Hero />
        <Separator />
        <KeyFeatures />
        <Separator />
        <FAQ />
      </main>
    </div>
  );
}
