export default function Section({ title, subtitle, children }) {
  return (
    <section className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
          {title}
        </h2>
        {subtitle && <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>}
        <div className="w-12 h-1 bg-yellow-400 mt-2 rounded-full" />
      </div>
      {children}
    </section>
  );
}
