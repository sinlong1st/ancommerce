/* AnCommerce — Home page. */

function Hero({ onNav, heroStyle }) {
  const centered = heroStyle === "centered";
  return (
    <section className={"hero" + (centered ? " hero--centered" : "")}>
      <div className="hero__blob hero__blob--1"></div>
      <div className="hero__blob hero__blob--2"></div>
      <div className="hero__blob hero__blob--3"></div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow"><Glyph name="spark" size={15} strokeWidth={2.2} /> New season drops every week</span>
          <h1 className="hero__title">Everything you love,<br /><span className="hero__hl">all in one place.</span></h1>
          <p className="hero__sub">From headphones to houseplants — discover thousands of quality products at prices that make you smile. Fast, friendly, and fun.</p>
          <div className="hero__cta">
            <Button variant="primary" size="lg" onClick={() => onNav({ name: "shop" })}>
              Shop now <Glyph name="arrowRight" size={18} strokeWidth={2.4} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNav({ name: "shop" })}>Browse categories</Button>
          </div>
          <div className="hero__stats">
            <div><strong>12k+</strong><span>happy shoppers</span></div>
            <div className="hero__div"></div>
            <div><strong>2k+</strong><span>products</span></div>
            <div className="hero__div"></div>
            <div><strong>4.8★</strong><span>avg rating</span></div>
          </div>
        </div>
        {!centered && (
          <div className="hero__art">
            <div className="hero__imgwrap">
              <image-slot id="ac-hero" shape="rounded" radius="28" placeholder="Drop a hero / lifestyle image"
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
            </div>
            <div className="hero__sticker hero__sticker--ship"><Glyph name="truck" size={18} /> Free shipping over $50</div>
            <div className="hero__sticker hero__sticker--off">-30%<small>this week</small></div>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryStrip({ onNav }) {
  return (
    <section className="container section">
      <div className="section__head">
        <h2 className="section__title">Shop by category</h2>
        <button className="link" onClick={() => onNav({ name: "shop" })}>View all <Glyph name="arrowRight" size={15} strokeWidth={2.4} /></button>
      </div>
      <div className="tiles">
        {window.AC.categories.map((c) => (
          <button key={c.name} className="tile" onClick={() => onNav({ name: "shop", category: c.name })}
                  style={{ "--tile": c.color }}>
            <CatIcon name={c.name} size={46} radius={16} />
            <span className="tile__name">{c.name}</span>
            <span className="tile__go"><Glyph name="arrowRight" size={16} strokeWidth={2.4} /></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Featured({ products, onOpen, onAdd, showRating }) {
  return (
    <section className="container section">
      <div className="section__head">
        <div>
          <span className="section__kicker">Handpicked for you</span>
          <h2 className="section__title">Featured products</h2>
        </div>
        <button className="link" onClick={() => onOpen.viewAll()}>Shop all <Glyph name="arrowRight" size={15} strokeWidth={2.4} /></button>
      </div>
      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} showRating={showRating} />
        ))}
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { ic: "shield", t: "Quality, guaranteed", d: "Carefully curated items from trusted brands, backed by a 30-day promise." },
    { ic: "truck", t: "Fast, free shipping", d: "Free delivery on orders over $50 — most arrive in 2–4 days." },
    { ic: "lock", t: "Secure checkout", d: "Your payment is encrypted end-to-end. Shop with total peace of mind." }
  ];
  return (
    <section className="container section">
      <div className="values">
        {items.map((v) => (
          <div className="value" key={v.t}>
            <span className="value__ic"><Glyph name={v.ic} size={24} strokeWidth={2} /></span>
            <div>
              <h3>{v.t}</h3>
              <p>{v.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PromoBand({ onNav }) {
  return (
    <section className="container section">
      <div className="promo">
        <div className="promo__blob"></div>
        <div className="promo__copy">
          <span className="promo__kicker"><Glyph name="spark" size={14} strokeWidth={2.4} /> Members save more</span>
          <h2>Get 10% off your first order</h2>
          <p>Join the AnCommerce club for early access to drops, members-only deals, and free returns — always.</p>
        </div>
        <form className="promo__form" onSubmit={(e) => { e.preventDefault(); onNav({ name: "shop" }); }}>
          <input type="email" placeholder="you@email.com" aria-label="Email address" required />
          <Button variant="primary" type="submit">Join &amp; save</Button>
        </form>
      </div>
    </section>
  );
}

function HomePage({ onNav, onOpen, onAdd, showRating, heroStyle }) {
  const featured = window.AC.products.slice(0, 8);
  const openWithViewAll = Object.assign((p) => onOpen(p), { viewAll: () => onNav({ name: "shop" }) });
  return (
    <div>
      <Hero onNav={onNav} heroStyle={heroStyle || "split"} />
      <CategoryStrip onNav={onNav} />
      <Featured products={featured} onOpen={openWithViewAll} onAdd={onAdd} showRating={showRating} />
      <ValueProps />
      <PromoBand onNav={onNav} />
    </div>
  );
}

Object.assign(window, { HomePage });
