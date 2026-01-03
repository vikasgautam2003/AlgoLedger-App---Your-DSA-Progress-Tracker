"use client";

import { motion } from "framer-motion";

export default function ResetDatabaseModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="bg-[#050505] border border-neutral-800 rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-white text-lg font-semibold mb-2">
          Reset Database
        </h2>
        <p className="text-neutral-400 text-sm mb-6">
          This will permanently delete all progress and restore the starter DSA sheet.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-neutral-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200"
          >
            Reset
          </button>
        </div>
      </motion.div>
    </div>
  );
}
