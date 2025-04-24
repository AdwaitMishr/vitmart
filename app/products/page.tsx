import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { products } from "@/lib/data"

export default function ProductsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Products</h1>
          <p className="text-muted-foreground">Browse all available products</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full pl-8 sm:w-[300px] rounded-full" />
          </div>

          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px] rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsGrid />
        </Suspense>
      </div>
    </div>
  )
}

function ProductsGrid() {
  return (
    <>
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="group">
          <Card className="overflow-hidden transition-all hover:shadow-lg animated-border-card">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {product.isNew && (
                <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                  New
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h2 className="line-clamp-1 font-medium">{product.name}</h2>
              <p className="line-clamp-1 text-sm text-muted-foreground">{product.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-medium text-primary">{formatPrice(product.price)}</span>
                <span className="text-xs text-muted-foreground">{product.seller}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="secondary" className="w-full rounded-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  )
}

function ProductsGridSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <Card key={i} className="overflow-hidden animated-border-card">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="mt-2 h-4 w-1/2" />
        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-4 w-1/5" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  ))
}
