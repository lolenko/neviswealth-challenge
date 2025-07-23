import { apiClient } from '@/api/client';
import { AnalyticsQueryParams, Company } from './analytics.types';

const getAnalytics = async (params: AnalyticsQueryParams) => {
  return (await apiClient.get<Company>('/analytics', { params })).data;
};

export { getAnalytics };
