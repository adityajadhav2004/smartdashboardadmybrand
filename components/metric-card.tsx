"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { TrendingUp, TrendingDown, Users, Target, BarChart3 } from "lucide-react"
import { MetricCard as MetricCardType } from "@/types"
import { formatCurrency, formatNumber } from "@/lib/mockData"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  metric: MetricCardType
  isLoading?: boolean
}

const iconMap = {
  TrendingUp,
  Users,
  Target,
  BarChart3
}

export function MetricCard({ metric, isLoading = false }: MetricCardProps) {
  if (isLoading) {
    return (
      <Card className="transition-all duration-200 hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-32 animate-pulse rounded bg-muted mb-2" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    )
  }

  const Icon = iconMap[metric.icon as keyof typeof iconMap]
  const TrendIcon = metric.changeType === 'increase' ? TrendingUp : TrendingDown

  const formatValue = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value
    
    switch (metric.format) {
      case 'currency':
        return formatCurrency(numValue)
      case 'percentage':
        return `${numValue.toFixed(1)}%`
      case 'number':
        return formatNumber(numValue)
      default:
        return value.toString()
    }
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {metric.title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(metric.value)}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          <TrendIcon className={cn(
            "mr-1 h-3 w-3",
            metric.changeType === 'increase' ? "text-green-500" : "text-red-500"
          )} />
          <span className={cn(
            metric.changeType === 'increase' ? "text-green-500" : "text-red-500"
          )}>
            {Math.abs(metric.change).toFixed(1)}%
          </span>
          <span className="ml-1">from last week</span>
        </div>
      </CardContent>
    </Card>
  )
}