import type { CollectionEntry } from "astro:content";
import { describe, expect, it } from "vitest";
import { sortBoardMembers } from "./board";

function member(name: string, order?: number): CollectionEntry<"board"> {
  return {
    data: { name, order, lang: "de" as const, role: "" },
    id: "",
  } as unknown as CollectionEntry<"board">;
}

describe("sortBoardMembers", () => {
  it("sorts by order ascending", () => {
    const members = [
      member("Charlie", 3),
      member("Alice", 1),
      member("Bob", 2),
    ];
    expect(sortBoardMembers(members).map((m) => m.data.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);
  });

  it("falls back to alphabetical for same order", () => {
    const members = [member("Bob", 1), member("Alice", 1)];
    expect(sortBoardMembers(members).map((m) => m.data.name)).toEqual([
      "Alice",
      "Bob",
    ]);
  });

  it("puts members without order at the end, sorted alphabetically", () => {
    const members = [member("Zara", 1), member("Beta"), member("Alpha")];
    expect(sortBoardMembers(members).map((m) => m.data.name)).toEqual([
      "Zara",
      "Alpha",
      "Beta",
    ]);
  });
});
