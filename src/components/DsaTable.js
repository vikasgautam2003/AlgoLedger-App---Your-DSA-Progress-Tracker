


























"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDsaStore } from "@/store/dsaStore";
import StatusSelect from "./StatusSelect";

export default function DsaTable({ filter = {} }) {
  const parentRef = useRef(null);
  const problems = useDsaStore((s) => s.problems);

  const rows = useMemo(() => {
    return problems.filter((p) => {
      if (filter.status && p.status !== filter.status) return false;
      if (filter.topic && p.topic !== filter.topic) return false;
      return true;
    });
  }, [problems, filter.status, filter.topic]);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 8
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div
        ref={parentRef}
        className="relative h-[70vh] overflow-auto rounded-xl border border-neutral-900 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
      >
        <table className="w-full text-sm text-neutral-200">
          <thead className="sticky top-0 z-10 bg-black/90 backdrop-blur border-b border-neutral-800">
            <tr className="grid grid-cols-[2.5fr_1.2fr_1fr_1.3fr]">
              <th className="px-5 py-4 text-left font-medium text-white">
                Problem
              </th>
              <th className="px-5 py-4 text-left font-medium text-white">
                Topic
              </th>
              <th className="px-5 py-4 text-left font-medium text-white">
                Difficulty
              </th>
              <th className="px-5 py-4 text-left font-medium text-white">
                Status
              </th>
            </tr>
          </thead>

          <tbody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative"
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const p = rows[virtualRow.index];

              return (
                <tr
                  key={p.id}
                  className="grid grid-cols-[2.5fr_1.2fr_1fr_1.3fr] border-b border-neutral-900 hover:bg-neutral-950 transition-colors"
                  style={{
                    position: "absolute",
                    top: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                    width: "100%"
                  }}
                >
                  <td className="px-5 py-3 text-white truncate">
                    {p.title}
                  </td>
                  <td className="px-5 py-3 text-neutral-400 truncate">
                    {p.topic}
                  </td>
                  <td className="px-5 py-3 text-neutral-400">
                    {p.difficulty}
                  </td>
                  <td className="px-5 py-3">
                    <StatusSelect id={p.id} status={p.status} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
