import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { categoryLabel, formatPrice } from '../utils'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 1200)
    return () => clearTimeout(timer)
  }, [added])

  function handleAdd() {
    addItem(product)
    setAdded(true)
  }

  return (
    <article className="card">
      <div className="card-img">
        <img src={product.image} alt={product.title} loading="lazy" />
        <button className={added ? 'add-btn added' : 'add-btn'} onClick={handleAdd}>
          {added ? 'Ajouté ✓' : 'Ajouter au panier'}
        </button>
      </div>

      <div className="card-meta">
        <span>{categoryLabel(product.category)}</span>
        <span className="rating" title={product.rating.count + ' avis'}>
          ★ {product.rating.rate.toFixed(1)}
          <small>({product.rating.count})</small>
        </span>
      </div>
      <h3 className="card-title">{product.title}</h3>
      <p className="card-desc">{product.description}</p>
      <p className="card-price">{formatPrice(product.price)}</p>
    </article>
  )
}
