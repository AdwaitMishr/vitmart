"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { useEffect, useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const { totalItems } = useCart()
  const { toggleSidebar } = useSidebar()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  const routes = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/sell", label: "Sell" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled ? "scrolled-nav" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">vitMart</span>
          </Link>

          <nav className="hidden gap-6 md:flex">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="relative" aria-label="Open cart">
            <ShoppingCart className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>

          <Link href="/profile">
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className="size-5" />
            </Button>
          </Link>

          <Link href="/auth/login" className="hidden md:block">
            <Button variant="outline" size="sm" className="rounded-full">
              Sign In
            </Button>
          </Link>

          <Link href="/auth/signup" className="hidden md:block">
            <Button size="sm" className="rounded-full">
              Sign Up
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                {routes.map((route) => (
                  <Link key={route.href} href={route.href} className="text-sm font-medium">
                    {route.label}
                  </Link>
                ))}
                <Link href="/auth/login" className="text-sm font-medium">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="text-sm font-medium">
                  Sign Up
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
