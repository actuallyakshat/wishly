"use server";

import prisma from "@/db";
import { Email, EmailPreference } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addEmail(email: string, userId: number) {
  try {
    const newEmail = await prisma.email.create({
      data: {
        email,
        userId,
      },
    });
    return newEmail;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

type saveChangesProps = {
  emailFrequency: any;
  emails: Email[];
  userId: number;
  timezone: string;
  name: string | null;
};

export async function saveChanges(payload: saveChangesProps) {
  const { emailFrequency, userId, timezone, name, emails } = payload;

  try {
    const updatedUser = await prisma.$transaction(async (prisma) => {
      // Update user details
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          timeZone: timezone,
          name: name,
        },
      });

      // Upsert email preferences
      await prisma.emailPreference.upsert({
        where: { userId: userId },
        update: emailFrequency,
        create: {
          ...emailFrequency,
          userId: userId,
        },
      });

      // Upsert emails
      for (const email of emails) {
        await prisma.email.upsert({
          where: { id: email.id },
          update: {
            email: email.email,
            active: email.active,
            updatedAt: new Date(email.updatedAt),
          },
          create: {
            email: email.email,
            active: email.active,
            createdAt: new Date(email.createdAt),
            updatedAt: new Date(email.updatedAt),
            userId: userId,
          },
        });
      }

      return user;
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function removeEmail(emailIdToDelete: number, userId: number) {
  try {
    const email = await prisma.email.findFirst({
      where: { id: emailIdToDelete, userId: userId },
    });

    if (!email) {
      console.log("Email not found");
      return false;
    }

    await prisma.email.delete({
      where: { id: emailIdToDelete },
    });

    console.log("Email deleted successfully");
    return true;
  } catch (e) {
    console.error("Error deleting email:", e);
    return false;
  }
}
