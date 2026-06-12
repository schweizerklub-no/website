import type { Locale } from "~/config";
import { de } from "./de";
import { no } from "./no";

export type { Locale };

export const UI = { de, no } as const;
