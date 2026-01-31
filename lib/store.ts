import type { Pedigree } from "@/types/pedigree";

const KEY = "pedigree_records_v1";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function readAll(): Pedigree[] {
  if (typeof window === "undefined") return [];
  return safeParse<Pedigree[]>(localStorage.getItem(KEY), []);
}

function writeAll(items: Pedigree[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function listPedigrees(): Pedigree[] {
  const items = readAll();
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getPedigree(id: string): Pedigree | null {
  return readAll().find((x) => x.id === id) ?? null;
}

export function savePedigree(input: Omit<Pedigree, "createdAt" | "updatedAt">) {
  const items = readAll();
  const now = new Date().toISOString();
  const idx = items.findIndex((x) => x.id === input.id);

  if (idx === -1) {
    const created: Pedigree = { ...input, createdAt: now, updatedAt: now };
    writeAll([created, ...items]);
    return created;
  }

  const updated: Pedigree = { ...items[idx], ...input, updatedAt: now };
  items[idx] = updated;
  writeAll(items);
  return updated;
}

export function removePedigree(id: string) {
  const items = readAll().filter((x) => x.id !== id);
  writeAll(items);
}

export function exportAll(): string {
  return JSON.stringify(readAll(), null, 2);
}

export function importAll(json: string) {
  const items = safeParse<Pedigree[]>(json, []);
  const normalized = items
    .filter((x) => x && typeof x.id === "string")
    .map((x) => ({
      ...x,
      lineage: Array.isArray(x.lineage) ? x.lineage.slice(0, 14) : Array.from({ length: 14 }, () => ""),
    }));
  writeAll(normalized);
}
