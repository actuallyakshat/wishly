"use server";

import prisma from "@/db";

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
  userId: number;
  timezone: string;
  name: string | null;
};

export async function saveChanges(payload: saveChangesProps) {
  try {
    const { emailFrequency, userId, timezone, name } = payload;
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailPreferences: emailFrequency,
        timeZone: timezone,
        name: name,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
