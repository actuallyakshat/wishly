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

type Checked = DropdownMenuCheckboxItemProps["checked"];
const emails = [
  {
    id: 1,
    email: "test@test.com",
    active: true,
  },
  {
    id: 2,
    email: "test2@test.com",
    active: false,
  },
  {
    id: 3,
    email: "test3@test.com",
    active: true,
  },
];

export function SelectEmails() {
  const [emailsDemo, setEmailsDemo] = React.useState(emails);
  const { user } = useClientAuth();

  useEffect(() => {
    console.log(emailsDemo);
  }, [emailsDemo]);

  if (!user) return <></>;

  return (
    <div className="space-y-3">
      <Label className="text-md">
        <h4>Emails</h4>
        <p className="text-sm text-muted-foreground">
          Select the emails on which you wish to receive the notifications.
        </p>
      </Label>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {user?.primaryEmail} <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuLabel>Emails</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.emails.map((email) => (
            <DropdownMenuCheckboxItem
              key={email.id}
              checked={email.active}
              onCheckedChange={(checked) => {
                setEmailsDemo((emails) =>
                  emails.map((e) =>
                    e.id === email.id ? { ...e, active: checked } : e
                  )
                );
              }}
            >
              {email.email}
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <AddEmailModal />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function AddEmailModal() {
  const [open, setOpen] = React.useState(false);
  const [verifyOTP, setVerifyOTP] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          className="flex items-center justify-center gap-1 w-full"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Add email <PlusIcon size={16} />
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        {verifyOTP ? <VerifyEmail /> : <AddEmail setVerifyOTP={setVerifyOTP} />}
      </DialogContent>
    </Dialog>
  );
}

function AddEmail({
  setVerifyOTP,
}: {
  setVerifyOTP: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
          setVerifyOTP(true);
        }}
      >
        <div className="space-y-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="johndoe@example.com" type="email" />
          <Button type="button">Add Email</Button>
        </div>
      </form>
    </>
  );
}

function VerifyEmail() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Verify Email</DialogTitle>
        <DialogDescription>
          Enter the 6-digit code sent to your email address.
        </DialogDescription>
      </DialogHeader>
      <InputOTP maxLength={6} onChange={(value: string) => console.log(value)}>
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
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </>
  );
}
