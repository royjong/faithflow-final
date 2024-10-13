import { NextResponse } from 'next/server'
import prisma from '@/app/lib/db'

export async function GET() {
  const currentYear = new Date().getFullYear()
  const startDate = new Date(currentYear, 0, 1) // 1 januari van het huidige jaar
  const endDate = new Date(currentYear, 11, 31) // 31 december van het huidige jaar

  const monthlyData = await prisma.user.groupBy({
    by: ['createdAt'],
    _count: {
      id: true
    },
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    }
  })

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const formattedData = monthNames.map((month, index) => {
    const monthData = monthlyData.find(data => new Date(data.createdAt).getMonth() === index)
    return {
      name: month,
      total: monthData ? monthData._count.id : 0
    }
  })

  return NextResponse.json(formattedData)
}