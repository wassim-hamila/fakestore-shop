import { useMemo, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import useProducts from './hooks/useProducts'

function sortProducts(list, sort) {
  const sorted = [...list]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'rating') sorted.sort((a, b) => b.rating.rate - a.rating.rate)
  return sorted
}

export default function App() {
  const { products, categories, loading, error, retry } = useProducts()
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const [cartOpen, setCartOpen] = useState(false)

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase()
    const filtered = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (query && !p.title.toLowerCase().includes(query)) return false
      return true
    })
    return sortProducts(filtered, sort)
  }, [products, category, sort, search])

  function resetFilters() {
    setCategory('all')
    setSearch('')
  }

  return (
    <>
      <Header search={search} onSearch={setSearch} onOpenCart={() => setCartOpen(true)} />

      <main className="container">
        <section className="hero">
          <h1>
            Peu de choses, <em>bien choisies.</em>
          </h1>
          <p>Vêtements, bijoux et électronique — livrés par la FakeStore API.</p>
        </section>

        <Filters
          categories={categories}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
          count={visible.length}
          loading={loading}
        />

        {error ? (
          <div className="state">
            <h2>Impossible de charger les produits</h2>
            <p>{error}. Vérifie ta connexion puis réessaie.</p>
            <button className="btn" onClick={retry}>
              Réessayer
            </button>
          </div>
        ) : !loading && visible.length === 0 ? (
          <div className="state">
            <h2>Aucun produit trouvé</h2>
            <p>Essaie une autre recherche ou une autre catégorie.</p>
            <button className="btn" onClick={resetFilters}>
              Tout afficher
            </button>
          </div>
        ) : (
          <ProductGrid products={visible} loading={loading} />
        )}
      </main>

      <footer className="footer container">
        <span>fakestore.</span>
        <span>Projet React — données fakestoreapi.com</span>
      </footer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
