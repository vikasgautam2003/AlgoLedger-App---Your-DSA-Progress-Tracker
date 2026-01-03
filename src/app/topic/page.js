"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AppBootstrap from "@/components/AppBootstrap";
import DsaTable from "@/components/DsaTable";
import { useDsaStore } from "@/store/dsaStore";

export default function TopicPage() {
  return (
    <AppBootstrap>
      <TopicContent />
    </AppBootstrap>
  );
}

function TopicContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const deleteTopic = useDsaStore((s) => s.deleteTopic);

  const [showConfirm, setShowConfirm] = useState(false);

  const topicName = useMemo(() => {
    const raw = searchParams.get("name");
    return raw ? decodeURIComponent(raw) : null;
  }, [searchParams]);

  if (!topicName) {
    return (
      <main className="min-h-screen bg-black text-neutral-200 flex items-center justify-center">
        <p className="text-sm text-neutral-500">
          Topic not specified
        </p>
      </main>
    );
  }

  const confirmDelete = () => {
    deleteTopic(topicName);
    setShowConfirm(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-black text-neutral-200 px-8 py-14 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto space-y-14"
      >
        <header className="flex items-end justify-between border-b border-neutral-900 pb-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-3"
            >
              Topic
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.4em" }}
              animate={{ opacity: 1, letterSpacing: "0.06em" }}
              transition={{ duration: 1 }}
              className="text-5xl font-semibold text-white leading-none"
            >
              {topicName}
            </motion.h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs tracking-widest uppercase border border-red-900/40 px-5 py-2 rounded-full text-red-400 hover:border-red-700 hover:text-red-300 transition-all active:scale-95"
            >
              Delete Topic
            </button>

            <Link
              href="/"
              className="text-xs tracking-widest uppercase border border-neutral-800 px-5 py-2 rounded-full text-neutral-300 hover:bg-white hover:text-black transition-all"
            >
              Back
            </Link>
          </div>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-neutral-900 bg-[#050505] shadow-[0_40px_140px_rgba(0,0,0,0.9)]"
        >
          <DsaTable filter={{ topic: topicName }} />
        </motion.section>
      </motion.div>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#050505] p-8 space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  Delete Topic
                </h3>
                <p className="text-sm text-neutral-400">
                  This will permanently remove all questions under
                  <span className="text-white"> {topicName}</span>.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-sm rounded-md border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-500 transition active:scale-95"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
