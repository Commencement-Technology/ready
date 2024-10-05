import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";

const DocCard = ({ title, description, url, thumbnail }) => {
  return (
    <Card>
      <CardHeader>
        <Image src={thumbnail} width={200} height={300} alt="image" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default DocCard;
