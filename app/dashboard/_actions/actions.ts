"use server";

import prisma from "@/db";

export const getUserId = async (email: string) => {
  if (!email) return null;
  const user = await prisma.user.findFirst({
    where: {
      primaryEmail: email,
    },
    select: {
      id: true,
    },
  });
  return user?.id;
};
