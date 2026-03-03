import { useState } from "react";
import { Plus } from "lucide-react";
import { formatPrice } from "../data/menuData";

export default function MenuCard({ item, isPizza = false, onAdd }) {
  const [pressed, setPressed] = useState(false);

  const handleAdd = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 200);
    isPizza ? onAdd(item) : onAdd({ ...item, cartKey: item.id });
  };

  return (
    <div className="relative rounded-2xl border border-zinc-800 overflow-hidden flex flex-col transition-all hover:border-yellow-400/50 hover:-translate-y-1 bg-[#0d0d0d]">
      {item.tag && (
        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-400 text-black z-10">
          {item.tag}
        </span>
      )}
      <div className="flex items-center justify-center text-5xl py-8 select-none bg-linear-to-br from-[#1a1a00] to-[#111]">
        {item.emoji}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-black text-white text-base leading-tight">
          {item.name}
        </h3>
        {isPizza ? (
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(item.prices).map(([s, p]) => (
              <span
                key={s}
                className="text-[10px] text-zinc-400 border border-zinc-700 rounded px-1.5 py-0.5"
              >
                {s}: {formatPrice(p)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-yellow-400 font-black text-xl">
            {formatPrice(item.price)}
          </p>
        )}
        <button
          onClick={handleAdd}
          className={`mt-auto w-full py-2.5 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${pressed ? "scale-95 bg-yellow-300" : "bg-yellow-400 hover:bg-yellow-300"} text-black flex items-center justify-center gap-1`}
        >
          <Plus size={16} /> {isPizza ? "Choose Size" : "Add"}
        </button>
      </div>
    </div>
  );
}
