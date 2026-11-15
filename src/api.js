const BASE_URL = 'https://fakestoreapi.com'

async function get(path) {
  const res = await fetch(BASE_URL + path)
  if (!res.ok) {
    throw new Error('Erreur ' + res.status)
  }
  return res.json()
}

export const getProducts = () => get('/products')
export const getCategories = () => get('/products/categories')
