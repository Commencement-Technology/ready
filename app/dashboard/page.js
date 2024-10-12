"use client";
import StatLinkCard from "@/components/cards/StatLinkCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalContext } from "@/services/GlobalContext";
import { useContext } from "react";

const Dashboard = () => {
  const { user, wishlistedItems, docsUploadedBy } = useContext(GlobalContext);

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
              <h2 className="text-xl md:text-2xl font-medium">Overview</h2>
              <section className="my-4 flex flex-col sm:flex-row gap-4">
                <StatLinkCard
                  title={"Books Wishlisted"}
                  description={wishlistedItems?.length}
                  destination={"/user/wishlist"}
                />
                <Card>
                  <CardHeader>
                    <CardTitle>Books Uploaded</CardTitle>
                    <CardDescription className="text-xl md:text-3xl font-bold">
                      {docsUploadedBy?.length}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </section>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
