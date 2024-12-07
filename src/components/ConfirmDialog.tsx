import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";

type Props = DialogProps & {
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
};

const ConfirmDialog = ({ title, description, ...props }: Props) => {
  return (
    <Dialog {...props}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title ?? "Title"}</DialogTitle>
          <DialogDescription>
            {description ?? "Dialog description"}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
