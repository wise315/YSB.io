import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Header({ onCartOpen }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-900 bg-black/95 backdrop-blur-md font-barlow">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🟡</span>
          <div>
            <h1 className="text-xl font-black text-yellow-400 uppercase tracking-wider leading-none">
              YSB
            </h1>
            <p className="text-[10px] text-zinc-500 tracking-widest uppercase">
              Umuahia
            </p>
          </div>
        </div>

        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 text-black font-black text-sm uppercase tracking-wider hover:bg-yellow-300 transition-transform active:scale-95"
        >
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-yellow-400 text-[10px] font-black flex items-center justify-center border border-yellow-400">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
