"use client";
import BookDetailsSkeleton from "@/components/skeletons/BookDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import { displayDate } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const BookDetails = () => {
  const [data, setData] = useState(null);

  const { getDoc, loading, user } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;

    const fetchDoc = async () => {
      const res = await getDoc(id);

      if (mounted) {
        setData(res);
      }
    };

    fetchDoc();

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    document.title = `${data?.title} | ${siteTitle}`;
  }, [data]);

  return (
    <div className="max-w-[1300px] mx-auto p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        {loading ? (
          <BookDetailsSkeleton />
        ) : !!data &&
          data.isPrivate &&
          !!data &&
          data.uploadedBy !== user?.$id ? (
          <div className="min-h-[60vh]">
            <h1 className="text-2xl md:text-5xl text-center font-bold">
              This book is now private
            </h1>
            <p className="text-center text-md mt-8">
              This book was set to &apos;private&apos; by the user and will not
              be visible to others.
            </p>
          </div>
        ) : !!data ? (
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col gap-4">
              <Image
                src={data.thumbnail}
                width={300}
                height={400}
                alt="image"
              />
              <Button asChild>
                <Link href={`/book/${id}/read`}>Read</Link>
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl md:text-4xl">{data.title}</h1>
              <p className="text-gray-400">
                Uploaded on {displayDate(data?.$createdAt)}
              </p>
              <p>{data?.author}</p>
              <p>{data.description}</p>
            </div>
          </div>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
