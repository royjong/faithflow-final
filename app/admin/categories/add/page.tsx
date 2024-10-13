"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function AddCategoryPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [iconName, setIconName] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, iconName, imageUrl }),
    })
    if (response.ok) {
      router.push("/admin/categories")
    } else {
      // Handle error
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Nieuwe Categorie Toevoegen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Naam" value={name} onChange={(e) => setName(e.target.value)} />
        <Textarea placeholder="Beschrijving" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Icoon Naam" value={iconName} onChange={(e) => setIconName(e.target.value)} />
        <Input placeholder="Afbeelding URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Button type="submit">Toevoegen</Button>
      </form>
    </div>
  )
}