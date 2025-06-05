import { z } from "zod";

export const Schema = z.object({
	title: z.string(),
	category: z.string(),
	date: z.string(),
	description: z.string(),
	image: z.string().optional(),
	tags: z.array(z.string()),
});

export type Schema = z.infer<typeof Schema>;
