import { vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

vi.mock("astro:assets", () => ({
  getImage: vi.fn(),
}));
