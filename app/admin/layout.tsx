"use client"


import { Sidebar } from "../components/sidebarAdmin"
import { usePathname } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  )
}