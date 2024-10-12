import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const StatLinkCard = ({ title, description, destination }) => {
  return (
    <Link href={destination}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-xl md:text-3xl font-bold">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default StatLinkCard;
