import { useState } from "react";
import { X, User, MapPin, Phone } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/menuData";

export default function CheckoutModal({ onClose }) {
  const { cart, total } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    setLoading(true);

    const orderLines = cart
      .map(
        (i) =>
          `• ${i.qty}x ${i.name}${i.selectedSize ? ` (${i.selectedSize})` : ""} - ${formatPrice(i.price * i.qty)}`,
      )
      .join("\n");

    const message = `📍 *NEW ORDER - YSB* 📍\n\n👤 *Customer:* ${form.name}\n📞 *Phone:* ${form.phone}\n🏠 *Location:* ${form.address}\n\n🛒 *Order Detail:*\n${orderLines}\n\n💰 *TOTAL: ${formatPrice(total)}*`;

    const whatsappUrl = `https://wa.me/2347086748171?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setLoading(false);
      onClose();
    }, 800);
  };

  const inputStyles =
    "w-full rounded-xl px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-yellow-400 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <div className="w-full max-w-md rounded-2xl border border-yellow-400/20 bg-[#0a0a0a] overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-900 flex justify-between items-center">
          <h2 className="text-xl font-black text-yellow-400 uppercase">
            Delivery Details
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleWhatsAppRedirect} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">
              Full Name
            </label>
            <input
              required
              className={inputStyles}
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">
              Phone Number
            </label>
            <input
              required
              type="tel"
              className={inputStyles}
              placeholder="080 1234 5678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-black text-zinc-500 tracking-widest ml-1">
              Delivery Address
            </label>
            <textarea
              required
              rows={3}
              className={inputStyles}
              placeholder="Your location in Umuahia..."
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-yellow-400 text-black font-black text-lg uppercase tracking-widest hover:bg-yellow-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Redirecting..." : "Send via WhatsApp 📲"}
          </button>
        </form>
      </div>
    </div>
  );
}
