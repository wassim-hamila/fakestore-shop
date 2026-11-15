import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="card skeleton" key={i}>
            <div className="card-img" />
            <div className="line short" />
            <div className="line" />
            <div className="line medium" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
