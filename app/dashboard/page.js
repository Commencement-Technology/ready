"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalContext } from "@/services/GlobalContext";
import { useContext } from "react";

const Dashboard = () => {
  const { wishlistedItems } = useContext(GlobalContext);

  return (
    <div className="p-8 pt-24 pb-20 font-[family-name:var(--font-geist-sans)] max-w-[1300px] mx-auto">
      <main>
        <section className="flex flex-col gap-4 mb-8">
          <h1 className="text-2xl md:text-4xl font-bold">Dashboard</h1>
        </section>
        <section>
          <Tabs defaultValue="overview" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <h2>Overview</h2>
              <p>{wishlistedItems?.length}</p>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
