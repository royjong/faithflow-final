import { NextResponse } from "next/server"
import prisma from "@/app/lib/db"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, description, iconName, imageUrl } = body

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description,
        iconName,
        imageUrl,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "Error creating category" }, { status: 500 })
  }
}