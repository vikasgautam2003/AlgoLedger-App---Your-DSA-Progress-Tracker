





"use client";

import Link from "next/link";
import { useDsaStore } from "@/store/dsaStore";
import AppBootstrap from "@/components/AppBootstrap";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <AppBootstrap>
      <DashboardContent />
    </AppBootstrap>
  );
}

function DashboardContent() {
  const problems = useDsaStore((s) => s.problems);

  const total = problems.length;
  const done = problems.filter((p) => p.status === "DONE").length;
  const revision = problems.filter((p) => p.status === "REVISION").length;

  const progressNum = total === 0 ? 0 : (done / total) * 100;
  const progressLabel = progressNum.toFixed(1);

  const topicStats = problems.reduce((acc, p) => {
    if (!acc[p.topic]) {
      acc[p.topic] = { total: 0, done: 0 };
    }
    acc[p.topic].total += 1;
    if (p.status === "DONE") acc[p.topic].done += 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-neutral-800 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">

        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-neutral-900 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              AlgoLedger
            </h1>
            <p className="text-neutral-500 font-medium tracking-wide">
              DSA Progress Tracker
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/table"
              className="group flex items-center justify-center px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all duration-200 hover:text-white border border-neutral-800 rounded-md hover:border-neutral-600 active:scale-95"
            >
              View Database
            </Link>

            <Link
              href="/upload"
              className="group flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-white text-black rounded-md transition-all duration-200 hover:bg-neutral-200 active:scale-95"
            >
              Upload Sheet
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-900 border-y border-neutral-900 bg-[#050505]">
          <MetricCell label="Total Problems" value={total} />
          <MetricCell label="Completed" value={done} />
          <MetricCell label="Revision Needed" value={revision} highlight={revision > 0} />
          <MetricCell label="Completion Rate" value={`${progressLabel}%`} />
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end text-xs uppercase tracking-widest text-neutral-500 font-medium">
            <span>Overall Progress</span>
            <span>{done}/{total}</span>
          </div>
          <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-1000 ease-out"
              style={{ width: `${progressNum}%` }}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <section className="lg:col-span-4 space-y-6">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Controls
            </h2>
            <div className="grid gap-3">
              <NavCard
                title="Active Problems"
                meta="In Progress"
                href="/table?status=NOT_DONE"
              />
              <NavCard
                title="Revision Queue"
                meta={`${revision} pending`}
                href="/table?status=REVISION"
                active={revision > 0}
              />
              <NavCard
                title="Archive"
                meta="Completed"
                href="/table?status=DONE"
              />
            </div>
          </section>

          <section className="lg:col-span-8 space-y-6">
            <h2 className="text-lg font-semibold text-white tracking-tight">
              Topic Breakdown
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(topicStats).map(([topic, stats]) => {
                const percent =
                  stats.total === 0 ? 0 : (stats.done / stats.total) * 100;

                return (
                  <Link
                    key={topic}
                    href={`/topic?name=${encodeURIComponent(topic)}`}
                    className="group relative flex flex-col justify-between p-5 rounded-lg border border-neutral-900 bg-[#050505] hover:border-neutral-700 transition-all duration-200 hover:bg-neutral-900/20 active:scale-[0.99]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-medium text-neutral-200 group-hover:text-white transition-colors">
                        {topic}
                      </span>
                      <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        {stats.done}/{stats.total}
                      </span>
                    </div>

                    <div className="w-full bg-neutral-900 h-[1px] group-hover:bg-neutral-800 transition-colors">
                      <div
                        className="bg-neutral-400 group-hover:bg-white h-[1px] transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function MetricCell({ label, value, highlight = false }) {
  return (
    <div className="py-6 px-6 flex flex-col items-start justify-center transition-colors duration-300 hover:bg-neutral-900/30">
      <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-semibold mb-2">
        {label}
      </span>
      <span
        className={cn(
          "text-3xl font-light tracking-tight tabular-nums",
          highlight ? "text-white" : "text-neutral-300"
        )}
      >
        {value}
      </span>
    </div>
  );
}

function NavCard({ title, meta, href, active = false }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between p-4 rounded border transition-all duration-200 group",
        active
          ? "bg-neutral-900/40 border-neutral-700 text-white"
          : "bg-transparent border-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
      )}
    >
      <span className="text-sm font-medium">{title}</span>
      <span
        className={cn(
          "text-xs tracking-wide uppercase transition-colors",
          active
            ? "text-neutral-400"
            : "text-neutral-600 group-hover:text-neutral-500"
        )}
      >
        {meta}
      </span>
    </Link>
  );
}
