import { Skeleton } from "../ui/skeleton";

const BookDetailsSkeleton = () => {
  return (
    <div className="flex flex-row gap-8">
      <Skeleton className="h-[200px] w-[250px] rounded-xl" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
