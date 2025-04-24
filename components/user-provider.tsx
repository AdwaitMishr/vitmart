"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { listings, orders } from "@/lib/data"

export type UserListing = {
  id: string
  name: string
  category: string
  price: number
  date: string
  status: string
  image: string
}

export type UserOrder = {
  id: string
  date: string
  status: string
  total: number
  items: {
    name: string
    price: number
    quantity: number
    image: string
  }[]
}

type UserContextType = {
  isLoggedIn: boolean
  user: {
    name: string
    email: string
    phone: string
    bio: string
  } | null
  userListings: UserListing[]
  userOrders: UserOrder[]
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  addListing: (listing: Omit<UserListing, "id" | "date" | "status">) => void
  addOrder: (order: Omit<UserOrder, "id" | "date" | "status">) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Set default logged in state to true for demo purposes
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<UserContextType["user"]>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    bio: "Computer Science student at State University. Interested in web development and AI.",
  })
  const [userListings, setUserListings] = useState<UserListing[]>(listings)
  const [userOrders, setUserOrders] = useState<UserOrder[]>(orders)

  // Load user data from localStorage on client side
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedListings = localStorage.getItem("userListings")
    const savedOrders = localStorage.getItem("userOrders")
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn")

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user from localStorage")
      }
    }

    if (savedListings) {
      try {
        setUserListings(JSON.parse(savedListings))
      } catch (e) {
        console.error("Failed to parse listings from localStorage")
      }
    }

    if (savedOrders) {
      try {
        setUserOrders(JSON.parse(savedOrders))
      } catch (e) {
        console.error("Failed to parse orders from localStorage")
      }
    }

    if (savedIsLoggedIn === "true") {
      setIsLoggedIn(true)
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("userListings", JSON.stringify(userListings))
      localStorage.setItem("userOrders", JSON.stringify(userOrders))
      localStorage.setItem("isLoggedIn", String(isLoggedIn))
    }
  }, [isLoggedIn, user, userListings, userOrders])

  const login = async (email: string, password: string) => {
    // For demo purposes, always succeed
    setUser({
      name: "John Doe",
      email: email,
      phone: "(123) 456-7890",
      bio: "Computer Science student at State University. Interested in web development and AI.",
    })
    setIsLoggedIn(true)
    return Promise.resolve()
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
  }

  const addListing = (listing: Omit<UserListing, "id" | "date" | "status">) => {
    const newListing: UserListing = {
      ...listing,
      id: `listing-${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: "Active",
    }

    setUserListings((prev) => [newListing, ...prev])
  }

  const addOrder = (order: Omit<UserOrder, "id" | "date" | "status">) => {
    const newOrder: UserOrder = {
      ...order,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      status: "Processing",
    }

    setUserOrders((prev) => [newOrder, ...prev])
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        user,
        userListings,
        userOrders,
        login,
        logout,
        addListing,
        addOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
