import { NextResponse } from "next/server"
import prisma from "@/app/lib/db"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)

  try {
    await prisma.prayer.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Prayer deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Error deleting prayer" }, { status: 500 })
  }
}