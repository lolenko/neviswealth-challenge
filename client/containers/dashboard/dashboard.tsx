import {
  Avatar,
  TableColumnDef,
  Table,
  Stack,
  Surface,
  BarChart,
  ChartPalette,
  BarConfig,
  Heading,
  TableRowClickParams,
} from '@/ui-kit/components';
// import data from './data.json' with { type: 'json' };
import '@/ui-kit/theme/default.css';
import { AnyAnalyticsNode, AggregatedChannelsData, EntityID } from './entities';
import { useMemo, useState } from 'react';
import { formatDate, getPeriodLength } from '@/utils/date';
import { aggregateChannelsById, getSubRows, hasSubRows } from './use-cases';
import { useQuery } from '@tanstack/react-query';
import { analyticsQueryOptions } from '@/api/analytics';

const STACK_ID = 'same';
const BARS: BarConfig<AggregatedChannelsData>[] = [
  {
    name: 'Existing Clients',
    dataKey: 'existingClients',
    fill: ChartPalette.Purple,
    stackId: STACK_ID,
  },
  {
    name: 'New Organic',
    dataKey: 'newOrganic',
    fill: ChartPalette.LightPink,
    stackId: STACK_ID,
  },
  {
    name: 'New Paid',
    dataKey: 'newPaid',
    fill: ChartPalette.DarkRed,
    stackId: STACK_ID,
  },
];

const Dashboard = () => {
  const [[startDate, endDate]] = useState([
    new Date(2024, 1),
    new Date(2025, 0),
  ]);
  const [selectedRow, setSelectedRow] = useState<
    { key: EntityID; name: string } | undefined
  >(undefined);
  const handleRowClick = ({
    rowKey: key,
    row: { name },
  }: TableRowClickParams<AnyAnalyticsNode>) => setSelectedRow({ key, name });
  const periodLength = getPeriodLength(startDate, endDate, 'months');

  const { data } = useQuery(
    analyticsQueryOptions({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }),
  );
  const chartData = data
    ? aggregateChannelsById(startDate, [data], selectedRow?.key)
    : [];
  const tableData = data ? [data] : [];

  const columns: TableColumnDef<AnyAnalyticsNode>[] = useMemo(() => {
    return [
      {
        key: 'name',
        cell: (row, { nestingLevel }) =>
          nestingLevel === 2 ? (
            <Avatar
              src="https://i.pravatar.cc/20"
              name={row.name}
              size="sm"
              showName
            />
          ) : (
            row.name
          ),
        align: 'left',
      },
      ...new Array(periodLength).fill(0).map((_, i) => {
        const current = new Date(startDate);

        return {
          header: formatDate(
            current.setMonth(current.getMonth() + i),
            'short-month-year',
          ),
          key: i + 1,
          cell: (row: AnyAnalyticsNode) => row.values[i],
          align: 'right' as const,
        };
      }),
    ];
  }, [startDate, periodLength]);

  return (
    <Stack>
      <Heading>{selectedRow?.name} Clients</Heading>

      <Surface padding="md" scroll>
        <BarChart
          data={chartData}
          bars={BARS}
          height={400}
          xAxis={{ dataKey: 'month' }}
        />
      </Surface>

      <Surface>
        <Table
          data={tableData}
          rowKey="id"
          getSubRows={getSubRows}
          columns={columns}
          rowHeaderKey="name"
          selectedRow={selectedRow?.key}
          onRowClick={handleRowClick}
          isRowClickable={hasSubRows}
          noWrap
        />
      </Surface>
    </Stack>
  );
};

export { Dashboard };
