import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "../components/overview"
import { RecentUsers } from "../components/recentUsers"
import { GrowthMetrics } from "../components/growthMetrics"
import prisma from "../lib/db"

export default async function AdminDashboard() {
  const userCount = await prisma.user.count()
  const prayerCount = await prisma.prayer.count()
  const categoryCount = await prisma.category.count()
  const premiumUserCount = await prisma.user.count({ where: { isPremium: true } })

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Gebruikers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Gebeden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prayerCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal Categorieën</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Gebruikers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{premiumUserCount}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Gebruikersgroei Overzicht</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recente Gebruikers</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentUsers />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Groei Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <GrowthMetrics />
        </CardContent>
      </Card>
    </div>
  )
}