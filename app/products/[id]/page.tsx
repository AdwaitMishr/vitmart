"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, ChevronRight, Minus, Plus, ShoppingCart, Heart, Share2, MessageCircle } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useCart } from "@/components/cart-provider"
import { useSidebar } from "@/components/ui/sidebar"
import { products, reviews } from "@/lib/data"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { addItem } = useCart()
  const { setOpenMobile } = useSidebar()
  const [quantity, setQuantity] = useState(1)

  // Find the product data based on the ID
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="mt-4">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })

    // Open the cart sidebar
    setOpenMobile(true)
  }

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg border animated-border-card">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          {product.isNew && (
            <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              New
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.category}</p>

          <div className="mt-4 flex items-center gap-4">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
              In Stock
            </span>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-muted-foreground">
                {product.description || "No description available for this product."}
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Seller</h3>
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=32&width=32" alt={product.seller} fill className="object-cover" />
                </div>
                <span>{product.seller}</span>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Quantity</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="rounded-full" onClick={decrementQuantity}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" className="rounded-full" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4 pt-6">
            <div className="flex gap-4">
              <Button className="flex-1 rounded-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="secondary" className="w-full rounded-full" asChild>
              <Link href={`/checkout?product=${product.id}&quantity=${quantity}`}>Buy Now</Link>
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-12">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <Card className="animated-border-card">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Additional information about this product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium">Condition</h4>
                  <p className="text-muted-foreground">{product.condition || "Like New"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Brand</h4>
                  <p className="text-muted-foreground">{product.brand || "Generic"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-muted-foreground">{product.location || "Campus Area"}</p>
                </div>
                <div>
                  <h4 className="font-medium">Posted</h4>
                  <p className="text-muted-foreground">{product.postedDate || "2 days ago"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <Card className="animated-border-card">
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
              <CardDescription>See what others are saying about this product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.name}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <Separator />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageCircle className="mb-2 h-12 w-12 text-muted-foreground" />
                  <h3 className="font-medium">No Reviews Yet</h3>
                  <p className="text-muted-foreground">Be the first to review this product</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full rounded-full">
                Write a Review
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <Card className="animated-border-card">
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Details about shipping and delivery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Delivery Options</h4>
                <p className="text-muted-foreground">Meet on campus or local delivery available</p>
              </div>
              <div>
                <h4 className="font-medium">Estimated Time</h4>
                <p className="text-muted-foreground">1-2 days for local pickup</p>
              </div>
              <div>
                <h4 className="font-medium">Return Policy</h4>
                <p className="text-muted-foreground">Contact seller directly for return options</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
