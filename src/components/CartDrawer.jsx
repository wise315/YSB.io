import { X, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/menuData";

export default function CartDrawer({ onCheckout, onClose }) {
  const { cart, updateQty, removeItem, total } = useCart();

  return (
    <div
      className="fixed inset-0 z-40 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="h-full w-full max-w-sm flex flex-col bg-[#0a0a0a] border-l border-zinc-800 shadow-2xl">
        <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-900">
          <h2 className="text-xl font-black text-yellow-400 uppercase tracking-widest">
            Your Cart
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-700">
              <ShoppingCart size={48} className="mb-4 opacity-20" />
              <p className="font-bold uppercase tracking-tighter">
                Your cart is empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartKey}
                className="flex items-center gap-3 rounded-xl bg-zinc-900/50 border border-zinc-800 p-3"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-tight truncate">
                    {item.name}
                  </p>
                  {item.selectedSize && (
                    <p className="text-yellow-400/60 text-[10px] uppercase font-bold">
                      Size: {item.selectedSize}
                    </p>
                  )}
                  <p className="text-yellow-400 font-black text-sm">
                    {formatPrice(item.price * item.qty)}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-black rounded-lg p-1 border border-zinc-800">
                  <button
                    onClick={() => updateQty(item.cartKey, -1)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-white font-bold text-xs">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.cartKey, 1)}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-zinc-900 bg-black/50 space-y-4">
            <div className="flex justify-between font-black text-2xl px-2">
              <span className="text-zinc-500 text-sm self-center uppercase tracking-widest">
                Total
              </span>
              <span className="text-yellow-400">{formatPrice(total)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 rounded-xl bg-yellow-400 text-black font-black text-lg uppercase tracking-widest hover:bg-yellow-300 active:scale-[0.98] transition-all"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
