











"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import AppBootstrap from "@/components/AppBootstrap";
import DsaTable from "@/components/DsaTable";
import { useDsaStore } from "@/store/dsaStore";

export default function TablePage() {
  return (
    <AppBootstrap>
      <TableContent />
    </AppBootstrap>
  );
}

function TableContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const resetDatabase = useDsaStore((s) => s.resetDatabase);
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-neutral-200 px-6 py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <header className="flex items-end justify-between border-b border-neutral-900 pb-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.04em" }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-semibold text-white"
            >
              Problem Database
            </motion.h1>

            {status && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-sm text-neutral-500 mt-2"
              >
                Filtered by status:{" "}
                <span className="text-white">{status}</span>
              </motion.p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setOpen(true)}
              className="text-xs uppercase tracking-widest border border-neutral-800 px-5 py-2 rounded-full text-neutral-400 hover:text-white hover:border-neutral-600 transition-all active:scale-95"
            >
              Reset Database
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href="/"
                className="group flex items-center gap-2 text-xs uppercase tracking-widest border border-neutral-800 px-5 py-2 rounded-full text-neutral-300 hover:bg-white hover:text-black transition-all active:scale-95"
              >
                <span className="transition-transform group-hover:-translate-x-1">
                  ←
                </span>
                Dashboard
              </Link>
            </motion.div>
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="rounded-xl border border-neutral-900 bg-[#050505] shadow-[0_40px_120px_rgba(0,0,0,0.85)]"
        >
          <DsaTable
            filter={{
              status: status || undefined
            }}
          />
        </motion.div>
      </motion.div>

      {/* ---------- RESET CONFIRMATION MODAL ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[#050505] border border-neutral-800 rounded-xl p-6 w-full max-w-md"
          >
            <h2 className="text-white text-lg font-semibold mb-2">
              Reset Database
            </h2>
            <p className="text-neutral-400 text-sm mb-6">
              This will permanently delete all progress and restore the starter
              DSA sheet. This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm border border-neutral-700 rounded hover:bg-neutral-900"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetDatabase();
                  setOpen(false);
                }}
                className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200"
              >
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
