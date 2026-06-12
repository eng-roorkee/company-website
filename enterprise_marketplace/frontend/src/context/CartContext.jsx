import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CartContext = createContext()

const CART_KEY = 'tuliho_cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((product) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.name === product.name && i.variant?.weight === product.variant?.weight
      )
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 }
        return next
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }, [])

  const updateQty = useCallback((index, delta) => {
    setItems((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], qty: Math.max(1, next[index].qty + delta) }
      return next
    })
  }, [])

  const removeItem = useCallback((index) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const totalPrice = items.reduce((sum, i) => sum + (i.variant?.price ?? i.price ?? 0) * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, totalItems, totalPrice, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
