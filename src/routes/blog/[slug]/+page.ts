import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  try {
    const post = await import(`../content/${params.slug}.svx`)
    return { post }
  } catch (e) {
    return { post: null }
  }
}
