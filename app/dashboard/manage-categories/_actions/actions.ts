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

export async function editCategory(userId: number, id: number, name: string) {
  try {
    const nameUsedAlready = await prisma.category.findUnique({
      where: { name: name, userId: userId },
    });
    if (nameUsedAlready) {
      return { success: false, message: "Category name already used" };
    }
    const existingCategory = await prisma.category.findUnique({
      where: { id: id, userId: userId },
    });
    if (existingCategory) {
      await prisma.category.update({
        where: { id: id },
        data: { name: name },
      });
      revalidatePath("/dashboard");
      return { success: true, message: "Category updated" };
    } else {
      return { success: false, message: "Category not found" };
    }
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}
