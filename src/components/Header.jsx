import { useCart } from '../context/CartContext'

export default function Header({ search, onSearch, onOpenCart }) {
  const { count } = useCart()

  return (
    <header className="header">
      <div className="container header-inner">
        <a href="/" className="logo">
          fakestore<span>.</span>
        </a>

        <label className="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            placeholder="Rechercher un produit"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </label>

        <button className="cart-btn" onClick={onOpenCart}>
          Panier
          <span className={count > 0 ? 'cart-count filled' : 'cart-count'}>{count}</span>
        </button>
      </div>
    </header>
  )
}
