import { collectNodes, findNode } from '@/utils/tree';
import { formatDate } from '@/utils/date';
import {
  AggregatedChannelsData,
  AnyAnalyticsNode,
  BaseEntity,
  Channel,
  ChannelId,
  EntityID,
} from './entities';

const getSubRows = (row: AnyAnalyticsNode) => {
  if ('branches' in row) {
    return row.branches;
  }
  if ('employees' in row) {
    return row.employees;
  }
  if ('channels' in row) {
    return row.channels;
  }
};

const isChannelEntry = (entry: AnyAnalyticsNode) =>
  [ChannelId.NewPaid, ChannelId.NewOrganic, ChannelId.ExistingClients].includes(
    entry.id as ChannelId,
  );

const hasSubRows = (row: AnyAnalyticsNode) => !!getSubRows(row);

/**
 * Aggregates channel data by month for a given tree structure.
 *
 * @template T
 * @param {Date} startDate - The starting date for the aggregation. Each month's data will be calculated relative to this date.
 * @param {T[]} root - The root nodes of the tree structure to aggregate data from.
 * @param {EntityID} [nodeId] - Optional. The ID of a specific node to start aggregation from. If not provided, aggregation starts from the root nodes.
 * @returns {AggregatedChannelsData[]} An array of aggregated channel data, where each entry contains:
 * - `month`: The month in "short-month-year" format (e.g., "Jan 2023").
 * - `existingClients`: The total value for the "Existing Clients" channel in that month.
 * - `newOrganic`: The total value for the "New Organic" channel in that month.
 * - `newPaid`: The total value for the "New Paid" channel in that month.
 */
const aggregateChannelsById = <T extends BaseEntity>(
  startDate: Date,
  root: T[],
  nodeId?: EntityID,
): AggregatedChannelsData[] => {
  let allChannels: Channel[] = [];

  if (nodeId) {
    const startNode = findNode(root, (node) => node.id === nodeId, getSubRows);
    if (!startNode) return [];
    allChannels = collectNodes([startNode], isChannelEntry, getSubRows);
  } else {
    allChannels = collectNodes(root, isChannelEntry, getSubRows);
  }

  const result: {
    month: string;
    existingClients: number;
    newOrganic: number;
    newPaid: number;
  }[] = [];

  allChannels.forEach((channel) => {
    channel.values.forEach((value, index) => {
      const currentMonth = new Date(startDate);
      currentMonth.setMonth(currentMonth.getMonth() + index);
      const month = formatDate(currentMonth, 'short-month-year');
      let entry = result.find((item) => item.month === month);

      if (!entry) {
        entry = { month, existingClients: 0, newOrganic: 0, newPaid: 0 };
        result.push(entry);
      }

      switch (channel.id) {
        case ChannelId.ExistingClients:
          entry.existingClients += value;
          break;
        case ChannelId.NewOrganic:
          entry.newOrganic += value;
          break;
        case ChannelId.NewPaid:
          entry.newPaid += value;
          break;
      }
    });
  });

  return result;
};
export { aggregateChannelsById, getSubRows, hasSubRows };
