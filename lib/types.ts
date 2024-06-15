import { Category, Event } from "@prisma/client";

export type EventWithCategory = Event & {
  category: Category | null;
};
