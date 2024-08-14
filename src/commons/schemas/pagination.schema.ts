import { z } from "zod";

export const PaginationSchema = z.object({
	page: z.number().positive().default(1),
	limit: z.number().positive().max(100).default(10)
});

export type Pagination = z.infer<typeof PaginationSchema>;
