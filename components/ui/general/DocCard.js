import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import Link from "next/link";

const DocCard = ({ id, title, author, thumbnail }) => {
  return (
    <Card className="h-[100%] hover:bg-gray-200">
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
