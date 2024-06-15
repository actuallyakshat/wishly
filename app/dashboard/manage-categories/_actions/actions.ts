"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function removeCategory(id: number) {
  try {
    await prisma.category.delete({ where: { id: id } });
    revalidatePath("/dashboard");
    return true;
  } catch (e) {
    return false;
  }
}

export async function editCategory(id: number, name: string) {
  try {
    await prisma.category.update({
      where: { id: id },
      data: { name: name },
    });
    revalidatePath("/dashboard");
    return true;
  } catch (e) {
    return false;
  }
}
