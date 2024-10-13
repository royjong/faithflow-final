import { NextResponse } from "next/server"
import prisma from "@/app/lib/db"

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, audioUrl, thumbnailUrl, duration, categoryId } = body

  try {
    const prayer = await prisma.prayer.create({
      data: {
        title,
        description,
        audioUrl,
        thumbnailUrl,
        duration,
        categoryId,
      },
    })
    return NextResponse.json(prayer)
  } catch (error) {
    return NextResponse.json({ error: "Error creating prayer" }, { status: 500 })
  }
}