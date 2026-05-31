/* AnCommerce — Cart, Checkout, Confirmation. */

const SHIP_FREE_THRESHOLD = 50;
const SHIP_FLAT = 5.99;
const TAX_RATE = 0.08;

function totals(items) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal === 0 || subtotal >= SHIP_FREE_THRESHOLD ? 0 : SHIP_FLAT;
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);
  return { subtotal, shipping, tax, total };
}

function SummaryRows({ t }) {
  return (
    <div className="sum__rows">
      <div className="sum__row"><span>Subtotal</span><span>{money(t.subtotal)}</span></div>
      <div className="sum__row">
        <span>Shipping</span>
        <span>{t.shipping === 0 ? <em className="sum__free">Free</em> : money(t.shipping)}</span>
      </div>
      <div className="sum__row"><span>Estimated tax</span><span>{money(t.tax)}</span></div>
      <div className="sum__row sum__row--total"><span>Total</span><span>{money(t.total)}</span></div>
    </div>
  );
}

function CartLine({ item, product, onQty, onRemove }) {
  const color = window.AC.catColor(product ? product.category : "Electronics");
  return (
    <div className="line">
      <div className="line__media" style={{ background: `${color}18` }}>
        <image-slot id={"ac-card-" + item.id} shape="rounded" radius="12" placeholder={item.name}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
      </div>
      <div className="line__main">
        <div className="line__top">
          <div>
            {product && <span className="line__cat" style={{ color }}>{product.category}</span>}
            <h3 className="line__name">{item.name}</h3>
          </div>
          <button className="line__rm" onClick={() => onRemove(item.id)} aria-label="Remove"><Glyph name="trash" size={17} /></button>
        </div>
        <div className="line__bottom">
          <QtyStepper value={item.qty} onChange={(q) => onQty(item.id, q)} size="sm" />
          <div className="line__price">
            <span className="line__total">{money(item.price * item.qty)}</span>
            {item.qty > 1 && <span className="line__each">{money(item.price)} each</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CartPage({ items, onQty, onRemove, onNav }) {
  const t = totals(items);
  const byId = Object.fromEntries(window.AC.products.map((p) => [p.id, p]));
  const toFree = SHIP_FREE_THRESHOLD - t.subtotal;

  if (items.length === 0) {
    return (
      <div className="container pagepad">
        <div className="empty empty--lg">
          <span className="empty__ic"><Glyph name="cart" size={32} /></span>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet. Let's fix that.</p>
          <Button variant="primary" size="lg" onClick={() => onNav({ name: "shop" })}>Start shopping <Glyph name="arrowRight" size={17} strokeWidth={2.4} /></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pagepad">
      <h1 className="pagetitle">Your cart <span>({items.reduce((s, i) => s + i.qty, 0)} items)</span></h1>
      <div className="cart">
        <div className="cart__lines">
          {toFree > 0 && (
            <div className="freebar">
              <div className="freebar__top"><Glyph name="truck" size={16} /> You're <strong>{money(toFree)}</strong> away from free shipping!</div>
              <div className="freebar__track"><div className="freebar__fill" style={{ width: Math.min(100, (t.subtotal / SHIP_FREE_THRESHOLD) * 100) + "%" }}></div></div>
            </div>
          )}
          {items.map((it) => <CartLine key={it.id} item={it} product={byId[it.id]} onQty={onQty} onRemove={onRemove} />)}
          <button className="link cart__continue" onClick={() => onNav({ name: "shop" })}>
            <Glyph name="arrowLeft" size={15} strokeWidth={2.4} /> Continue shopping
          </button>
        </div>

        <aside className="sum">
          <h2 className="sum__title">Order summary</h2>
          <SummaryRows t={t} />
          <Button variant="primary" size="lg" block onClick={() => onNav({ name: "checkout" })}>
            Checkout <Glyph name="arrowRight" size={18} strokeWidth={2.4} />
          </Button>
          <div className="sum__trust"><Glyph name="lock" size={14} /> Secure, encrypted checkout</div>
        </aside>
      </div>
    </div>
  );
}

// ── Checkout ────────────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, error, type = "text", placeholder, full, autoComplete }) {
  return (
    <label className={"field" + (full ? " field--full" : "")}>
      <span className="field__label">{label}</span>
      <input className={"input" + (error ? " is-error" : "")} type={type} value={value} placeholder={placeholder}
             autoComplete={autoComplete} onChange={(e) => onChange(name, e.target.value)} />
      {error && <span className="field__err">{error}</span>}
    </label>
  );
}

function CheckoutPage({ items, onNav, onPlace }) {
  const t = totals(items);
  const byId = Object.fromEntries(window.AC.products.map((p) => [p.id, p]));
  const [f, setF] = React.useState({
    email: "", first: "", last: "", address: "", city: "", state: "", zip: "",
    card: "", exp: "", cvc: ""
  });
  const [errors, setErrors] = React.useState({});
  const set = (name, val) => setF((p) => ({ ...p, [name]: val }));

  function validate() {
    const e = {};
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.first.trim()) e.first = "Required";
    if (!f.last.trim()) e.last = "Required";
    if (!f.address.trim()) e.address = "Required";
    if (!f.city.trim()) e.city = "Required";
    if (!f.state.trim()) e.state = "Required";
    if (!/^\d{5}(-\d{4})?$/.test(f.zip.trim())) e.zip = "Enter a valid ZIP";
    if (f.card.replace(/\s/g, "").length < 15) e.card = "Enter a valid card number";
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(f.exp.trim())) e.exp = "MM/YY";
    if (!/^\d{3,4}$/.test(f.cvc.trim())) e.cvc = "3–4 digits";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (validate()) onPlace(f, t);
    else {
      const first = document.querySelector(".input.is-error");
      if (first) first.focus({ preventScroll: false });
    }
  }

  if (items.length === 0) {
    return (
      <div className="container pagepad">
        <div className="empty empty--lg">
          <span className="empty__ic"><Glyph name="bag" size={30} /></span>
          <h3>Nothing to check out</h3>
          <p>Add a few products to your cart first.</p>
          <Button variant="primary" onClick={() => onNav({ name: "shop" })}>Browse products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container pagepad">
      <button className="crumbs" onClick={() => onNav({ name: "cart" })}><Glyph name="arrowLeft" size={15} strokeWidth={2.4} /> Back to cart</button>
      <h1 className="pagetitle">Checkout</h1>
      <form className="checkout" onSubmit={submit} noValidate>
        <div className="checkout__main">
          <section className="fcard">
            <div className="fcard__head"><span className="fcard__num">1</span><h2>Contact</h2></div>
            <div className="fgrid">
              <Field label="Email address" name="email" value={f.email} onChange={set} error={errors.email} type="email" placeholder="you@email.com" full autoComplete="email" />
            </div>
          </section>

          <section className="fcard">
            <div className="fcard__head"><span className="fcard__num">2</span><h2>Shipping address</h2></div>
            <div className="fgrid">
              <Field label="First name" name="first" value={f.first} onChange={set} error={errors.first} autoComplete="given-name" />
              <Field label="Last name" name="last" value={f.last} onChange={set} error={errors.last} autoComplete="family-name" />
              <Field label="Street address" name="address" value={f.address} onChange={set} error={errors.address} placeholder="123 Market St" full autoComplete="street-address" />
              <Field label="City" name="city" value={f.city} onChange={set} error={errors.city} autoComplete="address-level2" />
              <Field label="State" name="state" value={f.state} onChange={set} error={errors.state} placeholder="CA" autoComplete="address-level1" />
              <Field label="ZIP code" name="zip" value={f.zip} onChange={set} error={errors.zip} placeholder="94016" autoComplete="postal-code" />
            </div>
          </section>

          <section className="fcard">
            <div className="fcard__head"><span className="fcard__num">3</span><h2>Payment</h2><span className="fcard__secure"><Glyph name="lock" size={13} /> Encrypted</span></div>
            <div className="fgrid">
              <Field label="Card number" name="card" value={f.card} onChange={set} error={errors.card} placeholder="4242 4242 4242 4242" full autoComplete="cc-number" />
              <Field label="Expiry" name="exp" value={f.exp} onChange={set} error={errors.exp} placeholder="12/28" autoComplete="cc-exp" />
              <Field label="CVC" name="cvc" value={f.cvc} onChange={set} error={errors.cvc} placeholder="123" autoComplete="cc-csc" />
            </div>
            <p className="checkout__demo">Demo only — this is a prototype, no real payment is processed.</p>
          </section>
        </div>

        <aside className="sum sum--checkout">
          <h2 className="sum__title">Order summary</h2>
          <div className="sum__items">
            {items.map((it) => {
              const p = byId[it.id]; const color = window.AC.catColor(p ? p.category : "Electronics");
              return (
                <div className="sum__item" key={it.id}>
                  <div className="sum__thumb" style={{ background: `${color}18` }}>
                    <image-slot id={"ac-card-" + it.id} shape="rounded" radius="10" placeholder={it.name}
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}></image-slot>
                    <span className="sum__qty">{it.qty}</span>
                  </div>
                  <span className="sum__iname">{it.name}</span>
                  <span className="sum__iprice">{money(it.price * it.qty)}</span>
                </div>
              );
            })}
          </div>
          <SummaryRows t={t} />
          <Button variant="primary" size="lg" block type="submit">
            <Glyph name="lock" size={17} /> Place order · {money(t.total)}
          </Button>
        </aside>
      </form>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────
function ConfirmPage({ order, onNav }) {
  if (!order) {
    return (
      <div className="container pagepad">
        <div className="empty empty--lg">
          <h3>No recent order</h3>
          <Button variant="primary" onClick={() => onNav({ name: "shop" })}>Continue shopping</Button>
        </div>
      </div>
    );
  }
  const t = order.totals;
  return (
    <div className="container pagepad">
      <div className="confirm">
        <span className="confirm__tick"><Glyph name="check" size={40} strokeWidth={2.6} /></span>
        <h1>Thank you{order.form.first ? ", " + order.form.first : ""}! 🎉</h1>
        <p className="confirm__sub">Your order is confirmed. We've sent a receipt to <strong>{order.form.email}</strong>.</p>
        <div className="confirm__card">
          <div className="confirm__meta">
            <div><span>Order number</span><strong>{order.number}</strong></div>
            <div><span>Est. delivery</span><strong>{order.eta}</strong></div>
            <div><span>Total paid</span><strong>{money(t.total)}</strong></div>
          </div>
          <div className="confirm__items">
            {order.items.map((it) => (
              <div className="confirm__item" key={it.id}>
                <span>{it.qty}× {it.name}</span>
                <span>{money(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <SummaryRows t={t} />
        </div>
        <Button variant="primary" size="lg" onClick={() => onNav({ name: "shop" })}>Continue shopping <Glyph name="arrowRight" size={17} strokeWidth={2.4} /></Button>
      </div>
    </div>
  );
}

Object.assign(window, { CartPage, CheckoutPage, ConfirmPage, totals });
