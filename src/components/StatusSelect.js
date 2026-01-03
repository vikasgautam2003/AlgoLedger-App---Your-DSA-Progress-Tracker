












"use client";

import { motion } from "framer-motion";
import { useDsaStore } from "@/store/dsaStore";

export default function StatusSelect({ id, status }) {
  const updateStatus = useDsaStore((s) => s.updateStatus);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block"
    >
      <select
        value={status}
        onChange={(e) => updateStatus(id, e.target.value)}
        className="bg-black text-white text-xs tracking-wide px-3 py-1.5 rounded-md border border-neutral-700 hover:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-white transition-all cursor-pointer"
      >
        <option value="NOT_DONE">NOT DONE</option>
        <option value="DONE">DONE</option>
        <option value="REVISION">REVISION</option>
      </select>
    </motion.div>
  );
}
