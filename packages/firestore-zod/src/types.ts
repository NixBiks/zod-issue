import { z } from "zod";

// TODO make sure the validationSchema does not have reserved keywords
type ReservedNames = "docId";
export type ExtendedSchema = z.Schema<{ [k: string]: any }>;
