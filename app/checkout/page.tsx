"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import { useUser } from "@/components/user-provider"
import { products } from "@/lib/data"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, totalPrice, clearCart } = useCart()
  const { isLoggedIn, addOrder } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [checkoutItems, setCheckoutItems] = useState(items)

  useEffect(() => {
    // Check if there's a specific product in the URL
    const productId = searchParams.get("product")
    const quantity = Number.parseInt(searchParams.get("quantity") || "1", 10)

    if (productId) {
      const product = products.find((p) => p.id === productId)
      if (product) {
        setCheckoutItems([
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image,
          },
        ])
      }
    } else {
      setCheckoutItems(items)
    }
  }, [searchParams, items])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add order to user's orders
      addOrder({
        total: checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        items: checkoutItems,
      })

      // Show success state
      setIsComplete(true)

      // Clear cart if using cart items
      if (!searchParams.get("product")) {
        clearCart()
      }
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isComplete) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Order Complete!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been processed successfully.
          </p>
          <div className="mt-8 space-y-4">
            <Button asChild className="w-full rounded-full">
              <Link href="/profile?tab=orders">View Your Orders</Link>
            </Button>
            <Button variant="outline" asChild className="w-full rounded-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-8">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add items to your cart to proceed to checkout</p>
          <Button asChild className="mt-8 rounded-full">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + tax

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
        <h1 className="text-3xl font-bold gradient-text">Checkout</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="animated-border-card">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="rounded-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" required className="rounded-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" required className="rounded-full" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" required className="rounded-full" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">PIN Code</Label>
                  <Input id="zipCode" required className="rounded-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="India" required className="rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8 animated-border-card">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="card" className="flex-1">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="upi" className="flex-1">
                      UPI
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="card" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required className="rounded-full" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required className="rounded-full" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" required className="rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVV</Label>
                        <Input id="cvc" placeholder="123" required className="rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="saveCard" className="h-4 w-4 rounded border-gray-300" />
                      <Label htmlFor="saveCard" className="text-sm font-normal">
                        Save card for future purchases
                      </Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="upi" className="mt-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="name@upi" required className="rounded-full" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You will receive a payment request on your UPI app to complete the transaction.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 flex items-center justify-between">
                  <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : `Pay ${formatPrice(total)}`}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex items-center justify-center border-t px-6 py-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Your payment information is secure and encrypted
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="animated-border-card">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {checkoutItems.length} {checkoutItems.length === 1 ? "item" : "items"} in your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
