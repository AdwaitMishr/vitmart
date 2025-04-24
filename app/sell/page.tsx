"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Upload, Info, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser } from "@/components/user-provider"

// Function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price)
}

export default function SellPage() {
  const router = useRouter()
  const { isLoggedIn, addListing } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    category: "books",
    condition: "likeNew",
    description: "",
    price: "",
    location: "",
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // In a real app, you would upload these to a storage service
    // For demo purposes, we'll create object URLs
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...newImages])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Add the listing to the user's listings
      addListing({
        name: formData.title,
        category: formData.category,
        price: Number.parseFloat(formData.price) || 0,
        image: images[0] || "/placeholder.svg?height=400&width=400",
      })

      // Redirect to profile/listings on success
      router.push("/profile?tab=listings")
    } catch (error) {
      console.error("Error creating listing:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text">Sell Your Item</h1>
          <p className="text-muted-foreground">List your item for sale on the marketplace</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
            <div className="relative flex justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 1
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background"
                  }`}
                >
                  {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
                </div>
                <span className="mt-2 text-sm font-medium">Details</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 2
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background"
                  }`}
                >
                  {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
                </div>
                <span className="mt-2 text-sm font-medium">Images</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep >= 3
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background"
                  }`}
                >
                  3
                </div>
                <span className="mt-2 text-sm font-medium">Review</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <Card className="animated-border-card">
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
                <CardDescription>Provide information about the item you're selling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Calculus Textbook, Desk Lamp"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger id="category" className="rounded-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => handleSelectChange("condition", value)}
                    >
                      <SelectTrigger id="condition" className="rounded-full">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="likeNew">Like New</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your item in detail"
                    rows={5}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      type="number"
                      min="0.01"
                      step="0.01"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., North Campus, Library"
                      required
                    />
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Tip</AlertTitle>
                  <AlertDescription>
                    Be specific in your description to attract more buyers. Include brand, model, dimensions, and any
                    defects.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="button" onClick={nextStep} className="rounded-full">
                  Continue to Images
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="animated-border-card">
              <CardHeader>
                <CardTitle>Upload Images</CardTitle>
                <CardDescription>Add photos of your item (up to 5 images)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-md border bg-muted"
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 rounded-full"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                      >
                        ×
                      </Button>
                    </div>
                  ))}

                  {images.length < 5 && (
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted/50 transition-colors hover:bg-muted">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm font-medium">Upload Image</span>
                      <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                      <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>

                {images.length === 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Required</AlertTitle>
                    <AlertDescription>At least one image is required to create a listing</AlertDescription>
                  </Alert>
                )}

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Tip</AlertTitle>
                  <AlertDescription>
                    Clear, well-lit photos from multiple angles help your item sell faster
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full">
                  Back
                </Button>
                <Button type="button" onClick={nextStep} disabled={images.length === 0} className="rounded-full">
                  Continue to Review
                </Button>
              </CardFooter>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="animated-border-card">
              <CardHeader>
                <CardTitle>Review Your Listing</CardTitle>
                <CardDescription>Review your listing details before publishing</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="preview" className="flex-1">
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex-1">
                      Details
                    </TabsTrigger>
                    <TabsTrigger value="images" className="flex-1">
                      Images
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="mt-4">
                    <div className="rounded-lg border p-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="aspect-square rounded-md bg-muted">
                          {images.length > 0 && (
                            <div
                              className="h-full w-full rounded-md"
                              style={{
                                backgroundImage: `url(${images[0]})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{formData.title || "Sample Title"}</h3>
                          <p className="text-primary text-lg font-medium">
                            {formData.price ? formatPrice(Number.parseFloat(formData.price)) : "₹0"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formData.category} • {formData.condition}
                          </p>
                          <p className="mt-2">{formData.description || "This is a sample description of your item."}</p>
                          <div className="mt-4">
                            <h4 className="font-medium">Location</h4>
                            <p className="text-sm">{formData.location || "Campus"}</p>
                          </div>
                          <div className="mt-4">
                            <h4 className="font-medium">Seller</h4>
                            <p className="text-sm">You</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">Title</h3>
                        <p>{formData.title || "Sample Title"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Category</h3>
                        <p>{formData.category}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Condition</h3>
                        <p>{formData.condition}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Price</h3>
                        <p>{formData.price ? formatPrice(Number.parseFloat(formData.price)) : "₹0"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p>{formData.location || "Campus"}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Description</h3>
                        <p>{formData.description || "This is a sample description of your item."}</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="images" className="mt-4">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-md border"
                          style={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <Alert className="mt-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Ready to publish?</AlertTitle>
                  <AlertDescription>
                    Once published, your listing will be visible to all users on the marketplace.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep} className="rounded-full">
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting} className="rounded-full">
                  {isSubmitting ? "Publishing..." : "Publish Listing"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}
