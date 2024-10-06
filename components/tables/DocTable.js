import Link from "next/link";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DocTable = ({ docs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Title</TableHead>
          <TableHead className="w-[200px]">Author</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {docs.map((doc) => (
          <TableRow key={doc.$id}>
            <TableCell className="font-medium">{doc.title}</TableCell>
            <TableCell>{doc.author}</TableCell>
            <TableCell>{doc.description}</TableCell>
            <TableCell className="text-right">
              <Button asChild>
                <Link href={`/book/${doc.$id}/read`}>Read</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{docs.length} Docs</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DocTable;
