"use client"

import { useState, useEffect } from "react"
import { MetricCard } from "@/components/metric-card"
import { LineChartComponent } from "@/components/charts/line-chart"
import { BarChartComponent } from "@/components/charts/bar-chart"
import { DonutChartComponent } from "@/components/charts/donut-chart"
import { FilterBar } from "@/components/filter-bar"
import { DataTable } from "@/components/data-table"
import { 
  generateMockMetrics, 
  generateRevenueData, 
  generateCampaignPerformanceData, 
  generateDemographicData,
  generateCampaignTableData 
} from "@/lib/mockData"
import { MetricCard as MetricCardType, FilterState, CampaignData } from "@/types"

export default function Dashboard() {
  const [metrics, setMetrics] = useState<MetricCardType[]>([])
  const [revenueData, setRevenueData] = useState(generateRevenueData())
  const [campaignData, setCampaignData] = useState(generateCampaignPerformanceData())
  const [demographicData, setDemographicData] = useState(generateDemographicData())
  const [tableData, setTableData] = useState<CampaignData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: null, to: null },
    campaignType: 'all',
    region: 'all',
    searchTerm: ''
  })

  // Initialize data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMetrics(generateMockMetrics())
      setTableData(generateCampaignTableData())
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Real-time updates every 10 seconds
  useEffect(() => {
    if (isLoading) return

    const interval = setInterval(() => {
      setMetrics(generateMockMetrics())
      // Slightly update chart data for real-time feel
      setCampaignData(generateCampaignPerformanceData())
    }, 10000)

    return () => clearInterval(interval)
  }, [isLoading])

  const handleExportCSV = () => {
    const filteredData = tableData.filter(item => {
      const matchesSearch = !filters.searchTerm || 
        item.campaignName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesType = filters.campaignType === 'all' || item.type === filters.campaignType
      const matchesRegion = filters.region === 'all' || item.region === filters.region
      
      return matchesSearch && matchesType && matchesRegion
    })

    const csvContent = [
      ['Campaign Name', 'Impressions', 'Clicks', 'CPC', 'Conversion Rate', 'Status', 'Type', 'Region'],
      ...filteredData.map(item => [
        item.campaignName,
        item.impressions.toString(),
        item.clicks.toString(),
        item.cpc.toString(),
        item.conversionRate.toString(),
        item.status,
        item.type,
        item.region
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'campaign-data.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    // Basic PDF export implementation
    const printContent = document.createElement('div')
    printContent.innerHTML = `
      <h1>ADmyBRAND Insights - Campaign Report</h1>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Campaign Name</th>
            <th>Impressions</th>
            <th>Clicks</th>
            <th>CPC</th>
            <th>Conversion Rate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${tableData.map(item => `
            <tr>
              <td>${item.campaignName}</td>
              <td>${item.impressions.toLocaleString()}</td>
              <td>${item.clicks.toLocaleString()}</td>
              <td>₹${item.cpc.toFixed(2)}</td>
              <td>${item.conversionRate.toFixed(2)}%</td>
              <td>${item.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Campaign Report</title></head>
          <body>${printContent.innerHTML}</body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive insights for your digital marketing campaigns
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading 
          ? Array.from({ length: 4 }).map((_, i) => (
              <MetricCard key={i} metric={{} as MetricCardType} isLoading={true} />
            ))
          : metrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))
        }
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-7">
        <LineChartComponent data={revenueData} isLoading={isLoading} />
        <BarChartComponent data={campaignData} isLoading={isLoading} />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <DonutChartComponent data={demographicData} isLoading={isLoading} />
        <div className="col-span-5">
          <div className="grid gap-4">
            <FilterBar 
              filters={filters}
              onFiltersChange={setFilters}
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
            />
            <DataTable 
              data={tableData} 
              filters={filters}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}