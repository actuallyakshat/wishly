"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function addCategory(name: string, userId: number) {
  try {
    const response = prisma.category.create({
      data: {
        name,
        userId,
      },
    });
    revalidatePath("/dashboard/add-event");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
