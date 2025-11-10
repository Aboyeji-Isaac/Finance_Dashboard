// a tiny, well-typed utility to conditionally join classes
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
