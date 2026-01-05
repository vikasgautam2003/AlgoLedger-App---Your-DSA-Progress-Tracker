












// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { useDsaStore } from "@/store/dsaStore";
// import AppBootstrap from "@/components/AppBootstrap";
// import Link from "next/link";

// /* ---------------- STATUS NORMALIZER ---------------- */

// const normalizeStatus = (raw) => {
//   if (raw === undefined || raw === null) return "NOT_DONE";

//   const s = String(raw).trim().toLowerCase();
//   if (s === "") return "NOT_DONE";
//   if (s === "done" || s === "yes" || s === "✔") return "DONE";
//   if (s.includes("rev")) return "REVISION";
//   return "NOT_DONE";
// };

// export default function UploadPage() {
//   return (
//     <AppBootstrap>
//       <UploadContent />
//     </AppBootstrap>
//   );
// }

// function UploadContent() {
//   const setProblems = useDsaStore((s) => s.setProblems);
//   const router = useRouter();
//   const [error, setError] = useState(null);
//   const [showInstructions, setShowInstructions] = useState(false);

//   const normalizeRow = (row, index) => {
//     const values = Object.values(row);

//     const topic =
//       row.topic ||
//       row.Topic ||
//       row.category ||
//       row.Category ||
//       row["__EMPTY"] ||
//       "General";

//     const title =
//       row.title ||
//       row.Title ||
//       row.question ||
//       row.Question ||
//       row["Questions by Love Babbar:"] ||
//       values.find((v) => typeof v === "string" && v.length > 3) ||
//       "Untitled Question";

//     const statusSource =
//       row.status ||
//       row.Status ||
//       row["__EMPTY_1"] ||
//       "";

//     return {
//       id: index + 1,
//       title: String(title).trim(),
//       topic: String(topic).trim(),
//       difficulty:
//         row.difficulty ||
//         row.Difficulty ||
//         row.level ||
//         row.Level ||
//         "Medium",
//       status: normalizeStatus(statusSource)
//     };
//   };

//   const handleFile = (file) => {
//     if (!file) return;

//     if (!file.name.endsWith(".json")) {
//       setError("Only .json files are supported");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = async () => {
//       try {
//         const raw = JSON.parse(reader.result);
//         if (!Array.isArray(raw)) {
//           throw new Error("JSON must be an array");
//         }

//         const normalized = raw
//           .filter((row) => row && Object.values(row).some(Boolean))
//           .map(normalizeRow);

//         if (normalized.length === 0) {
//           throw new Error("No valid questions found");
//         }

//         await setProblems(normalized);
//         router.push("/");
//       } catch (e) {
//         setError(e.message);
//       }
//     };

//     reader.readAsText(file);
//   };

//   return (
//     <main className="min-h-screen bg-black text-neutral-200 px-8 py-16 overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, y: 80 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         className="max-w-xl mx-auto space-y-14"
//       >
//         <header className="flex items-start justify-between">
//           <div className="space-y-4">
//             <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
//               Import
//             </p>

//             <h1 className="text-4xl font-semibold text-white">
//               Upload DSA Sheet
//             </h1>

//             <p className="text-sm text-neutral-500 max-w-md">
//               Follow the instructions strictly before uploading.
//             </p>
//           </div>

//           <Link
//             href="/"
//             className="group flex items-center gap-2 text-xs uppercase tracking-widest border border-neutral-800 px-5 py-2 rounded-full text-neutral-300 hover:bg-white hover:text-black transition-all"
//           >
//             ← Dashboard
//           </Link>
//         </header>

//         {/* ---------- INSTRUCTIONS BUTTON ---------- */}
//         <div className="flex flex-col gap-2">
//           <p className="text-xs uppercase tracking-widest text-red-400">
//             Follow the instructions very seriously
//           </p>

//           <button
//             onClick={() => setShowInstructions(true)}
//             className="self-start px-5 py-2 text-xs uppercase tracking-widest border border-neutral-800 rounded-full text-neutral-300 hover:bg-neutral-900 transition-all"
//           >
//             Instructions
//           </button>
//         </div>

//         {/* ---------- UPLOAD CARD ---------- */}
//         <div className="rounded-2xl border border-neutral-900 bg-[#050505] p-10 space-y-6">
//           <label className="flex flex-col items-center justify-center gap-4 cursor-pointer rounded-xl border border-dashed border-neutral-800 py-10 hover:border-neutral-600 transition-colors">
//             <span className="text-sm tracking-wide text-neutral-400">
//               Click to select JSON file
//             </span>
//             <input
//               type="file"
//               accept=".json"
//               className="hidden"
//               onChange={(e) => handleFile(e.target.files[0])}
//             />
//           </label>

//           {error && (
//             <p className="text-sm text-red-500">{error}</p>
//           )}
//         </div>
//       </motion.div>

//       {/* ---------- INSTRUCTIONS MODAL ---------- */}
//       {showInstructions && (
//         <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-6">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             transition={{ duration: 0.25 }}
//             className="max-w-lg w-full bg-[#050505] border border-neutral-800 rounded-xl p-6 space-y-4"
//           >
//             <h2 className="text-white text-lg font-semibold">
//               Upload Instructions
//             </h2>

//             <ul className="text-sm text-neutral-400 space-y-2 list-disc pl-5">
//               <li>File must be a <b>.json</b> file</li>
//               <li>JSON must be an <b>array of objects</b></li>
//               <li>Each object must represent one question</li>
//               <li>Required fields:
//                 <pre className="mt-2 bg-black p-3 rounded text-xs text-neutral-300">
// {`{
//   "id": number,
//   "title": string,
//   "topic": string,
//   "difficulty": "Easy" | "Medium" | "Hard",
//   "status": "NOT_DONE" | "DONE" | "REVISION"
//   "link": string | null
// }`}
//                 </pre>
//               </li>
//               <li>Status defaults to <b>NOT_DONE</b> if missing</li>
//               <li>Invalid rows will be ignored</li>
//             </ul>

//             <div className="flex justify-end pt-4">
//               <button
//                 onClick={() => setShowInstructions(false)}
//                 className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200"
//               >
//                 I Understand
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </main>
//   );
// }
















"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDsaStore } from "@/store/dsaStore";
import AppBootstrap from "@/components/AppBootstrap";
import Link from "next/link";

/* ---------------- STATUS NORMALIZER ---------------- */

const normalizeStatus = (raw) => {
  if (raw === undefined || raw === null) return "NOT_DONE";

  const s = String(raw).trim().toLowerCase();
  if (s === "") return "NOT_DONE";
  if (s === "done" || s === "yes" || s === "✔") return "DONE";
  if (s.includes("rev")) return "REVISION";
  return "NOT_DONE";
};

export default function UploadPage() {
  return (
    <AppBootstrap>
      <UploadContent />
    </AppBootstrap>
  );
}

function UploadContent() {
  const setProblems = useDsaStore((s) => s.setProblems);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const normalizeRow = (row, index) => {
    const values = Object.values(row);

    const topic =
      row.topic ||
      row.Topic ||
      row.category ||
      row.Category ||
      row["__EMPTY"] ||
      "General";

    const title =
      row.title ||
      row.Title ||
      row.question ||
      row.Question ||
      row["Questions by Love Babbar:"] ||
      values.find((v) => typeof v === "string" && v.length > 3) ||
      "Untitled Question";

    const statusSource =
      row.status ||
      row.Status ||
      row["__EMPTY_1"] ||
      "";

    const link =
      row.link ||
      row.Link ||
      row.url ||
      row.URL ||
      row.leetcode ||
      row.LeetCode ||
      row.problem_link ||
      null;

    return {
      id: index + 1,
      title: String(title).trim(),
      topic: String(topic).trim(),
      difficulty:
        row.difficulty ||
        row.Difficulty ||
        row.level ||
        row.Level ||
        "Medium",
      status: normalizeStatus(statusSource),
      link: link ? String(link).trim() : null
    };
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.name.endsWith(".json")) {
      setError("Only .json files are supported");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const raw = JSON.parse(reader.result);
        if (!Array.isArray(raw)) {
          throw new Error("JSON must be an array");
        }

        const normalized = raw
          .filter((row) => row && Object.values(row).some(Boolean))
          .map(normalizeRow);

        if (normalized.length === 0) {
          throw new Error("No valid questions found");
        }

        await setProblems(normalized);
        router.push("/");
      } catch (e) {
        setError(e.message);
      }
    };

    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-black text-neutral-200 px-8 py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto space-y-14"
      >
        <header className="flex items-start justify-between">
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
              Import
            </p>

            <h1 className="text-4xl font-semibold text-white">
              Upload DSA Sheet
            </h1>

            <p className="text-sm text-neutral-500 max-w-md">
              Follow the instructions strictly before uploading.
            </p>
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest border border-neutral-800 px-5 py-2 rounded-full text-neutral-300 hover:bg-white hover:text-black transition-all"
          >
            ← Dashboard
          </Link>
        </header>

        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-red-400">
            Follow the instructions very seriously
          </p>

          <button
            onClick={() => setShowInstructions(true)}
            className="self-start px-5 py-2 text-xs uppercase tracking-widest border border-neutral-800 rounded-full text-neutral-300 hover:bg-neutral-900 transition-all"
          >
            Instructions
          </button>
        </div>

        <div className="rounded-2xl border border-neutral-900 bg-[#050505] p-10 space-y-6">
          <label className="flex flex-col items-center justify-center gap-4 cursor-pointer rounded-xl border border-dashed border-neutral-800 py-10 hover:border-neutral-600 transition-colors">
            <span className="text-sm tracking-wide text-neutral-400">
              Click to select JSON file
            </span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </label>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>
      </motion.div>

      {showInstructions && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-lg w-full bg-[#050505] border border-neutral-800 rounded-xl p-6 space-y-4"
          >
            <h2 className="text-white text-lg font-semibold">
              Upload Instructions
            </h2>

            <ul className="text-sm text-neutral-400 space-y-2 list-disc pl-5">
              <li>File must be a <b>.json</b> file</li>
              <li>JSON must be an <b>array of objects</b></li>
              <li>Each object must represent one question</li>
              <li>Optional fields:
                <pre className="mt-2 bg-black p-3 rounded text-xs text-neutral-300">
{`{
  "link": "https://leetcode.com/problems/..."
}`}
                </pre>
              </li>
            </ul>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setShowInstructions(false)}
                className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-neutral-200"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
