import { GlobalContext } from "@/services/GlobalContext";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";

const DocCard = ({ id, title, author, thumbnail, uploadedBy }) => {
  const { user } = useContext(GlobalContext);

  return (
    <Card className="relative group h-[100%] hover:bg-gray-100 flex flex-col justify-between">
      {uploadedBy === user.$id && (
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
      </CardFooter>
    </Card>
  );
};

export default DocCard;
