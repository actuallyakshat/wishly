"use server";

import prisma from "@/db";

export async function getUser(email: string) {
  try {
    if (!email) {
      return { status: 400, error: "Email is required" };
    }
    const user = await prisma.user.findFirst({
      where: { primaryEmail: email },
      include: {
        events: true,
        emails: true,
        emailPreferences: true,
      },
    });
    if (!user) {
      const createdUser = await prisma.user.create({
        data: {
          primaryEmail: email,
          timeZone: "Asia/Kolkata",
        },
      });
      await prisma.emailPreference.create({
        data: {
          userId: createdUser.id,
          emailOneWeekBefore: false,
          emailOneDayBefore: false,
          emailOnDate: true,
        },
      });
      const newUser = await prisma.user.findFirst({
        where: { primaryEmail: email },
        include: {
          events: true,
          emails: true,
          emailPreferences: true,
        },
      });
      return { status: 201, user: newUser };
    }
    return { status: 200, user };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Internal server error" };
  }
}
