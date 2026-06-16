import type { CollectionEntry } from "astro:content";

const DEFAULT_ORDER = 99;

function effectiveOrder(member: CollectionEntry<"board">): number {
  return member.data.order ?? DEFAULT_ORDER;
}

export function sortBoardMembers(
  members: CollectionEntry<"board">[],
): CollectionEntry<"board">[] {
  return members.toSorted((a, b) => {
    const orderDiff = effectiveOrder(a) - effectiveOrder(b);
    return orderDiff !== 0 ? orderDiff : a.data.name.localeCompare(b.data.name);
  });
}
