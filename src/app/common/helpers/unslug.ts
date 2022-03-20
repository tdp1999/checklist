// Transform a slug to a capitalized title
export function unslug(slug: string): string {
    return slug
        .toLowerCase() // lowercase
        .replace(/-/g, ' ') // replace - with space
        .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize first letter
}
