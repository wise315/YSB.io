import { useState } from "react";
import { X } from "lucide-react";
import { formatPrice } from "../data/menuData";

export default function PizzaSizeModal({ pizza, onClose, onAdd }) {
  const [size, setSize] = useState("M");
  const sizes = ["S", "M", "L"];
  const labels = { S: "Small", M: "Medium", L: "Large" };

  const handleAddToCart = () => {
    onAdd({
      ...pizza,
      selectedSize: size,
      price: pizza.prices[size],
      cartKey: `${pizza.id}-${size}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-yellow-400/30 p-6 bg-[#111] shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-2xl font-black text-yellow-400 uppercase">
            {pizza.emoji} {pizza.name}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <p className="text-zinc-500 text-xs mb-4 uppercase tracking-widest font-bold">
          Select Pizza Size
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`rounded-xl py-4 flex flex-col items-center border-2 transition-all ${
                size === s
                  ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
              }`}
            >
              <span className="text-xl font-black">{s}</span>
              <span className="text-[10px] uppercase">{labels[s]}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-xl bg-yellow-400 text-black font-black text-lg uppercase tracking-wider hover:bg-yellow-300"
        >
          Add — {formatPrice(pizza.prices[size])}
        </button>
      </div>
    </div>
  );
}
