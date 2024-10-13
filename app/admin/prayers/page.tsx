import prisma from "@/app/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PrayersTable } from "@/app/components/prayersTable"

export default async function PrayersPage() {
  const prayers = await prisma.prayer.findMany({
    include: { category: true }
  })

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gebeden</h1>
        <Link href="/admin/prayers/add">
          <Button>Nieuw Gebed Toevoegen</Button>
        </Link>
      </div>
      <PrayersTable prayers={prayers} />
    </div>
  )
}