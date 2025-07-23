import { describe, it, expect } from 'vitest';
import { aggregateChannelsById } from './use-cases';
import { ChannelId } from './entities';

describe('aggregateChannelsById', () => {
  const startDate = new Date('2023-01-01');
  const sampleTree = [
    {
      id: 1,
      name: 'Company 1',
      values: [117, 234, 351],
      branches: [
        {
          id: 2,
          name: 'Branch 1',
          values: [117, 234, 351],
          employees: [
            {
              id: 3,
              name: 'Employee 1',
              values: [35, 70, 105],
              channels: [
                {
                  id: ChannelId.ExistingClients,
                  name: 'Existing Clients',
                  values: [10, 20, 30],
                },
                {
                  id: ChannelId.NewOrganic,
                  name: 'New Organic',
                  values: [5, 10, 15],
                },
                {
                  id: ChannelId.NewPaid,
                  name: 'New Paid',
                  values: [20, 40, 60],
                },
              ],
            },
            {
              id: 4,
              name: 'Employee 2',
              values: [82, 164, 246],
              channels: [
                {
                  id: ChannelId.NewPaid,
                  name: 'New Paid',
                  values: [2, 4, 6],
                },
                {
                  id: ChannelId.ExistingClients,
                  name: 'Existing Clients',
                  values: [40, 80, 120],
                },
                {
                  id: ChannelId.NewOrganic,
                  name: 'New Organic',
                  values: [40, 80, 120],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  it('should aggregate data for all channels starting from the root', () => {
    const result = aggregateChannelsById(startDate, sampleTree);

    expect(result).toEqual([
      { month: 'Jan 2023', existingClients: 50, newOrganic: 45, newPaid: 22 },
      { month: 'Feb 2023', existingClients: 100, newOrganic: 90, newPaid: 44 },
      { month: 'Mar 2023', existingClients: 150, newOrganic: 135, newPaid: 66 },
    ]);
  });

  it('should aggregate data starting from a specific node', () => {
    const result = aggregateChannelsById(startDate, sampleTree, 4);

    expect(result).toEqual([
      { month: 'Jan 2023', existingClients: 40, newOrganic: 40, newPaid: 2 },
      { month: 'Feb 2023', existingClients: 80, newOrganic: 80, newPaid: 4 },
      { month: 'Mar 2023', existingClients: 120, newOrganic: 120, newPaid: 6 },
    ]);
  });

  it('should return an empty array if the specified node is not found', () => {
    const result = aggregateChannelsById(startDate, sampleTree, 999);
    expect(result).toEqual([]);
  });

  it('should handle an empty tree', () => {
    const result = aggregateChannelsById(startDate, []);
    expect(result).toEqual([]);
  });

  it('should handle channels with no values', () => {
    const treeWithEmptyChannels = [
      {
        id: 1,
        name: 'Root Node',
        values: [],
        branches: [
          {
            id: 2,
            name: 'Branch Node',
            values: [],
            employees: [
              {
                id: 3,
                name: 'Employee Node',
                values: [],
                channels: [
                  {
                    id: ChannelId.ExistingClients,
                    name: 'Existing Clients',
                    values: [],
                  },
                  {
                    id: ChannelId.NewOrganic,
                    name: 'New Organic',
                    values: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    const result = aggregateChannelsById(startDate, treeWithEmptyChannels);

    expect(result).toEqual([]);
  });
});
