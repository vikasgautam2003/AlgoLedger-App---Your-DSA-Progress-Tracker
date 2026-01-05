











"use client";

import { useMemo, useState } from "react";
import { useDsaStore } from "@/store/dsaStore";
import StatusSelect from "./StatusSelect";
import { openUrl } from "@tauri-apps/plugin-opener";

export default function DsaTable({ filter = {} }) {
  const problems = useDsaStore((s) => s.problems);
  const [search, setSearch] = useState("");

  const filteredProblems = useMemo(() => {
    let list = problems;

    if (filter.status) {
      list = list.filter((p) => p.status === filter.status);
    }

    if (filter.topic) {
      list = list.filter((p) => p.topic === filter.topic);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.difficulty.toLowerCase().includes(q)
      );
    }

    return list;
  }, [problems, filter.status, filter.topic, search]);

  return (
    <div className="space-y-4">
      <div className="px-4 pt-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems…"
          className="w-full bg-black text-neutral-200 placeholder-neutral-500 text-sm px-4 py-2 rounded-md border border-neutral-800 focus:outline-none focus:ring-1 focus:ring-white transition"
        />
      </div>

      {/* VERTICAL SCROLL CONTAINER — THIS IS THE FIX */}
      <div className="max-h-[70vh] overflow-y-auto premium-scroll">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-neutral-500 border-b border-neutral-900 sticky top-0 bg-black z-10">
              <th className="px-4 py-3 text-left">Problem</th>
              <th className="px-4 py-3 text-left">Topic</th>
              <th className="px-4 py-3 text-left">Difficulty</th>
              <th className="px-4 py-3 text-left">Link</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredProblems.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-sm text-neutral-500"
                >
                  No matching problems
                </td>
              </tr>
            )}

            {filteredProblems.map((p) => (
              <tr
                key={p.id}
                className="border-b border-neutral-900 hover:bg-neutral-900/30 transition"
              >
                <td className="px-4 py-3 text-sm text-neutral-200">
                  {p.title}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-400">
                  {p.topic}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-400">
                  {p.difficulty}
                </td>
                <td className="px-4 py-3 text-sm">
                  {p.link ? (
                    <button
                      onClick={() => openUrl(p.link)}
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      Open
                    </button>
                  ) : (
                    <span className="text-neutral-600">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <StatusSelect id={p.id} status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
