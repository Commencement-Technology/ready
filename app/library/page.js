"use client";
import BookCardSkeleton from "@/components/skeletons/BookCardSkeleton";
import DocTable from "@/components/tables/DocTable";
import DocCard from "@/components/ui/general/DocCard";
import ViewToggle from "@/components/ui/general/ViewToggle";
import { Separator } from "@/components/ui/separator";
import { GlobalContext } from "@/services/GlobalContext";
import { pinata } from "@/utils/config";
import { siteTitle } from "@/utils/content";
import { useContext, useEffect, useState } from "react";

const Library = () => {
  const { loading, getDocs, user } = useContext(GlobalContext);
  const [docs, setDocs] = useState([]);
  const [view, setView] = useState("grid");

  const getFiles = async () => {
    const files = await pinata.files.list();
  };

  useEffect(() => {
    let mounted = true;

    const fetchDocs = async () => {
      const res = await getDocs();

      if (mounted) {
        console.log(res);
        setDocs(res.documents);
      }
    };

    fetchDocs();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = `Library | ${siteTitle}`;
  }, []);

  return (
    <div className="max-w-[1300px] mx-auto p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl md:text-5xl">Library</h1>

      <div className="flex justify-between items-center mt-4">
        <div>Browse all the uploaded books</div>
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
        ) : docs.length !== 0 ? (
          view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {docs.map((doc) => (
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
            <div className="">
              <DocTable docs={docs} userId={user?.$id} />
            </div>
          )
        ) : (
          <div>Nothing</div>
        )}
      </div>
    </div>
  );
};

export default Library;
