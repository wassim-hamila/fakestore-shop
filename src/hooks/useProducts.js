import { useEffect, useState } from 'react'
import { getCategories, getProducts } from '../api'

export default function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        if (cancelled) return
        setProducts(productsData)
        setCategories(categoriesData)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  const retry = () => setAttempt((n) => n + 1)

  return { products, categories, loading, error, retry }
}
