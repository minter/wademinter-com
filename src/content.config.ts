import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    featured_image: z.string(),
    image_position: z.string().optional(),
    permalink: z.string(),
    date: z.coerce.date(),
    sort_order: z.number(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured_image: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { projects, blog }
