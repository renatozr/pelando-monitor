export const isSlug = (slug: string): boolean => {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  return slugPattern.test(slug)
}
