"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

type Metric = {
  name: string
  value: number
  change: number
}

export function GrowthMetrics() {
  const [metrics, setMetrics] = useState<Metric[]>([])

  useEffect(() => {
    async function fetchMetrics() {
      const response = await fetch('/api/admin/growth-metrics')
      const data = await response.json()
      setMetrics(data)
    }
    fetchMetrics()
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.change > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              {metric.change > 0 ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
              {Math.abs(metric.change)}% t.o.v. vorige periode
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}