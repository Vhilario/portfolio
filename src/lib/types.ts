import type { Tags } from './tags'

export type Post = {
    title: string
    slug: string
    category: string
    description: string
    date: string
    tags: Tags[]
    thumbnail?: string
    published: boolean
}