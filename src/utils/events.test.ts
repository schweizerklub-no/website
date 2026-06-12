import { beforeEach, describe, expect, it, vi } from "vitest";
import { getPastEvents, getUpcomingEvents } from "~/utils/events";

const NOW = new Date("2026-06-12T12:00:00Z");
const PAST = new Date("2026-04-01T12:00:00Z");
const RECENT_PAST = new Date("2026-05-01T12:00:00Z");
const FAR_PAST = new Date("2025-01-01T12:00:00Z");
const FUTURE = new Date("2026-08-01T12:00:00Z");

vi.mock("astro:content", () => {
  const makeEntry = (
    lang: string,
    title: string,
    date: Date,
    visibilityEnd?: Date | null,
  ) => ({
    id: `${lang}/${title}`,
    body: "Some content",
    data: { lang, title, date, visibilityEnd: visibilityEnd ?? null },
  });

  return {
    getCollection: vi.fn(
      async (
        _collection: string,
        filter?: (entry: { data: { lang: string } }) => boolean,
      ) => {
        const all = [
          makeEntry("de", "bundesfeier", PAST),
          makeEntry("de", "stammtisch", FUTURE),
          makeEntry("de", "hidden-event", RECENT_PAST, RECENT_PAST),
          makeEntry("de", "old-expired", FAR_PAST, FAR_PAST),
          makeEntry("no", "bundesfeier", PAST),
          makeEntry("no", "stammtisch", FUTURE),
        ];

        if (filter) {
          return all.filter(filter);
        }
        return all;
      },
    ),
  };
});

beforeEach(() => {
  vi.setSystemTime(NOW);
});

describe("getUpcomingEvents", () => {
  it("returns German events sorted by date ascending", async () => {
    const events = await getUpcomingEvents("de");
    expect(events).toHaveLength(2);
    expect(events[0].data.title).toBe("bundesfeier");
    expect(events[1].data.title).toBe("stammtisch");
  });

  it("returns Norwegian events", async () => {
    const events = await getUpcomingEvents("no");
    expect(events).toHaveLength(2);
  });

  it("respects limit parameter", async () => {
    const events = await getUpcomingEvents("de", 1);
    expect(events).toHaveLength(1);
    expect(events[0].data.title).toBe("bundesfeier");
  });

  it("excludes events with visibilityEnd in the past", async () => {
    const events = await getUpcomingEvents("de");
    for (const e of events) {
      expect(e.data.visibilityEnd).toBeNull();
    }
  });
});

describe("getPastEvents", () => {
  it("returns events with past visibilityEnd within the cutoff window", async () => {
    const events = await getPastEvents("de");
    expect(events).toHaveLength(1);
    expect(events[0].data.title).toBe("hidden-event");
  });

  it("excludes events whose visibilityEnd is older than the cutoff", async () => {
    const events = await getPastEvents("de");
    for (const e of events) {
      expect(e.data.visibilityEnd?.getTime()).toBeLessThan(Date.now());
    }
  });
});
