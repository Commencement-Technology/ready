import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const ConfirmationDialogContent = ({
  title,
  description,
  actionTitle,
  action,
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <Button type="submit" variant="destructive" onClick={action}>
            {actionTitle}
          </Button>
        </DialogFooter>
      </DialogHeader>
    </DialogContent>
  );
};

export default ConfirmationDialogContent;
