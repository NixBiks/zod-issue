import { z } from "zod";

export const mySchema = z.object({
  name: z.string(),
  age: z.number(),
});
