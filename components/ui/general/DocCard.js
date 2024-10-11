"use client";
import { GlobalContext } from "@/services/GlobalContext";
import { Bookmark, BookmarkX, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { useRouter } from "next/navigation";
import { Toggle } from "../toggle";

const DocCard = ({ id, title, author, thumbnail, uploadedBy }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { user, addToWishlist, deleteWishlistItem, wishlistedItems } =
    useContext(GlobalContext);
  const router = useRouter();

  const handleAddWishlist = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const res = await addToWishlist(id, user.$id);
  };

  const removeWishlistItem = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    const res = await deleteWishlistItem(id, user.$id);
  };

  const checkIfWishlisted = (id) => {
    const value = !!wishlistedItems.find((item) => item.docId === id);
    setIsWishlisted(value);
    return value;
  };

  useEffect(() => {
    checkIfWishlisted(id);
  }, [wishlistedItems]);

  return (
    <Card className="relative group h-[100%] hover:bg-gray-100 flex flex-col justify-between">
      {uploadedBy === user?.$id && (
        <>
          <Button
            className="absolute right-0 opacity-0 group-hover:opacity-100"
            title="Edit book"
            asChild
          >
            <Link href={`/book/${id}/edit`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </>
      )}
      <Link href={`/book/${id}`}>
        <CardHeader>
          <Image
            src={thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            alt="image"
            style={{ width: "100%", height: "auto", marginBottom: "0.625rem" }}
          />
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        {!!author && (
          <CardContent>
            <CardDescription className="line-clamp-3">{author}</CardDescription>
          </CardContent>
        )}
      </Link>
      <CardFooter>
        <Button asChild className="w-[100%]">
          <Link href={`/book/${id}/read`}>Read Now</Link>
        </Button>
        {isWishlisted ? (
          <Toggle
            variant="outline"
            className="ml-2"
            onClick={removeWishlistItem}
            title="Remove bookmark"
          >
            <BookmarkX />
          </Toggle>
        ) : (
          <Toggle
            variant="outline"
            className="ml-2"
            onClick={handleAddWishlist}
            title="Bookmark this"
          >
            <Bookmark />
          </Toggle>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocCard;
