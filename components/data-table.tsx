"use client"

import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { CampaignData, FilterState } from "@/types"
import { formatNumber, formatCurrency } from "@/lib/mockData"
import { Skeleton } from "./ui/skeleton"

interface DataTableProps {
  data: CampaignData[]
  filters: FilterState
  isLoading?: boolean
}

type SortField = keyof CampaignData
type SortDirection = 'asc' | 'desc'

export function DataTable({ data, filters, isLoading = false }: DataTableProps) {
  const [sortField, setSortField] = useState<SortField>('campaignName')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data]

    // Apply filters
    if (filters.searchTerm) {
      filtered = filtered.filter(item => 
        item.campaignName.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    if (filters.campaignType && filters.campaignType !== 'all') {
      filtered = filtered.filter(item => item.type === filters.campaignType)
    }

    if (filters.region && filters.region !== 'all') {
      filtered = filtered.filter(item => item.region === filters.region)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortDirection === 'asc' ? comparison : -comparison
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const comparison = aValue - bValue
        return sortDirection === 'asc' ? comparison : -comparison
      }
      
      return 0
    })

    return filtered
  }, [data, filters, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Live': return 'default'
      case 'Paused': return 'secondary'
      case 'Ended': return 'outline'
      default: return 'secondary'
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Performance Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('campaignName')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Campaign Name
                    <SortIcon field="campaignName" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('impressions')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Impressions
                    <SortIcon field="impressions" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('clicks')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Clicks
                    <SortIcon field="clicks" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('cpc')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    CPC
                    <SortIcon field="cpc" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('conversionRate')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Conversion %
                    <SortIcon field="conversionRate" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('status')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Status
                    <SortIcon field="status" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{campaign.campaignName}</TableCell>
                  <TableCell>{formatNumber(campaign.impressions)}</TableCell>
                  <TableCell>{formatNumber(campaign.clicks)}</TableCell>
                  <TableCell>₹{campaign.cpc.toFixed(2)}</TableCell>
                  <TableCell>{campaign.conversionRate.toFixed(2)}%</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}