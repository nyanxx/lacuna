import * as z from "zod";

export const ItemSchema = z.object({
  id: z.string(),
  title: z.string().max(30).nonempty(),
  description: z.string(),
  content: z.string().nonempty(),
});
