let dbPromise = null;

async function getDB() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!dbPromise) {
    const { openDB } = await import("idb");

    dbPromise = openDB("dsa-tracker-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("problems")) {
          db.createObjectStore("problems", { keyPath: "id" });
        }
      }
    });
  }

  return dbPromise;
}

export async function saveProblems(problems) {
  const db = await getDB();
  if (!db) return;

  const tx = db.transaction("problems", "readwrite");
  const store = tx.objectStore("problems");

  await store.clear();
  for (const p of problems) {
    await store.put(p);
  }

  await tx.done;
}

export async function loadProblems() {
  const db = await getDB();
  if (!db) return [];

  return await db.getAll("problems");
}
