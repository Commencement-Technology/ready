"use client";
import BookDetailsSkeleton from "@/components/skeletons/BookDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GlobalContext } from "@/services/GlobalContext";
import { siteTitle } from "@/utils/content";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";

const BookDetails = () => {
  const [data, setData] = useState(null);

  const { getDoc, loading } = useContext(GlobalContext);
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;

    const fetchDoc = async () => {
      const res = await getDoc(id);

      if (mounted) {
        console.log(res);
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
