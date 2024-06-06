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
    revalidatePath("/dashboard");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllCategories(userId: number) {
  try {
    const response = await prisma.category.findMany({
      where: {
        userId,
      },
      include: {
        events: {
          orderBy: {
            date: "asc",
          },
        },
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addEvent(event: any, userId: number) {
  try {
    const response = await prisma.event.create({
      data: {
        name: event.name,
        date: event.date,
        description: event.description,
        categoryId: event.category,
        reccuring: event.recurring,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
