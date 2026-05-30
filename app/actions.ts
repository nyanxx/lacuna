"use server";
import { revalidatePath } from "next/cache";
import { DataObject, dataObjects } from "./data/items";
import { nanoid } from "nanoid";

export const saveItem = async (data: DataObject) => {
  const { title, description, content } = data;
  const newItem: DataObject = {
    id: nanoid(),
    title,
    description,
    content,
  };

  dataObjects.push(newItem);
  revalidatePath("/");
};
