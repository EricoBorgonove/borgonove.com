import { Panel } from "./ui/Patterns";
const toneClasses = {
  cyan: "border-cyan-400/35 bg-cyan-500/10 text-cyan-100",
  emerald: "border-emerald-400/35 bg-emerald-500/10 text-emerald-100",
  amber: "border-amber-400/35 bg-amber-500/10 text-amber-100",
  slate: "border-slate-600/70 bg-slate-900/55 text-slate-100",
};

function getToneClass(tone) {
  return toneClasses[tone] || toneClasses.slate;
}

export default function ArchitectureTopicDiagram({ diagram }) {
  if (!diagram) {
    return null;
  }

  return (
    <Panel as="section" layout="plain">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{diagram.eyebrow}</p>
      <h3 className="text-2xl md:text-3xl font-black text-white mb-3">{diagram.title}</h3>
      <p className="text-slate-300 leading-7 mb-8 max-w-3xl">{diagram.description}</p>

      <div className="grid gap-4 lg:grid-cols-3 items-start">
        {diagram.columns.map((column, index) => (
          <div key={column.title} className="relative">
            <article className={`rounded-[24px] border p-5 h-full ${getToneClass(column.tone)}`}>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h4 className="text-lg font-black">{column.title}</h4>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-current/25 bg-black/10 text-sm font-black">
                  {index + 1}
                </span>
              </div>

              <div className="space-y-3">
                {column.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            {index < diagram.columns.length - 1 && (
              <div className="hidden lg:flex absolute -right-7 top-1/2 -translate-y-1/2 items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10 text-cyan-300">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
                    <path
                      fill="currentColor"
                      d="M13.3 5.3a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4l4.3-4.3H4a1 1 0 1 1 0-2h13.6l-4.3-4.3a1 1 0 0 1 0-1.4Z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[22px] border border-white/10 bg-slate-950/35 px-5 py-4 text-sm text-slate-300 leading-7">
        {diagram.footer}
      </div>
    </Panel>
  );
}
