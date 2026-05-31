/* AnCommerce — Shop listing + Product detail. */

const SORTS = [
  { k: "featured", label: "Featured" },
  { k: "price-asc", label: "Price: low to high" },
  { k: "price-desc", label: "Price: high to low" },
  { k: "rating", label: "Top rated" },
  { k: "name", label: "Name A–Z" }
];

function sortProducts(list, sort) {
  const a = list.slice();
  if (sort === "price-asc") a.sort((x, y) => x.price - y.price);
  else if (sort === "price-desc") a.sort((x, y) => y.price - x.price);
  else if (sort === "rating") a.sort((x, y) => y.rating - x.rating);
  else if (sort === "name") a.sort((x, y) => x.name.localeCompare(y.name));
  return a;
}

function ShopPage({ route, onNav, onOpen, onAdd, showRating }) {
  const [category, setCategory] = React.useState(route.category || "All");
  const [search, setSearch] = React.useState(route.search || "");
  const [sort, setSort] = React.useState("featured");

  React.useEffect(() => { setCategory(route.category || "All"); }, [route.category]);
  React.useEffect(() => { setSearch(route.search || ""); }, [route.search]);

  const cats = ["All", ...window.AC.categories.map((c) => c.name)];
  let list = window.AC.products.filter((p) => {
    const okCat = category === "All" || p.category === category;
    const q = search.trim().toLowerCase();
    const okSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q);
    return okCat && okSearch;
  });
  list = sortProducts(list, sort);

  return (
    <div className="shop">
      <div className="shop__hero">
        <div className="container">
          <button className="crumbs" onClick={() => onNav({ name: "home" })}>Home <Glyph name="chevron" size={13} strokeWidth={2.4} /> <span>Shop</span></button>
          <h1 className="shop__title">{category === "All" ? "All products" : category}</h1>
          <p className="shop__lede">Browse our full collection — filter, sort, and add to cart in a tap.</p>
        </div>
      </div>

      <div className="container">
        <div className="toolbar">
          <div className="toolbar__search">
            <Glyph name="search" size={18} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search within products…" aria-label="Search" />
            {search && <button className="toolbar__clear" onClick={() => setSearch("")} aria-label="Clear"><Glyph name="x" size={15} strokeWidth={2.4} /></button>}
          </div>
          <label className="sortsel">
            <span>Sort</span>
            <div className="sortsel__box">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => <option key={s.k} value={s.k}>{s.label}</option>)}
              </select>
              <Glyph name="chevronDown" size={16} />
            </div>
          </label>
        </div>

        <div className="pills">
          {cats.map((c) => (
            <button key={c} className={"pill" + (category === c ? " is-active" : "")}
                    style={c !== "All" ? { "--pill": window.AC.catColor(c) } : {}}
                    onClick={() => setCategory(c)}>
              {c !== "All" && <span className="pill__dot" style={{ background: window.AC.catColor(c) }}></span>}
              {c}
            </button>
          ))}
        </div>

        <div className="shop__count">{list.length} {list.length === 1 ? "product" : "products"}</div>

        {list.length === 0 ? (
          <div className="empty">
            <span className="empty__ic"><Glyph name="search" size={28} /></span>
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
            <Button variant="secondary" onClick={() => { setSearch(""); setCategory("All"); }}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid--shop">
            {list.map((p) => <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} showRating={showRating} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Product detail ────────────────────────────────────────────────────────
function ProductPage({ product, onNav, onOpen, onAdd, showRating }) {
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("details");
  React.useEffect(() => { setQty(1); setTab("details"); window.scrollTo(0, 0); }, [product.id]);

  const related = window.AC.products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const color = window.AC.catColor(product.category);
  const save = product.compareAt ? Math.round((1 - product.price / product.compareAt) * 100) : 0;

  return (
    <div className="pdp">
      <div className="container">
        <button className="crumbs" onClick={() => onNav({ name: "shop", category: product.category })}>
          <Glyph name="arrowLeft" size={15} strokeWidth={2.4} /> Back to {product.category}
        </button>

        <div className="pdp__grid">
          <div className="pdp__media">
            <div className="pdp__main" style={{ background: `linear-gradient(150deg, ${color}1A, ${color}38)` }}>
              {product.badge && <Badge kind={product.badge}>{product.badge}</Badge>}
              <image-slot id={"ac-pdp-" + product.id} shape="rounded" radius="22" placeholder={product.name}
                          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
            </div>
            <div className="pdp__thumbs">
              {[1, 2, 3].map((i) => (
                <div className="pdp__thumb" key={i} style={{ background: `${color}14` }}>
                  <image-slot id={"ac-pdp-" + product.id + "-" + i} shape="rounded" radius="14" placeholder={"View " + i}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
                </div>
              ))}
            </div>
          </div>

          <div className="pdp__info">
            <button className="pdp__cat" onClick={() => onNav({ name: "shop", category: product.category })}>
              <span className="dot" style={{ background: color }}></span>{product.category}
            </button>
            <h1 className="pdp__name">{product.name}</h1>
            <p className="pdp__tagline">{product.tagline}</p>
            <div className="pdp__rate"><Stars rating={product.rating} reviews={product.reviews} size={17} /></div>

            <div className="pdp__price">
              <span className="pdp__now">{money(product.price)}</span>
              {product.compareAt && <span className="pdp__was">{money(product.compareAt)}</span>}
              {save > 0 && <span className="pdp__save">Save {save}%</span>}
            </div>

            <p className="pdp__desc">{product.description}</p>

            <div className={"pdp__stock" + (product.stock < 20 ? " is-low" : "")}>
              <span className="pdp__stockdot"></span>
              {product.stock < 20 ? `Only ${product.stock} left in stock — order soon` : "In stock & ready to ship"}
            </div>

            <div className="pdp__buy">
              <QtyStepper value={qty} onChange={setQty} max={Math.min(10, product.stock)} />
              <Button variant="primary" size="lg" block onClick={() => onAdd(product, qty)}>
                <Glyph name="cart" size={19} strokeWidth={2.2} /> Add to cart · {money(product.price * qty)}
              </Button>
            </div>
            <button className="pdp__wish"><Glyph name="heart" size={17} /> Save for later</button>

            <div className="pdp__perks">
              <span><Glyph name="truck" size={17} /> Free shipping over $50</span>
              <span><Glyph name="shield" size={17} /> 30-day easy returns</span>
            </div>

            <div className="pdp__tabs">
              <div className="pdp__tabbar">
                {[["details", "Highlights"], ["ship", "Shipping & returns"]].map(([k, l]) => (
                  <button key={k} className={"pdp__tab" + (tab === k ? " is-active" : "")} onClick={() => setTab(k)}>{l}</button>
                ))}
              </div>
              {tab === "details" ? (
                <ul className="pdp__hl">
                  {product.highlights.map((h) => (
                    <li key={h}><span className="pdp__check"><Glyph name="check" size={13} strokeWidth={2.8} /></span>{h}</li>
                  ))}
                </ul>
              ) : (
                <div className="pdp__ship">
                  <p><strong>Fast &amp; free.</strong> Orders over $50 ship free and arrive in 2–4 business days. Standard shipping is a flat $5.99.</p>
                  <p><strong>Easy returns.</strong> Changed your mind? Return any item within 30 days for a full refund — no questions asked.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="section">
            <div className="section__head"><h2 className="section__title">You might also like</h2></div>
            <div className="grid grid--shop">
              {related.map((p) => <ProductCard key={p.id} product={p} onOpen={onOpen} onAdd={onAdd} showRating={showRating} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ShopPage, ProductPage });
