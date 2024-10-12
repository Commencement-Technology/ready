"use client";
import BookCardSkeleton from "@/components/skeletons/BookCardSkeleton";
import DocTable from "@/components/tables/DocTable";
import DocCard from "@/components/ui/general/DocCard";
import ViewToggle from "@/components/ui/general/ViewToggle";
import { Separator } from "@/components/ui/separator";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import { useContext, useEffect, useState } from "react";

const Wishlist = () => {
  const [view, setView] = useState("grid");
  const { loading, wishlistedItems, user } = useContext(GlobalContext);

  useEffect(() => {
    document.title = `Your Wishlist | ${siteTitle}`;
  }, []);

  // useEffect(() => {
  //   console.log(wishlistedItems);
  // }, [wishlistedItems]);

  return (
    <div className="max-w-[1300px] mx-auto p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl md:text-5xl font-bold">Wishlist</h1>

      <div className="flex justify-between items-center mt-4">
        <div>Browse all your wishlisted books</div>
        <ViewToggle handleValueChange={(e) => setView(e)} />
      </div>

      <Separator className="my-4" />

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16">
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
          </div>
        ) : wishlistedItems.length !== 0 ? (
          view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {wishlistedItems.map((doc) => (
                <DocCard
                  key={doc.$id}
                  id={doc.$id}
                  title={doc.title}
                  author={doc.author}
                  thumbnail={doc.thumbnail}
                  uploadedBy={doc.uploadedBy}
                />
              ))}
            </div>
          ) : (
            <div>
              <DocTable docs={wishlistedItems} userId={user?.$id} />
            </div>
          )
        ) : (
          <div>No wishlist item found</div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
