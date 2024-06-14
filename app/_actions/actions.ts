"use server";

import prisma from "@/db";

export async function getUser(email: string, fullName: string) {
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
        categories: true,
      },
    });
    if (!user) {
      const createdUser = await prisma.user.create({
        data: {
          name: fullName,
          primaryEmail: email,
          timeZone: "Asia/Kolkata",
          emails: {
            create: {
              email: email,
            },
          },
          emailPreferences: {
            create: {
              emailOneWeekBefore: false,
              emailOneDayBefore: false,
              emailOnDate: true,
            },
          },
        },
        include: {
          events: true,
          emails: true,
          emailPreferences: true,
          categories: true,
        },
      });
      return { status: 201, user: createdUser };
    }
    return { status: 200, user };
  } catch (error) {
    console.log(error);
    return { status: 500, error: "Internal server error" };
  }
}
