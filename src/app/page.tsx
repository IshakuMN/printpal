"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CircleUserRound,
  Clock3,
  Heart,
  ImagePlus,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  Upload,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  badge?: string;
  sizes: string[];
  materials: string[];
};

type CartItem = {
  id: string;
  product: Product;
  size: string;
  material: string;
  quantity: number;
  note: string;
  imageName?: string;
  preview?: string;
};

const products: Product[] = [
  {
    id: "frame",
    name: "Statement Frame",
    category: "Wall Art",
    price: 18500,
    description: "Make your favourite moment the main character.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Framed art in a colourful living room",
    badge: "Most loved",
    sizes: ["A4", "A3", "A2", "A1"],
    materials: ["Black frame", "Oak frame", "White frame"],
  },
  {
    id: "photo",
    name: "Photo Prints",
    category: "Photo Prints",
    price: 3500,
    description: "Little joys, printed to keep forever.",
    image:
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Stack of printed photographs",
    sizes: ["4 × 6 in", "5 × 7 in", "A4", "A3"],
    materials: ["Matte photo paper", "Gloss photo paper"],
  },
  {
    id: "flyer",
    name: "Event Flyers",
    category: "For Business",
    price: 12000,
    description: "Announce it loud. Make it impossible to miss.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Colourful printed flyers on a desk",
    badge: "Fast print",
    sizes: ["A5", "A4", "DL"],
    materials: ["130gsm gloss", "170gsm silk", "Uncoated"],
  },
  {
    id: "business-cards",
    name: "Business Cards",
    category: "For Business",
    price: 8500,
    description: "Hand them something they will remember.",
    image:
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Business cards arranged on a surface",
    sizes: ["Standard", "Square", "Slim"],
    materials: ["350gsm matte", "350gsm gloss", "Textured"],
  },
  {
    id: "banner",
    name: "Big Mood Banners",
    category: "Banners",
    price: 22000,
    description: "Your big announcement deserves a big entrance.",
    image:
      "https://images.unsplash.com/photo-1513159446162-54eb8bdaa79b?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Colourful hanging banner decoration",
    sizes: ["2 × 3 ft", "3 × 6 ft", "4 × 8 ft"],
    materials: ["Flex banner", "Matte vinyl", "Fabric"],
  },
  {
    id: "stickers",
    name: "Sticker Sheet",
    category: "Stickers",
    price: 6500,
    description: "Put your personality everywhere. We approve.",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1100&q=85",
    imageAlt: "Colourful decorative stickers",
    badge: "New",
    sizes: ["A5 sheet", "A4 sheet", "Custom die-cut"],
    materials: ["Matte vinyl", "Gloss vinyl", "Transparent vinyl"],
  },
];

const categories = ["All prints", "Wall Art", "Photo Prints", "For Business", "Banners", "Stickers"];
const formatNaira = (value: number) => `₦${value.toLocaleString("en-NG")}`;

export default function Home() {
  const [category, setCategory] = useState("All prints");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [search, setSearch] = useState("");
  const [deliveryForm, setDeliveryForm] = useState({ name: "", email: "", phone: "", area: "", address: "" });

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = category === "All prints" || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [category, search],
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function addToCart(item: Omit<CartItem, "id">) {
    setCart((current) => [...current, { ...item, id: `${item.product.id}-${Date.now()}` }]);
    setSelectedProduct(null);
    setCartOpen(true);
  }

  function updateQuantity(id: string, increment: number) {
    setCart((current) =>
      current
        .map((item) => item.id === id ? { ...item, quantity: item.quantity + increment } : item)
        .filter((item) => item.quantity > 0),
    );
  }

  function beginCheckout() {
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setComplete(true);
    setCart([]);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fffdf8]">
      <div className="border-b border-[#172033]/10 bg-[#d7f461] px-5 py-2 text-center text-xs font-bold tracking-wide text-[#172033] sm:text-sm">
        Lagos, your print plug is here. Free delivery on orders over ₦50,000.
      </div>

      <header className="sticky top-0 z-30 border-b border-[#172033]/10 bg-[#fffdf8]/95 px-5 py-4 backdrop-blur lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <a href="#top" className="flex shrink-0 items-center gap-2 font-black tracking-[-0.07em]" aria-label="PrintPal Nigeria home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff694d] text-lg text-white">P</span>
            <span className="text-xl">printpal<span className="text-[#ff694d]">.</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            <a href="#shop" className="transition hover:text-[#ff694d]">Shop prints</a>
            <a href="#how-it-works" className="transition hover:text-[#ff694d]">How it works</a>
            <a href="#why-us" className="transition hover:text-[#ff694d]">Why PrintPal</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => setSignedIn(true)} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-bold hover:bg-[#f2f1ec] sm:flex">
              <CircleUserRound size={19} /> {signedIn ? "Signed in" : "Sign in"}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full bg-[#172033] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5">
              <ShoppingBag size={18} /> <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ff694d] px-1 text-[11px]">{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full border border-[#172033]/15 lg:hidden" aria-label="Toggle navigation">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && <nav className="mx-auto mt-4 grid max-w-7xl gap-2 border-t border-[#172033]/10 pt-4 text-sm font-bold lg:hidden">
          <a onClick={() => setMenuOpen(false)} href="#shop" className="rounded-xl px-3 py-2 hover:bg-[#f2f1ec]">Shop prints</a>
          <a onClick={() => setMenuOpen(false)} href="#how-it-works" className="rounded-xl px-3 py-2 hover:bg-[#f2f1ec]">How it works</a>
          <button onClick={() => { setSignedIn(true); setMenuOpen(false); }} className="flex rounded-xl px-3 py-2 text-left hover:bg-[#f2f1ec]">Sign in</button>
        </nav>}
      </header>

      <section id="top" className="relative isolate px-5 pb-14 pt-12 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="absolute inset-x-0 top-0 -z-10 h-[92%] bg-[#fff1e8]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.14em] shadow-sm"><Sparkles size={15} className="text-[#ff694d]" /> Made for your big ideas</p>
            <h1 className="font-display max-w-2xl text-5xl font-bold leading-[.95] tracking-[-.065em] text-[#172033] sm:text-6xl lg:text-8xl">
              Print it.<br /><span className="text-[#ff694d]">Love it.</span><br />Get it delivered.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#495263]">From gallery walls to grand openings, PrintPal turns your files and ideas into beautifully made prints—then brings them right to your door in Lagos.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#shop" className="inline-flex items-center gap-2 rounded-full bg-[#172033] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">Explore prints <ArrowRight size={18} /></a>
              <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full border border-[#172033]/20 bg-white px-6 py-3.5 text-sm font-bold transition hover:bg-[#d7f461]">How it works</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-[#495263]">
              <span className="flex items-center gap-2"><Check size={17} className="text-[#ff694d]" /> Quality checked by us</span>
              <span className="flex items-center gap-2"><Check size={17} className="text-[#ff694d]" /> Delivery across Lagos</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 top-8 h-32 w-32 rounded-full bg-[#d7f461] sm:-left-10 sm:h-44 sm:w-44" />
            <div className="absolute -bottom-6 -right-4 h-32 w-32 rotate-12 rounded-[2rem] bg-[#6951e8] sm:h-44 sm:w-44" />
            <div className="relative overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-[#f2f1ec] shadow-2xl shadow-[#172033]/15">
              <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90" alt="Bright framed art decorating a room" width={1200} height={1000} priority className="aspect-[1.15] h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-4 py-3 shadow-lg"><p className="text-xs font-bold uppercase tracking-wider text-[#ff694d]">Good news</p><p className="mt-0.5 font-black">Prints are having a moment.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#172033]/10 bg-[#172033] px-5 py-4 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-2 text-center text-sm font-semibold sm:justify-between">
          <span>⭐ 4.9/5 from early customers</span><span>•</span><span>File checks before we print</span><span>•</span><span>2–4 business-day delivery</span>
        </div>
      </section>

      <section id="shop" className="px-5 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="text-sm font-black uppercase tracking-[.18em] text-[#ff694d]">Pick your vibe</p><h2 className="font-display mt-3 text-4xl font-bold tracking-[-.055em] sm:text-5xl">So much more than paper.</h2></div>
            <label className="flex max-w-full items-center gap-2 rounded-full border border-[#172033]/15 bg-white px-4 py-3 sm:w-64"><Search size={18} className="text-[#495263]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search prints" className="w-full bg-transparent text-sm outline-none placeholder:text-[#495263]" /></label>
          </div>
          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${category === item ? "bg-[#ff694d] text-white" : "bg-[#f2f1ec] hover:bg-[#d7f461]"}`}>{item}</button>)}
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />)}
          </div>
          {filteredProducts.length === 0 && <div className="mt-10 rounded-3xl bg-[#f2f1ec] p-10 text-center"><p className="text-lg font-bold">Nothing quite matches that search yet.</p><button onClick={() => { setSearch(""); setCategory("All prints"); }} className="mt-3 font-bold text-[#ff694d]">Show all prints</button></div>}
        </div>
      </section>

      <section id="how-it-works" className="bg-[#d7f461] px-5 py-18 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl"><div className="max-w-xl"><p className="text-sm font-black uppercase tracking-[.18em] text-[#495263]">No wahala</p><h2 className="font-display mt-3 text-4xl font-bold tracking-[-.055em] sm:text-5xl">Your print journey, sorted.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[{ number: "01", icon: ImagePlus, title: "Choose & personalise", body: "Pick a print, choose your finish, and upload your file or add a note." }, { number: "02", icon: ShieldCheck, title: "We make it right", body: "We check the details, coordinate production, and quality-check every order." }, { number: "03", icon: Truck, title: "It comes to you", body: "Relax. Your finished print arrives safely at your Lagos doorstep." }].map(({ number, icon: Icon, title, body }) => <article key={number} className="rounded-[2rem] bg-[#fffdf8] p-7"><span className="font-display text-5xl text-[#ff694d]">{number}</span><Icon size={29} className="mt-9" /><h3 className="mt-4 text-xl font-black">{title}</h3><p className="mt-2 leading-relaxed text-[#495263]">{body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="why-us" className="px-5 py-18 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] bg-[#6951e8] p-8 text-white md:grid-cols-[1.15fr_.85fr] md:p-14"><div><p className="text-sm font-black uppercase tracking-[.18em] text-[#d7f461]">The PrintPal promise</p><h2 className="font-display mt-4 max-w-xl text-4xl font-bold leading-tight tracking-[-.055em] sm:text-5xl">One order. One team that has your back.</h2></div><div className="grid gap-5 self-center text-[#eeebff]"><p className="flex gap-3"><PackageCheck className="shrink-0 text-[#d7f461]" /> We make sure every order is print-ready and quality checked before it gets to you.</p><p className="flex gap-3"><Heart className="shrink-0 text-[#d7f461]" /> Whether it is one photo or one thousand flyers, your ideas get the same care.</p></div></div></section>

      <footer className="border-t border-[#172033]/10 px-5 py-10 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-[#495263] sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xl font-black tracking-[-.07em] text-[#172033]">printpal<span className="text-[#ff694d]">.</span></p><p className="mt-2">Your ideas, beautifully printed in Lagos.</p></div><p>© 2026 PrintPal Nigeria · Made for memorable moments</p></div></footer>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAdd={addToCart} />}
      {cartOpen && <CartDrawer cart={cart} total={total} onClose={() => setCartOpen(false)} onQuantity={updateQuantity} onRemove={(id) => setCart((current) => current.filter((item) => item.id !== id))} onCheckout={beginCheckout} />}
      {checkoutOpen && <CheckoutModal signedIn={signedIn} complete={complete} form={deliveryForm} total={total} onClose={() => { setCheckoutOpen(false); if (complete) setComplete(false); }} onSignIn={() => setSignedIn(true)} onFormChange={(field, value) => setDeliveryForm((current) => ({ ...current, [field]: value }))} onSubmit={submitOrder} />}
    </main>
  );
}

function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return <article className="group overflow-hidden rounded-[1.8rem] border border-[#172033]/10 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#172033]/8"><button onClick={onSelect} className="block w-full text-left"><div className="relative overflow-hidden bg-[#f2f1ec]"><Image src={product.image} alt={product.imageAlt} width={900} height={800} className="aspect-[1.16] w-full object-cover transition duration-500 group-hover:scale-105" />{product.badge && <span className="absolute left-4 top-4 rounded-full bg-[#d7f461] px-3 py-1.5 text-xs font-black">{product.badge}</span>}</div><div className="p-5"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#ff694d]">{product.category}</p><div className="mt-2 flex items-start justify-between gap-3"><div><h3 className="text-lg font-black">{product.name}</h3><p className="mt-1 text-sm text-[#495263]">{product.description}</p></div><ArrowRight className="mt-1 shrink-0" size={20} /></div><p className="mt-4 text-sm font-bold">From {formatNaira(product.price)}</p></div></button></article>;
}

function ProductModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (item: Omit<CartItem, "id">) => void }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [material, setMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState<string>();
  const [imageName, setImageName] = useState<string>();
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (!file) return; setImageName(file.name); setPreview(URL.createObjectURL(file)); };
  return <Modal onClose={onClose}><div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-2"><div className="relative min-h-72 bg-[#f2f1ec]"><Image src={preview || product.image} alt={preview ? "Your uploaded artwork preview" : product.imageAlt} fill className="object-cover" /><button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white shadow-md" aria-label="Close product details"><X size={20} /></button></div><div className="p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#ff694d]">{product.category}</p><h2 className="font-display mt-2 text-4xl font-bold tracking-[-.055em]">{product.name}</h2><p className="mt-3 text-[#495263]">{product.description}</p><p className="mt-5 text-xl font-black">From {formatNaira(product.price)}</p><OptionGroup label="Size" options={product.sizes} value={size} onChange={setSize} /><OptionGroup label="Finish" options={product.materials} value={material} onChange={setMaterial} /><div className="mt-6"><p className="text-sm font-black">Quantity</p><div className="mt-2 flex w-fit items-center rounded-full border border-[#172033]/15"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="p-3" aria-label="Decrease quantity"><Minus size={16} /></button><span className="w-9 text-center text-sm font-black">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} className="p-3" aria-label="Increase quantity"><Plus size={16} /></button></div></div><label className="mt-6 block"><span className="text-sm font-black">Your artwork <span className="font-normal text-[#495263]">(optional)</span></span><span className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-[#172033]/25 bg-[#fffdf8] px-4 py-5 text-sm font-bold text-[#495263]"><Upload size={18} />{imageName || "Upload image, PDF, or design"}<input onChange={handleUpload} accept="image/*,.pdf" type="file" className="sr-only" /></span></label><label className="mt-5 block"><span className="text-sm font-black">A note for our team <span className="font-normal text-[#495263]">(optional)</span></span><textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3} placeholder="E.g. Please keep colours vivid" className="mt-2 w-full resize-none rounded-2xl border border-[#172033]/15 bg-[#fffdf8] px-4 py-3 text-sm outline-none focus:border-[#ff694d]" /></label><div className="mt-5 flex items-center gap-2 rounded-xl bg-[#f2f1ec] p-3 text-xs font-semibold text-[#495263]"><Clock3 size={16} className="text-[#ff694d]" /> Estimated Lagos delivery: 2–4 business days</div><button onClick={() => onAdd({ product, size, material, quantity, note, imageName, preview })} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#172033] px-5 py-4 text-sm font-black text-white transition hover:bg-[#ff694d]">Add to bag · {formatNaira(product.price * quantity)} <ArrowRight size={18} /></button></div></div></Modal>;
}

function OptionGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (value: string) => void }) { return <div className="mt-6"><p className="text-sm font-black">{label}</p><div className="mt-2 flex flex-wrap gap-2">{options.map((option) => <button key={option} onClick={() => onChange(option)} className={`rounded-full border px-3 py-2 text-xs font-bold transition ${value === option ? "border-[#172033] bg-[#172033] text-white" : "border-[#172033]/15 hover:border-[#ff694d]"}`}>{option}</button>)}</div></div>; }

function CartDrawer({ cart, total, onClose, onQuantity, onRemove, onCheckout }: { cart: CartItem[]; total: number; onClose: () => void; onQuantity: (id: string, increment: number) => void; onRemove: (id: string) => void; onCheckout: () => void }) { return <div className="fixed inset-0 z-50 bg-[#172033]/35" role="dialog" aria-modal="true"><aside className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fffdf8] p-6 shadow-2xl"><div className="flex items-center justify-between border-b border-[#172033]/10 pb-5"><h2 className="font-display text-3xl font-bold tracking-[-.055em]">Your print bag</h2><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#f2f1ec]" aria-label="Close bag"><X size={20} /></button></div>{cart.length === 0 ? <div className="grid flex-1 place-items-center text-center"><div><ShoppingBag className="mx-auto text-[#ff694d]" size={35} /><h3 className="mt-4 text-xl font-black">Your bag is feeling empty.</h3><p className="mt-2 text-sm text-[#495263]">Find a print you love and make it yours.</p><button onClick={onClose} className="mt-5 rounded-full bg-[#172033] px-5 py-3 text-sm font-bold text-white">Browse prints</button></div></div> : <><div className="flex-1 divide-y divide-[#172033]/10 overflow-y-auto">{cart.map((item) => <div key={item.id} className="flex gap-4 py-5"><div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f2f1ec]"><Image src={item.preview || item.product.image} alt={item.product.name} fill className="object-cover" /></div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><div><h3 className="font-black">{item.product.name}</h3><p className="mt-1 text-xs text-[#495263]">{item.size} · {item.material}</p></div><button onClick={() => onRemove(item.id)} className="h-fit text-[#ff694d]" aria-label={`Remove ${item.product.name}`}><Trash2 size={17} /></button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-full border border-[#172033]/15"><button onClick={() => onQuantity(item.id, -1)} className="p-2" aria-label="Decrease quantity"><Minus size={14} /></button><span className="w-7 text-center text-xs font-black">{item.quantity}</span><button onClick={() => onQuantity(item.id, 1)} className="p-2" aria-label="Increase quantity"><Plus size={14} /></button></div><p className="text-sm font-black">{formatNaira(item.product.price * item.quantity)}</p></div></div></div>)}</div><div className="border-t border-[#172033]/10 pt-5"><div className="flex justify-between text-lg font-black"><span>Total</span><span>{formatNaira(total)}</span></div><p className="mt-2 text-xs text-[#495263]">Final delivery price is confirmed before payment. Free delivery on orders above ₦50,000.</p><button onClick={onCheckout} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#ff694d] px-5 py-4 text-sm font-black text-white">Continue to order <ArrowRight size={18} /></button></div></>}</aside></div>; }

function CheckoutModal({ signedIn, complete, form, total, onClose, onSignIn, onFormChange, onSubmit }: { signedIn: boolean; complete: boolean; form: Record<string, string>; total: number; onClose: () => void; onSignIn: () => void; onFormChange: (field: string, value: string) => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) { const orderNumber = "PP-" + new Date().getFullYear().toString().slice(-2) + "-" + "8421"; return <Modal onClose={onClose}><div className="p-7 sm:p-10">{complete ? <div className="mx-auto max-w-md py-8 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d7f461]"><Check size={30} /></div><p className="mt-6 text-sm font-black uppercase tracking-[.15em] text-[#ff694d]">Order request received</p><h2 className="font-display mt-3 text-4xl font-bold tracking-[-.055em]">You are all set!</h2><p className="mt-4 leading-relaxed text-[#495263]">Your PrintPal order <strong>{orderNumber}</strong> is being prepared. We will keep you posted as it moves from quality check to your Lagos doorstep.</p><div className="mt-6 rounded-2xl bg-[#f2f1ec] p-4 text-left"><p className="flex items-center gap-2 text-sm font-black"><Truck size={18} className="text-[#ff694d]" /> Expected delivery</p><p className="mt-1 text-sm text-[#495263]">Within 2–4 business days in Lagos</p></div><button onClick={onClose} className="mt-7 rounded-full bg-[#172033] px-6 py-3.5 text-sm font-black text-white">Keep exploring</button></div> : !signedIn ? <div className="mx-auto max-w-md py-6 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#d7f461]"><CircleUserRound size={27} /></div><h2 className="font-display mt-5 text-4xl font-bold tracking-[-.055em]">Almost there.</h2><p className="mt-3 leading-relaxed text-[#495263]">Sign in to keep your delivery details and follow your PrintPal order.</p><button onClick={onSignIn} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#172033] px-5 py-4 text-sm font-black text-white">Continue with email <ArrowRight size={18} /></button><button onClick={onClose} className="mt-4 text-sm font-bold text-[#495263]">Back to bag</button></div> : <><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-black uppercase tracking-[.15em] text-[#ff694d]">Delivery details</p><h2 className="font-display mt-2 text-4xl font-bold tracking-[-.055em]">Where should we bring it?</h2></div><button onClick={onClose} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2f1ec]" aria-label="Close checkout"><X size={20} /></button></div><form onSubmit={onSubmit} className="mt-7 grid gap-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value={form.name} onChange={(value) => onFormChange("name", value)} /><Field label="Email address" type="email" value={form.email} onChange={(value) => onFormChange("email", value)} /></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Phone number" type="tel" value={form.phone} onChange={(value) => onFormChange("phone", value)} /><label className="grid gap-1.5 text-sm font-bold">Lagos area<select required value={form.area} onChange={(event) => onFormChange("area", event.target.value)} className="rounded-xl border border-[#172033]/15 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[#ff694d]"><option value="" disabled>Select your area</option><option>Lekki</option><option>Ikoyi</option><option>Victoria Island</option><option>Yaba</option><option>Ikeja</option><option>Surulere</option><option>Other Lagos area</option></select></label></div><label className="grid gap-1.5 text-sm font-bold">Delivery address<textarea required value={form.address} onChange={(event) => onFormChange("address", event.target.value)} rows={3} placeholder="House number, street, landmark" className="resize-none rounded-xl border border-[#172033]/15 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[#ff694d]" /></label><div className="flex items-center justify-between rounded-2xl bg-[#f2f1ec] p-4 text-sm"><span className="font-bold">Your demo order total</span><span className="font-black">{formatNaira(total)}</span></div><button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-[#ff694d] px-5 py-4 text-sm font-black text-white">Place demo order <ArrowRight size={18} /></button><p className="text-center text-xs text-[#495263]">This is a prototype—no payment will be taken.</p></form></>}</div></Modal>; }

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) { return <label className="grid gap-1.5 text-sm font-bold">{label}<input required type={type} value={value} onChange={(event) => onChange(event.target.value)} className="rounded-xl border border-[#172033]/15 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[#ff694d]" /></label>; }

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) { return <div onMouseDown={onClose} className="fixed inset-0 z-50 grid place-items-center bg-[#172033]/40 p-4" role="dialog" aria-modal="true"><div onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-4xl overflow-hidden rounded-[2rem] bg-[#fffdf8] shadow-2xl">{children}</div></div>; }
