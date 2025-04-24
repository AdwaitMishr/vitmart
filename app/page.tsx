import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, UserPlus, Zap, BookOpen, Laptop, Coffee } from "lucide-react"
import { ThreeBackground } from "@/components/three-background"
import { products } from "@/lib/data"
import { formatPrice } from "@/lib/utils"

export default function Home() {
  return (
    <div className="flex flex-col">
      <ThreeBackground />

      {/* Hero Section */}
      <section className="relative">
        <div className="container flex flex-col items-center gap-4 py-20 text-center md:py-32">
          <div className="animate-float">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="gradient-text">vitMart</span>
              <span className="block mt-2">Campus Marketplace</span>
            </h1>
          </div>
          <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
            The ultimate platform for students to buy and sell textbooks, electronics, furniture, and more. Connect with
            fellow students and find what you need.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <Button asChild size="lg" className="rounded-full animated-border-card">
              <Link href="/products">
                Browse Products <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/sell">
                Start Selling <UserPlus className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold gradient-text">Why Choose vitMart?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg glass-card p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Fast & Easy</h3>
              <p className="text-muted-foreground">List your items in minutes and connect with buyers instantly.</p>
            </div>
            <div className="flex flex-col items-center rounded-lg glass-card p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Student Community</h3>
              <p className="text-muted-foreground">Connect with fellow students on campus for convenient exchanges.</p>
            </div>
            <div className="flex flex-col items-center rounded-lg glass-card p-6 text-center shadow-sm transition-transform hover:scale-105">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Secure Transactions</h3>
              <p className="text-muted-foreground">Our platform ensures safe and secure transactions for all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">Popular Categories</h2>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            <Link href="/products?category=books" className="group">
              <div className="animated-border-card flex flex-col items-center p-6 text-center transition-all">
                <div className="mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 transition-transform group-hover:scale-110">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Books</h3>
              </div>
            </Link>
            <Link href="/products?category=electronics" className="group">
              <div className="animated-border-card flex flex-col items-center p-6 text-center transition-all">
                <div className="mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 transition-transform group-hover:scale-110">
                  <Laptop className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Electronics</h3>
              </div>
            </Link>
            <Link href="/products?category=furniture" className="group">
              <div className="animated-border-card flex flex-col items-center p-6 text-center transition-all">
                <div className="mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 transition-transform group-hover:scale-110">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Furniture</h3>
              </div>
            </Link>
            <Link href="/products?category=accessories" className="group">
              <div className="animated-border-card flex flex-col items-center p-6 text-center transition-all">
                <div className="mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 transition-transform group-hover:scale-110">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Accessories</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-background dark:to-blue-950/20">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold gradient-text">Featured Products</h2>
            <Button asChild variant="ghost" className="group">
              <Link href="/products">
                View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="group">
                <div className="animated-border-card overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg">
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
                  <div className="p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-medium text-primary">{formatPrice(product.price)}</span>
                      <span className="text-xs text-muted-foreground">{product.seller}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold">What Students Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="glass-card rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Student" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Computer Science</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "vitMart made it so easy to sell my old textbooks and find the ones I needed for this semester. Saved me
                hundreds of dollars!"
              </p>
            </div>
            <div className="glass-card rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Student" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Michael Chen</h3>
                  <p className="text-sm text-muted-foreground">Engineering</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "I found a great deal on a graphing calculator that I needed for my engineering courses. The seller was
                another student in my building!"
              </p>
            </div>
            <div className="glass-card rounded-lg p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image src="/placeholder.svg?height=48&width=48" alt="Student" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-medium">Emily Rodriguez</h3>
                  <p className="text-sm text-muted-foreground">Business</p>
                </div>
              </div>
              <p className="italic text-muted-foreground">
                "As a business student, I appreciate how well-designed and efficient vitMart is. I've both bought and
                sold items with great experiences."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-gradient py-16 text-white">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mx-auto mb-8 max-w-2xl">
            Join thousands of students who are already buying and selling on our platform. Sign up today and start your
            journey with us!
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full">
            <Link href="/auth/signup">Create an Account</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
