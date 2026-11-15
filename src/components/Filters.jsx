import { categoryLabel } from '../utils'

export default function Filters({
  categories,
  category,
  onCategory,
  sort,
  onSort,
  count,
  loading,
}) {
  return (
    <div className="filters">
      <div className="chips">
        <button
          className={category === 'all' ? 'chip active' : 'chip'}
          onClick={() => onCategory('all')}
        >
          Tout
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? 'chip active' : 'chip'}
            onClick={() => onCategory(cat)}
          >
            {categoryLabel(cat)}
          </button>
        ))}
      </div>

      <div className="filters-right">
        {!loading && (
          <span className="count">
            {count} produit{count > 1 ? 's' : ''}
          </span>
        )}
        <label className="sort">
          <span>Trier par</span>
          <select value={sort} onChange={(e) => onSort(e.target.value)}>
            <option value="default">Nouveautés</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rating">Meilleures notes</option>
          </select>
        </label>
      </div>
    </div>
  )
}
