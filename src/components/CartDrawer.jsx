import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils'

export default function CartDrawer({ open, onClose }) {
  const { items, count, total, changeQty, removeItem, clearCart } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div className={open ? 'drawer-wrap open' : 'drawer-wrap'} aria-hidden={!open}>
      <div className="overlay" onClick={onClose} />

      <aside className="drawer" role="dialog" aria-label="Panier">
        <div className="drawer-head">
          <h2>
            Panier <span>({count})</span>
          </h2>
          <button className="close" onClick={onClose} aria-label="Fermer le panier">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Ton panier est vide.</p>
            <button className="btn" onClick={onClose}>
              Continuer mes achats
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="thumb">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart-info">
                    <p className="cart-title">{item.title}</p>
                    <p className="cart-price">{formatPrice(item.price * item.qty)}</p>
                    <div className="cart-actions">
                      <div className="qty">
                        <button onClick={() => changeQty(item.id, -1)} aria-label="Retirer un">
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} aria-label="Ajouter un">
                          +
                        </button>
                      </div>
                      <button className="link" onClick={() => removeItem(item.id)}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer-foot">
              <div className="total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="link" onClick={clearCart}>
                Vider le panier
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
