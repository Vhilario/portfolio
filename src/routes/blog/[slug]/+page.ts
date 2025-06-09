import { error } from '@sveltejs/kit'

export async function load({ params }) {
  try {
    const post = await import(`../../../posts/${params.slug}.md`)
    if (!post.metadata.published)
      throw new Error()
    return {
      content: post.default,
      meta: post.metadata,
    }
  } catch (e) {
    error(404, `could not find ${params.slug}`)
  }
}