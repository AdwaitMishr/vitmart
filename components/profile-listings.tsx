"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useUser } from "@/components/user-provider"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ProfileListings() {
  const { userListings } = useUser()
  const [listingToDelete, setListingToDelete] = useState<string | null>(null)

  return (
    <Card className="animated-border-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Listings</CardTitle>
            <CardDescription>Manage your product listings</CardDescription>
          </div>
          <Button asChild>
            <Link href="/sell">Add New Listing</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {userListings.length > 0 ? (
          <div className="space-y-4">
            {userListings.map((listing) => (
              <div key={listing.id} className="rounded-lg border p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md">
                    <Image src={listing.image || "/placeholder.svg"} alt={listing.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium">{listing.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {listing.category} • Listed on {listing.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          listing.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {listing.status}
                      </span>
                      <span className="text-sm font-medium">{formatPrice(listing.price)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/products/${listing.id}`}>View</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/sell/edit/${listing.id}`}>Edit</Link>
                    </Button>
                    <AlertDialog
                      open={listingToDelete === listing.id}
                      onOpenChange={(open) => !open && setListingToDelete(null)}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                          onClick={() => setListingToDelete(listing.id)}
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your listing.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="font-medium">No Listings Yet</h3>
            <p className="text-muted-foreground">You haven't created any product listings yet</p>
            <Button className="mt-4" asChild>
              <Link href="/sell">Create Listing</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
