import { queryOptions } from '@tanstack/react-query';
import { AnalyticsQueryParams } from './analytics.types';
import { getAnalytics } from './analytics.api';

const analyticsQueryOptions = (params: AnalyticsQueryParams) =>
  queryOptions({
    queryKey: ['analytics', params],
    queryFn: () => getAnalytics(params),
  });

export { analyticsQueryOptions };
