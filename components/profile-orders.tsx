"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useUser } from "@/components/user-provider"

export function ProfileOrders() {
  const { userOrders } = useUser()

  return (
    <Card className="animated-border-card">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View your past orders and their status</CardDescription>
      </CardHeader>
      <CardContent>
        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : order.status === "Processing"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/profile/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right font-medium">Total: {formatPrice(order.total)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="font-medium">No Orders Yet</h3>
            <p className="text-muted-foreground">You haven't placed any orders yet</p>
            <Button className="mt-4" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
