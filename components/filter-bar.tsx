"use client"

import { CalendarDays, Filter, Download } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent } from "./ui/card"
import { FilterState } from "@/types"

interface FilterBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onExportCSV: () => void
  onExportPDF: () => void
}

export function FilterBar({ filters, onFiltersChange, onExportCSV, onExportPDF }: FilterBarProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="search">Search Campaigns</Label>
            <Input
              id="search"
              placeholder="Enter campaign name..."
              value={filters.searchTerm}
              onChange={(e) => 
                onFiltersChange({ ...filters, searchTerm: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Campaign Type</Label>
            <Select
              value={filters.campaignType}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, campaignType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Brand">Brand</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Awareness">Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Region</Label>
            <Select
              value={filters.region}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, region: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Asia-Pacific">Asia-Pacific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onExportCSV} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button variant="outline" size="sm" onClick={onExportPDF} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}