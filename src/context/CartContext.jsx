import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'fakestore-cart'

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(product) {
    setItems((prev) => {
      const found = prev.find((item) => item.id === product.id)
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      const { id, title, price, image } = product
      return [...prev, { id, title, price, image, qty: 1 }]
    })
  }

  function changeQty(id, delta) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    )
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function clearCart() {
    setItems([])
  }

  const count = items.reduce((sum, item) => sum + item.qty, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{ items, count, total, addItem, changeQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
