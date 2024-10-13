import { NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export async function GET() {
  const now = new Date()
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
  const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, now.getDate())

  const [
    currentUserCount,
    previousUserCount,
    currentPremiumCount,
    previousPremiumCount,
    currentPrayerCount,
    previousPrayerCount,
  ] = await Promise.all([
    prisma.user.count({ where: { createdAt: { gte: oneMonthAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),
    prisma.user.count({ where: { isPremium: true, createdAt: { gte: oneMonthAgo } } }),
    prisma.user.count({ where: { isPremium: true, createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),
    prisma.prayer.count({ where: { createdAt: { gte: oneMonthAgo } } }),
    prisma.prayer.count({ where: { createdAt: { gte: twoMonthsAgo, lt: oneMonthAgo } } }),
  ])

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  const metrics = [
    {
      name: "Nieuwe Gebruikers",
      value: currentUserCount,
      change: calculateGrowth(currentUserCount, previousUserCount)
    },
    {
      name: "Nieuwe Premium Gebruikers",
      value: currentPremiumCount,
      change: calculateGrowth(currentPremiumCount, previousPremiumCount)
    },
    {
      name: "Nieuwe Gebeden",
      value: currentPrayerCount,
      change: calculateGrowth(currentPrayerCount, previousPrayerCount)
    },
  ]

  return NextResponse.json(metrics)
}