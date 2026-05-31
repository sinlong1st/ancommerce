/* AnCommerce — shared UI components. Exported to window. */

// Generic line-icon set (stroke = currentColor). 24x24 viewBox.
function Glyph({ name, size = 20, strokeWidth = 1.8, style }) {
  const paths = {
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M2 3h2.2l2 12.5a1.5 1.5 0 0 0 1.5 1.2h9.2a1.5 1.5 0 0 0 1.5-1.2L20 7H5.2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6"/>',
    arrowLeft: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    truck: '<path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3 7.8-8 9-5-1.2-8-4.5-8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    heart: '<path d="M12 20s-7-4.3-7-9.3A3.7 3.7 0 0 1 12 7a3.7 3.7 0 0 1 7 3.7C19 15.7 12 20 12 20z"/>',
    bag: '<path d="M6 8h12l-1 12H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    leaf: '<path d="M5 19c0-8 6-13 14-13 0 8-6 13-14 13z"/><path d="M5 19c3-4 6-6 9-7"/>'
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         style={style} dangerouslySetInnerHTML={{ __html: paths[name] || "" }} />
  );
}

// Category badge-icon in a colored rounded tile.
function CatIcon({ name, size = 40, radius = 14 }) {
  const color = window.AC.catColor(name);
  return (
    <span style={{
      width: size, height: size, borderRadius: radius, flex: "none",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: color + "1F", color
    }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none"
           stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
           dangerouslySetInnerHTML={{ __html: window.AC.catIcon(name) }} />
    </span>
  );
}

function money(n) {
  return "$" + n.toFixed(2);
}

function Stars({ rating, reviews, size = 15 }) {
  const full = Math.round(rating);
  return (
    <span className="stars" title={rating + " out of 5"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={"stars__s" + (i <= full ? " is-on" : "")}>
          <Glyph name="star" size={size} strokeWidth={1.4} />
        </span>
      ))}
      {reviews != null && <span className="stars__count">{rating.toFixed(1)} ({reviews.toLocaleString()})</span>}
    </span>
  );
}

function Badge({ children, kind = "Sale" }) {
  const map = { Sale: "var(--accent-2)", New: "var(--accent)", Bestseller: "var(--primary)" };
  return <span className="ribbon" style={{ background: map[kind] || "var(--primary)" }}>{children}</span>;
}

function QtyStepper({ value, onChange, min = 1, max = 99, size = "md" }) {
  return (
    <div className={"qty qty--" + size}>
      <button type="button" aria-label="Decrease" disabled={value <= min}
              onClick={() => onChange(Math.max(min, value - 1))}>
        <Glyph name="minus" size={size === "sm" ? 15 : 18} />
      </button>
      <span className="qty__val">{value}</span>
      <button type="button" aria-label="Increase" disabled={value >= max}
              onClick={() => onChange(Math.min(max, value + 1))}>
        <Glyph name="plus" size={size === "sm" ? 15 : 18} />
      </button>
    </div>
  );
}

function Button({ variant = "primary", size, block, onClick, children, type = "button", style }) {
  const cls = ["btn", "btn--" + variant];
  if (size) cls.push("btn--" + size);
  if (block) cls.push("btn--block");
  return <button type={type} className={cls.join(" ")} onClick={onClick} style={style}>{children}</button>;
}

// Product image via drop-in slot, tinted to the product's category.
function ProductImage({ product, kind = "card" }) {
  const color = window.AC.catColor(product.category);
  const id = "ac-" + kind + "-" + product.id;
  const radius = kind === "card" ? "0" : "18";
  return (
    <div className="pimg" style={{ background: `linear-gradient(150deg, ${color}1A, ${color}33)` }}>
      <image-slot
        id={id}
        shape="rect"
        radius={radius}
        placeholder={product.name}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      ></image-slot>
    </div>
  );
}

function ProductCard({ product, onOpen, onAdd, showRating = true }) {
  return (
    <article className="card">
      <button className="card__media" onClick={() => onOpen(product)} aria-label={"View " + product.name}>
        {product.badge && <Badge kind={product.badge}>{product.badge}</Badge>}
        <ProductImage product={product} kind="card" />
      </button>
      <div className="card__body">
        <button className="card__cat" onClick={() => onOpen(product)}>
          <span className="dot" style={{ background: window.AC.catColor(product.category) }}></span>
          {product.category}
        </button>
        <h3 className="card__name"><button onClick={() => onOpen(product)}>{product.name}</button></h3>
        {showRating && <Stars rating={product.rating} reviews={product.reviews} size={13} />}
        <div className="card__foot">
          <div className="price">
            <span className="price__now">{money(product.price)}</span>
            {product.compareAt && <span className="price__was">{money(product.compareAt)}</span>}
          </div>
          <button className="card__add" onClick={() => onAdd(product)} aria-label={"Add " + product.name + " to cart"}>
            <Glyph name="plus" size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Navigation ──────────────────────────────────────────────────────────────
function Nav({ route, cartCount, search, onSearch, onNav }) {
  const [q, setQ] = React.useState(search || "");
  React.useEffect(() => { setQ(search || ""); }, [search]);
  function submit(e) { e.preventDefault(); onNav({ name: "shop", search: q }); }
  const links = [["home", "Home"], ["shop", "Shop"]];
  return (
    <header className="nav">
      <div className="nav__inner container">
        <button className="brand" onClick={() => onNav({ name: "home" })}>
          <span className="brand__mark"><Glyph name="bag" size={20} strokeWidth={2.2} /></span>
          <span className="brand__name">An<span>Commerce</span></span>
        </button>
        <form className="nav__search" onSubmit={submit}>
          <Glyph name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" aria-label="Search products" />
        </form>
        <nav className="nav__links">
          {links.map(([k, label]) => (
            <button key={k} className={"nav__link" + (route.name === k ? " is-active" : "")}
                    onClick={() => onNav({ name: k })}>{label}</button>
          ))}
          <button className="cartbtn" onClick={() => onNav({ name: "cart" })} aria-label="Open cart">
            <Glyph name="cart" size={22} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ onNav }) {
  return (
    <footer className="foot">
      <div className="container foot__inner">
        <div className="foot__brand">
          <span className="brand__mark"><Glyph name="bag" size={20} strokeWidth={2.2} /></span>
          <span className="brand__name">An<span>Commerce</span></span>
          <p>A playful marketplace for everything you love. Built to make shopping feel good.</p>
        </div>
        <div className="foot__cols">
          <div>
            <h4>Shop</h4>
            {window.AC.categories.slice(0, 4).map((c) => (
              <button key={c.name} onClick={() => onNav({ name: "shop", category: c.name })}>{c.name}</button>
            ))}
          </div>
          <div>
            <h4>Help</h4>
            <button>Shipping &amp; returns</button>
            <button>Track your order</button>
            <button>Contact us</button>
          </div>
          <div>
            <h4>Company</h4>
            <button>About</button>
            <button>Careers</button>
            <button>Sustainability</button>
          </div>
        </div>
      </div>
      <div className="container foot__base">
        <span>© 2026 AnCommerce. All rights reserved.</span>
        <span className="foot__pay">Secure checkout <Glyph name="lock" size={14} /></span>
      </div>
    </footer>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="toast" key={toast.key}>
      <span className="toast__ic"><Glyph name="check" size={16} strokeWidth={2.6} /></span>
      <span>{toast.msg}</span>
    </div>
  );
}

Object.assign(window, {
  Glyph, CatIcon, money, Stars, Badge, QtyStepper, Button,
  ProductImage, ProductCard, Nav, Footer, Toast
});
