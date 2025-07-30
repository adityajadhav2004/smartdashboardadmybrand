import { MetricCard, CampaignData, ChartDataPoint, DemographicData } from '@/types';

export const generateMockMetrics = (): MetricCard[] => {
  const baseRevenue = 2500000;
  const baseUsers = 45000;
  const baseConversion = 3.2;
  const baseGrowth = 12.5;

  // Add some randomness for real-time simulation
  const revenueVariation = (Math.random() - 0.5) * 100000;
  const usersVariation = Math.floor((Math.random() - 0.5) * 2000);
  const conversionVariation = (Math.random() - 0.5) * 0.5;
  const growthVariation = (Math.random() - 0.5) * 2;

  return [
    {
      title: 'Total Revenue',
      value: baseRevenue + revenueVariation,
      change: baseGrowth + growthVariation,
      changeType: Math.random() > 0.3 ? 'increase' : 'decrease',
      icon: 'TrendingUp',
      format: 'currency'
    },
    {
      title: 'Active Users',
      value: baseUsers + usersVariation,
      change: 8.2 + (Math.random() - 0.5) * 3,
      changeType: Math.random() > 0.2 ? 'increase' : 'decrease',
      icon: 'Users',
      format: 'number'
    },
    {
      title: 'Conversion Rate',
      value: baseConversion + conversionVariation,
      change: 2.1 + (Math.random() - 0.5) * 1,
      changeType: Math.random() > 0.4 ? 'increase' : 'decrease',
      icon: 'Target',
      format: 'percentage'
    },
    {
      title: 'Growth Rate',
      value: baseGrowth + growthVariation,
      change: 5.3 + (Math.random() - 0.5) * 2,
      changeType: Math.random() > 0.3 ? 'increase' : 'decrease',
      icon: 'BarChart3',
      format: 'percentage'
    }
  ];
};

export const generateRevenueData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const revenue = 150000 + (index * 25000) + (Math.random() * 50000);
    return {
      name: month,
      value: revenue,
      revenue: revenue,
      date: `2024-${String(index + 1).padStart(2, '0')}-01`
    };
  });
};

export const generateCampaignPerformanceData = (): ChartDataPoint[] => {
  const campaigns = ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];
  return campaigns.map(campaign => ({
    name: campaign,
    impressions: Math.floor(Math.random() * 500000) + 100000,
    clicks: Math.floor(Math.random() * 25000) + 5000,
    value: Math.floor(Math.random() * 500000) + 100000
  }));
};

export const generateDemographicData = (): DemographicData[] => {
  return [
    { segment: '18-24', percentage: 22, count: 9900, color: '#3B82F6' },
    { segment: '25-34', percentage: 35, count: 15750, color: '#10B981' },
    { segment: '35-44', percentage: 28, count: 12600, color: '#F59E0B' },
    { segment: '45-54', percentage: 12, count: 5400, color: '#EF4444' },
    { segment: '55+', percentage: 3, count: 1350, color: '#8B5CF6' }
  ];
};

export const generateCampaignTableData = (): CampaignData[] => {
  const campaignNames = [
    'Summer Sale 2024', 'Brand Awareness Q4', 'Product Launch', 'Holiday Special',
    'Back to School', 'Black Friday Deals', 'New Year Campaign', 'Valentine\'s Day',
    'Mother\'s Day Special', 'Father\'s Day Promo', 'Independence Day', 'Diwali Campaign',
    'Christmas Special', 'Year End Sale', 'Spring Collection', 'Monsoon Offers'
  ];
  
  const statuses: ('Live' | 'Paused' | 'Ended')[] = ['Live', 'Paused', 'Ended'];
  const types: ('Brand' | 'Performance' | 'Awareness')[] = ['Brand', 'Performance', 'Awareness'];
  const regions: ('India' | 'US' | 'Europe' | 'Asia-Pacific')[] = ['India', 'US', 'Europe', 'Asia-Pacific'];

  return campaignNames.map((name, index) => ({
    id: `campaign-${index + 1}`,
    campaignName: name,
    impressions: Math.floor(Math.random() * 500000) + 50000,
    clicks: Math.floor(Math.random() * 25000) + 2500,
    cpc: Math.round((Math.random() * 5 + 0.5) * 100) / 100,
    conversionRate: Math.round((Math.random() * 8 + 1) * 100) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    type: types[Math.floor(Math.random() * types.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    startDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    endDate: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
  }));
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN').format(value);
};