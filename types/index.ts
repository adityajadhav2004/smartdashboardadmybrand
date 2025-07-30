export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  format: 'currency' | 'number' | 'percentage';
}

export interface ChartDataPoint {
  name: string;
  value: number;
  revenue?: number;
  impressions?: number;
  clicks?: number;
  date?: string;
}

export interface CampaignData {
  id: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  cpc: number;
  conversionRate: number;
  status: 'Live' | 'Paused' | 'Ended';
  type: 'Brand' | 'Performance' | 'Awareness';
  region: 'India' | 'US' | 'Europe' | 'Asia-Pacific';
  startDate: string;
  endDate: string;
}

export interface FilterState {
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  campaignType: string;
  region: string;
  searchTerm: string;
}

export interface DemographicData {
  segment: string;
  percentage: number;
  count: number;
  color: string;
}