"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
import { ChevronDown, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useClientAuth } from "@/providers/auth-provider";
import generateOTP from "@/lib/generateOtp";
import { sendotp, verifyotp } from "@/lib/email-methods/emailMethods";
import { addEmail } from "../_actions/actions";
import { Email } from "@prisma/client";
import ManageEmailsModal from "./ManageEmailsModal";
import { toast } from "sonner";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function SelectEmails({
  allEmails,
  setAllEmails,
}: {
  allEmails: Email[];
  setAllEmails: React.Dispatch<React.SetStateAction<Email[]>>;
}) {
  const { user } = useClientAuth();

  useEffect(() => {}, [allEmails]);

  const handleCheckedChange = (emailId: string, checked: boolean) => {
    setAllEmails((emails) =>
      emails.map((e) => (e.email === emailId ? { ...e, active: checked } : e)),
    );
  };

  if (!user) return <></>;

  return (
    <div className="space-y-3">
      <div className="flex w-full items-center justify-between gap-2">
        <Label className="text-md">
          <h4>Emails</h4>
          <p className="text-sm text-muted-foreground">
            Select the emails on which you wish to receive the notifications.
          </p>
        </Label>
        <ManageEmailsModal emails={allEmails} setAllEmails={setAllEmails} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex w-full items-center justify-between gap-2"
          >
            {allEmails.find((email) => email.active)?.email ||
              "No Email Selected"}{" "}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[24rem]">
          <DropdownMenuLabel>Emails</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allEmails.map((email) => (
            <DropdownMenuCheckboxItem
              key={email.id}
              checked={email.active}
              onCheckedChange={(checked) =>
                handleCheckedChange(email.email, checked)
              }
            >
              {email.email}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <AddEmailModal setAllEmails={setAllEmails} allEmails={allEmails} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function AddEmailModal({
  setAllEmails,
  allEmails,
}: {
  setAllEmails: React.Dispatch<React.SetStateAction<Email[] | []>>;
  allEmails: Email[];
}) {
  const [open, setOpen] = React.useState(false);
  const [verifyOTP, setVerifyOTP] = React.useState(false);
  const [email, setEmail] = React.useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex w-full items-center justify-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Add email <PlusIcon size={16} />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        {verifyOTP ? (
          <VerifyEmail
            email={email}
            setAllEmails={setAllEmails}
            setAddEmailModal={setOpen}
          />
        ) : (
          <AddEmail
            allEmails={allEmails}
            setEmail={setEmail}
            email={email}
            setVerifyOTP={setVerifyOTP}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function AddEmail({
  setVerifyOTP,
  email,
  setEmail,
  allEmails,
}: {
  setVerifyOTP: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  allEmails: Email[];
}) {
  const [loading, setLoading] = React.useState(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  async function handleAddEmail() {
    if (!email) {
      toast.error("Please enter an email");
      return;
    }
    setLoading(true);
    if (allEmails.find((e) => e.email === email)) {
      setLoading(false);
      toast.error("Email already exists");
      return;
    }
    await sendotp(email);
    setLoading(false);
    setVerifyOTP(true);
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add an email</DialogTitle>
        <DialogDescription>
          Add an email address you wish to receive notifications on.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="johndoe@example.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={() => handleAddEmail()}
            type="button"
            disabled={loading}
          >
            {loading ? "Loading" : "Add Email"}
          </Button>
        </div>
      </form>
    </>
  );
}

function VerifyEmail({
  email,
  setAllEmails,
  setAddEmailModal,
}: {
  email: string;
  setAllEmails: React.Dispatch<React.SetStateAction<Email[]>>;
  setAddEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { refreshUser } = useClientAuth();
  const { user } = useClientAuth();
  const userId = user?.id;
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleVerification = async () => {
    try {
      if (!user) return;
      setLoading(true);
      const isValid = await verifyotp(email, Number(value));
      if (isValid) {
        const response = await addEmail(email, userId!);
        refreshUser();
        setAddEmailModal(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Verify Email</DialogTitle>
        <DialogDescription>
          Enter the 6-digit code sent to your email address.
        </DialogDescription>
      </DialogHeader>
      <InputOTP maxLength={6} onChange={(value: string) => setValue(value)}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <DialogFooter>
        <Button onClick={handleVerification} disabled={loading}>
          {loading ? "Loading" : "Submit"}
        </Button>
      </DialogFooter>
    </>
  );
}
