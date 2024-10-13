"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddPrayerPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const [duration, setDuration] = useState("")
  const [categoryId, setCategoryId] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/admin/prayers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, audioUrl, thumbnailUrl, duration, categoryId: parseInt(categoryId) }),
    })
    if (response.ok) {
      router.push("/admin/prayers")
    } else {
      // Handle error
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Nieuw Gebed Toevoegen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Beschrijving" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Audio URL" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} />
        <Input placeholder="Thumbnail URL" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
        <Input placeholder="Duur" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <Select onValueChange={(value) => setCategoryId(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecteer een categorie" />
          </SelectTrigger>
          <SelectContent>
            {/* You'll need to fetch categories and map them here */}
            <SelectItem value="1">Categorie 1</SelectItem>
            <SelectItem value="2">Categorie 2</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Toevoegen</Button>
      </form>
    </div>
  )
}