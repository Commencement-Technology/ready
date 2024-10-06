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

const DocCard = ({ id, title, description, url, thumbnail }) => {
  return (
    <Card className="h-[100%]">
      <Link href={`/book/${id}`}>
        <CardHeader>
          <Image
            src={thumbnail}
            width={0}
            height={0}
            sizes="100vw"
            alt="image"
            style={{ width: "100%", height: "auto" }}
          />
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        {!!description && (
          <CardContent>
            <CardDescription className="line-clamp-3">
              {description}
            </CardDescription>
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
