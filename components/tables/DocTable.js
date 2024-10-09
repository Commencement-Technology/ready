import { GlobalContext } from "@/services/GlobalContext";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import ConfirmationDialogContent from "../dialog/ConfirmationDialogContent";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useToast } from "@/hooks/use-toast";
import { displayDate } from "@/utils/functions";

const DocTable = ({ docs, userId }) => {
  const { deleteDoc } = useContext(GlobalContext);
  const { toast } = useToast();

  const removeDoc = async (id) => {
    const res = await deleteDoc(id);

    if (!!res) {
      toast({
        title: "Book deleted!",
        description: "Your book has been removed from the library",
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[240px]">Title</TableHead>
          <TableHead className="w-[200px]">Author</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="w-[120px]">Uploaded at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {docs.map((doc) => (
          <TableRow key={doc.$id}>
            <Link href={`/book/${doc.$id}`}>
              <TableCell className="font-medium hover:underline">
                {doc.title}
              </TableCell>
            </Link>
            <TableCell title={!!doc.author ? `${doc?.author}` : `No author`}>
              {!!doc.author ? doc.author : "-"}
            </TableCell>
            <TableCell
              title={
                !!doc.description ? `${doc?.description}` : `No description`
              }
            >
              {!!doc.description ? doc.description : "-"}
            </TableCell>
            <TableCell>{displayDate(doc?.$createdAt)}</TableCell>
            <TableCell className="text-right flex gap-2">
              <Button asChild>
                <Link href={`/book/${doc.$id}/read`}>Read</Link>
              </Button>
              {userId === doc.uploadedBy && (
                <>
                  <Button asChild variant="outline" title="Edit">
                    <Link href={`/book/${doc.$id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant="destructive" title="Delete">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <ConfirmationDialogContent
                      title={"Delete this book?"}
                      description={
                        "This action cannot be undone. This will permanently delete your book and remove it from our servers."
                      }
                      actionTitle={"Delete"}
                      action={() => {
                        removeDoc(doc.$id);
                      }}
                    />
                  </Dialog>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{docs.length} Docs</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DocTable;
