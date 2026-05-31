"use server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { db } from "@/db";
import { LacunaItem } from "./types";

export const saveItem = async (data: LacunaItem) => {
  const { title, description, content } = data;
  const id = nanoid();

  db.execute({
    sql: "insert into items (id, title, description, content) values (?, ?, ?, ?)",
    args: [id, title, description, content],
  });

  revalidatePath("/");
};

export const getAllItems = async () => {
  const result = await db.execute("SELECT * FROM items");
  return result.rows as unknown as LacunaItem[];
};

export const getItemById = async (id: string) => {
  const result = await db.execute({
    sql: "SELECT * FROM items WHERE id = ?",
    args: [id],
  });
  // return result.rows[0] as unknown as LacunaItem; // causes Next.js serialization issue
  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    content: row.content,
    created_at: row.created_at,
  } as LacunaItem;
};
