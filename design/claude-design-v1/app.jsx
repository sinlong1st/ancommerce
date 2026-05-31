/* AnCommerce — app root: routing, cart state, theme + tweaks, mount. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cocoa",
  "hero": "Split",
  "roundness": 1,
  "showRatings": true
}/*EDITMODE-END*/;

const CART_KEY = "ac-cart-v2";
const ROUTE_KEY = "ac-route-v1";

function loadCart() {
  try { const v = JSON.parse(localStorage.getItem(CART_KEY)); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}
function loadRoute() {
  try { const v = JSON.parse(localStorage.getItem(ROUTE_KEY)); return v && v.name ? v : { name: "home" }; }
  catch (e) { return { name: "home" }; }
}

function useCart() {
  const [items, setItems] = React.useState(loadCart);
  React.useEffect(() => { localStorage.setItem(CART_KEY, JSON.stringify(items)); }, [items]);
  const addItem = React.useCallback((product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === product.id);
      if (i >= 0) { const next = prev.slice(); next[i] = { ...next[i], qty: Math.min(99, next[i].qty + qty) }; return next; }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
    });
  }, []);
  const setQty = React.useCallback((id, qty) => {
    setItems((prev) => prev.map((x) => x.id === id ? { ...x, qty } : x).filter((x) => x.qty > 0));
  }, []);
  const removeItem = React.useCallback((id) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  const clear = React.useCallback(() => setItems([]), []);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, addItem, setQty, removeItem, clear, count };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState(loadRoute);
  const [toast, setToast] = React.useState(null);
  const [order, setOrder] = React.useState(null);
  const cart = useCart();
  const toastTimer = React.useRef(null);

  React.useEffect(() => { localStorage.setItem(ROUTE_KEY, JSON.stringify(route)); }, [route]);
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [route.name, route.productId]);

  function nav(r) { setRoute(typeof r === "string" ? { name: r } : r); }
  function openProduct(p) { setRoute({ name: "product", productId: p.id }); }

  function showToast(msg) {
    setToast({ msg, key: Date.now() });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }
  function add(product, qty = 1) {
    cart.addItem(product, qty);
    showToast(qty > 1 ? `${qty} × ${product.name} added` : `${product.name} added to cart`);
  }
  function placeOrder(form, tot) {
    const num = "AN-" + Math.floor(100000 + Math.random() * 899999);
    const d = new Date(Date.now() + 4 * 864e5);
    const eta = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    setOrder({ number: num, form, totals: tot, items: cart.items.slice(), eta });
    cart.clear();
    setRoute({ name: "confirm" });
  }

  // ── Theme + tweak-driven CSS variables ──
  const theme = window.AC.themes[t.theme] || window.AC.themes.cocoa;
  const rootVars = { ...theme.vars };
  const baseRadius = parseFloat(theme.vars["--radius-card"]);
  rootVars["--radius-card"] = Math.round(baseRadius * t.roundness) + "px";
  const heroStyle = t.hero === "Centered" ? "centered" : "split";
  const showRatings = !!t.showRatings;

  const byId = Object.fromEntries(window.AC.products.map((p) => [p.id, p]));
  const current = route.name === "product" ? byId[route.productId] : null;

  let page;
  if (route.name === "shop") {
    page = <ShopPage route={route} onNav={nav} onOpen={openProduct} onAdd={add} showRating={showRatings} />;
  } else if (route.name === "product" && current) {
    page = <ProductPage product={current} onNav={nav} onOpen={openProduct} onAdd={add} showRating={showRatings} />;
  } else if (route.name === "cart") {
    page = <CartPage items={cart.items} onQty={cart.setQty} onRemove={cart.removeItem} onNav={nav} />;
  } else if (route.name === "checkout") {
    page = <CheckoutPage items={cart.items} onNav={nav} onPlace={placeOrder} />;
  } else if (route.name === "confirm") {
    page = <ConfirmPage order={order} onNav={nav} />;
  } else {
    page = <HomePage onNav={nav} onOpen={openProduct} onAdd={add} showRating={showRatings} heroStyle={heroStyle} />;
  }

  return (
    <div className="ac-app" style={rootVars}>
      <Nav route={route} cartCount={cart.count} search={route.search} onNav={nav} />
      <main className="ac-main">{page}</main>
      <Footer onNav={nav} />
      <Toast toast={toast} />

      <TweaksPanel>
        <TweakSection label="Look & feel" />
        <TweakRadio label="Theme" value={t.theme}
                    options={[{ value: "cocoa", label: "Cocoa" }, { value: "citrus", label: "Citrus" }, { value: "electric", label: "Electric" }]}
                    onChange={(v) => setTweak("theme", v)} />
        <p className="tweak-blurb">{theme.blurb}</p>
        <TweakSection label="Layout" />
        <TweakRadio label="Hero layout" value={t.hero} options={["Split", "Centered"]}
                    onChange={(v) => setTweak("hero", v)} />
        <TweakSlider label="Corner roundness" value={t.roundness} min={0.3} max={1.6} step={0.1}
                     onChange={(v) => setTweak("roundness", v)} />
        <TweakToggle label="Show star ratings" value={t.showRatings}
                     onChange={(v) => setTweak("showRatings", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
