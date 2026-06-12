import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { PAST_EVENTS_MONTHS } from "~/site-config";
import { Locale } from "~/config";

export async function getUpcomingEvents(
  locale: Locale = Locale.De,
  limit?: number,
): Promise<CollectionEntry<"events">[]> {
  const events = await getCollection(
    "events",
    ({ data }) => data.lang === locale,
  );
  const upcoming = events
    .filter((e) => !e.data.visibilityEnd || e.data.visibilityEnd >= new Date())
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getPastEvents(
  locale: Locale = Locale.De,
): Promise<CollectionEntry<"events">[]> {
  const events = await getCollection(
    "events",
    ({ data }) => data.lang === locale,
  );
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - PAST_EVENTS_MONTHS);
  return events
    .filter(
      (e) =>
        e.data.visibilityEnd &&
        e.data.visibilityEnd < new Date() &&
        e.data.date >= cutoffDate,
    )
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
