import { useState } from "react";
import { useCart } from "./context/CartContext";
import { menuData } from "./data/menuData";
import Header from "./components/Header";
import MenuCard from "./components/MenuCard";
import Section from "./components/Section";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import PizzaSizeModal from "./components/PizzaSizeModal";

export default function App() {
  const { addItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [pizzaModal, setPizzaModal] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white font-barlow">
      <Header onCartOpen={() => setCartOpen(true)} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* HERO SECTION */}
        <div className="mb-10 rounded-2xl border border-yellow-400 py-12 px-6 text-center bg-linear-to-br from-[#1a1500] via-[#0d0d00] to-black relative overflow-hidden">
          <h2 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4">
            Taste the
            <br />
            <span className="text-yellow-400">Square</span>
          </h2>
          <p className="text-zinc-400 tracking-widest uppercase text-sm">
            Now Delivering in Umuahia
          </p>
        </div>

        <Section title="🍔 YSB Combos" subtitle="Umuahia's Signature Burgers">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menuData.ysb.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addItem} />
            ))}
          </div>
        </Section>

        <Section
          title="🍕 Artisan Pizzas"
          subtitle="Artisan Crust & Local Spices"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {menuData.pizza.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                isPizza
                onAdd={setPizzaModal}
              />
            ))}
          </div>
        </Section>
      </main>

      {/* MODALS */}
      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />
      )}
      {checkoutOpen && <CheckoutModal onClose={() => setCheckoutOpen(false)} />}
      {pizzaModal && (
        <PizzaSizeModal
          pizza={pizzaModal}
          onClose={() => setPizzaModal(null)}
          onAdd={addItem}
        />
      )}
    </div>
  );
}
