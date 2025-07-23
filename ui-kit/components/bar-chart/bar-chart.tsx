import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  BarProps,
  ResponsiveContainerProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';
import { LegendEntry, Stack } from '@/ui-kit/components';
import styles from './bar-chart.module.css';
import clsx from 'clsx';

enum ChartPalette {
  Purple = '#b39df8',
  LightPink = '#f5beb4',
  DarkRed = '#a75e6e',
}

type DataEntry = Record<string, unknown>;

type BarConfig<DT extends DataEntry> = Omit<BarProps, 'dataKey' | 'fill'> & {
  dataKey: keyof DT;
  fill: ChartPalette;
};

type BarChartProps<DT extends DataEntry> = Omit<
  ResponsiveContainerProps,
  'children'
> & {
  data: DT[];
  bars: BarConfig<DT>[];
  xAxis?: XAxisProps | false;
  yAxis?: YAxisProps | false;
};

const BarChart = <DT extends DataEntry>({
  data,
  bars,
  xAxis,
  yAxis,
  className,
  ...containerProps
}: BarChartProps<DT>) => {
  return (
    <ResponsiveContainer
      {...containerProps}
      className={clsx(styles.root, className)}
    >
      <RechartsBarChart data={data}>
        <CartesianGrid vertical={false} strokeDasharray="3 10" />
        {xAxis !== false && (
          <XAxis {...xAxis} axisLine={false} tickLine={false} dy={10} />
        )}
        {yAxis !== false && (
          <YAxis width="auto" {...yAxis} axisLine={false} tickLine={false} />
        )}
        <Legend
          wrapperStyle={{
            paddingTop: 'var(--spacing-md)',
          }}
          content={({ payload }) => {
            return (
              <Stack direction="row" size="sm" justifyContent="center">
                {payload.map((entry) => (
                  <LegendEntry key={entry.value} color={entry.color}>
                    {entry.value}
                  </LegendEntry>
                ))}
              </Stack>
            );
          }}
        />
        <Tooltip isAnimationActive={false} />
        {bars.map((props) => (
          <Bar
            {...props}
            key={props.dataKey as string}
            dataKey={props.dataKey as string}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export { BarChart, ChartPalette };
export type { BarConfig };
