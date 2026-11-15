export function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' $'
}

// l'API renvoie les catégories en anglais
const labels = {
  electronics: 'Électronique',
  jewelery: 'Bijoux',
  "men's clothing": 'Homme',
  "women's clothing": 'Femme',
}

export function categoryLabel(category) {
  return labels[category] || category
}
