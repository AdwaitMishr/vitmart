"use client"

import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "./cart-provider"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar"

export function CartSidebar() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const { openMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar side="right" variant="floating">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">Your Cart</span>
          {totalItems > 0 && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {totalItems}
            </span>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpenMobile(false)} className="md:hidden">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </SidebarHeader>

      <Separator />

      <SidebarContent className="p-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4 text-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">Add items to your cart to see them here</p>
            </div>
            <Button asChild>
              <Link href="/products" onClick={() => setOpenMobile(false)}>
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.name}</h4>
                    <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">{formatPrice(item.price)}</span>
                  <div className="mt-auto flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SidebarContent>

      {items.length > 0 && (
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Button asChild className="w-full rounded-full">
            <Link href="/checkout" onClick={() => setOpenMobile(false)}>
              Checkout
            </Link>
          </Button>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
