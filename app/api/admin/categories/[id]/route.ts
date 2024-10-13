import { NextResponse } from "next/server"
import prisma from "@/app/lib/db"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)

  try {
    // First, delete all prayers associated with this category
    await prisma.prayer.deleteMany({
      where: { categoryId: id },
    })

    // Then delete the category
    await prisma.category.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Category and associated prayers deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting category" }, { status: 500 })
  }
}