"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

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

export async function editEvent(event: any) {
  try {
    console.log(event.recurring);
    await prisma.event.update({
      where: {
        id: event.id,
      },
      data: {
        name: event.name,
        description: event.description,
        date: event.date,
        categoryId: event.categoryId,
        reccuring: event.recurring,
      },
    });
    revalidatePath("/dashboard");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deleteEvent(id: number) {
  try {
    await prisma.event.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function toggleNotification(id: number) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
      select: {
        disableReminder: true,
      },
    });
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    console.log(event);
    const newDisableReminder = !event.disableReminder;
    await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        disableReminder: newDisableReminder,
      },
    });
    revalidatePath("/dashboard");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
