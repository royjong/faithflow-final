import prisma from "@/app/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CategoriesTable } from "@/app/components/categoriesTable"

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categorieën</h1>
        <Link href="/admin/categories/add">
          <Button>Nieuwe Categorie Toevoegen</Button>
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  )
}