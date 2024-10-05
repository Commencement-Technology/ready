"use client";
import { GlobalContext } from "@/services/GlobalContext";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";

const BookDetails = () => {
  const [data, setData] = useState(null);

  const { getDoc } = useContext(GlobalContext);
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

  return (
    <div className="max-w-[1300px] mx-auto p-8 pt-32 pb-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        {!!data ? (
          <div className="flex flex-row gap-8">
            <Image src={data.thumbnail} width={300} height={400} alt="image" />
            <div className="flex flex-col gap-2">
              <h1>{data.title}</h1>
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
