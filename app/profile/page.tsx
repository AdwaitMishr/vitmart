"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Package, ShoppingBag, CreditCard, Bell, Settings, LogOut } from "lucide-react"
import { useUser } from "@/components/user-provider"
import { ProfileOrders } from "@/components/profile/profile-orders"
import { ProfileListings } from "@/components/profile/profile-listings"
import { ProfileSettings } from "@/components/profile/profile-settings"

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isLoggedIn, user, logout } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const tabParam = searchParams.get("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="md:w-1/4">
          <Card className="animated-border-card">
            <CardHeader>
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile picture"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("profile")
                    router.push("/profile?tab=profile")
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("orders")
                    router.push("/profile?tab=orders")
                  }}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "listings" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("listings")
                    router.push("/profile?tab=listings")
                  }}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  My Listings
                </Button>
                <Button
                  variant={activeTab === "payment" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("payment")
                    router.push("/profile?tab=payment")
                  }}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("notifications")
                    router.push("/profile?tab=notifications")
                  }}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => {
                    setActiveTab("settings")
                    router.push("/profile?tab=settings")
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Separator className="my-2" />
                <Button variant="ghost" className="justify-start text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card className="animated-border-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={user.name.split(" ")[0]} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user.name.split(" ")[1] || ""} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" defaultValue={user.phone} disabled={!isEditing} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                          id="bio"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          rows={4}
                          defaultValue={user.bio}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end">
                        <Button type="submit">Save Changes</Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="mt-6">
              <ProfileOrders />
            </TabsContent>

            <TabsContent value="listings" className="mt-6">
              <ProfileListings />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <ProfileSettings />
            </TabsContent>

            <TabsContent value="payment" className="mt-6">
              <Card className="animated-border-card">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CreditCard className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="font-medium">No Payment Methods</h3>
                    <p className="text-muted-foreground">You haven't added any payment methods yet</p>
                    <Button className="mt-4">Add Payment Method</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <Card className="animated-border-card">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage your notification preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                      </div>
                      <div className="h-6 w-11 cursor-pointer rounded-full bg-primary p-1">
                        <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-transform" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Order Updates</h4>
                        <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                      </div>
                      <div className="h-6 w-11 cursor-pointer rounded-full bg-primary p-1">
                        <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-transform" />
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Emails</h4>
                        <p className="text-sm text-muted-foreground">Receive marketing emails and promotions</p>
                      </div>
                      <div className="h-6 w-11 cursor-pointer rounded-full bg-muted p-1">
                        <div className="h-4 w-4 rounded-full bg-muted-foreground transition-transform" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
