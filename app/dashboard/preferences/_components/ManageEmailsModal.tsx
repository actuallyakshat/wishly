import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Email } from "@prisma/client";
import { useClientAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { removeEmail } from "../_actions/actions";

export default function ManageEmailsModal({
  emails,
  setAllEmails,
}: {
  emails: Email[];
  setAllEmails: React.Dispatch<React.SetStateAction<Email[]>>;
}) {
  const { user } = useClientAuth();
  const [loadingEmailId, setLoadingEmailId] = useState<number | null>(null);

  async function handleRemoveEmail(emailId: number, email: string) {
    try {
      if (email === user?.primaryEmail) {
        toast.error("You cannot remove your primary email", {
          id: "email-remove",
        });
        return;
      }
      setLoadingEmailId(emailId);
      toast.loading("Removing email...", { id: "email-remove" });
      const response = await removeEmail(emailId, user?.id!);
      if (response) {
        toast.success("Email removed successfully", { id: "email-remove" });
        setAllEmails((emails) => emails.filter((e) => e.id !== emailId));
      } else {
        toast.error("Error removing email", { id: "email-remove" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: "email-remove" });
    } finally {
      setLoadingEmailId(null);
    }
  }

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"link"} className="text-sm" size={"sm"}>
            Manage
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Manage Emails</AlertDialogTitle>
            <AlertDialogDescription>
              You can remove emails from your list here.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div>
            {emails.map((email) => (
              <div
                key={email.id}
                className="flex items-center justify-between gap-2"
              >
                <p className="font-medium">{email.email}</p>
                <Button
                  variant={"link"}
                  className="text-sm"
                  size={"sm"}
                  onClick={() => handleRemoveEmail(email.id, email.email)}
                  disabled={loadingEmailId === email.id}
                >
                  {loadingEmailId === email.id ? "Removing" : "Remove"}
                </Button>
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
