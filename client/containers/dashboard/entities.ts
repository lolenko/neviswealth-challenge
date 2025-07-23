import {
  BaseEntity,
  Company,
  Branch,
  Employee,
  Channel,
  EntityID,
  AnyAnalyticsNode,
} from '@/api/analytics';

enum ChannelId {
  ExistingClients = '716e7c30-b7c3-45c5-aa64-cbcf483917e0',
  NewOrganic = 'bc5cd63a-668b-4c37-854d-69c1bd5fcbcd',
  NewPaid = 'abbf873a-a0eb-46b8-b4cf-dc58e5f7a2d7',
}

type AggregatedChannelsData = {
  month: string;
  existingClients: number;
  newOrganic: number;
  newPaid: number;
};

export { ChannelId };

export type {
  BaseEntity,
  Company,
  Branch,
  Employee,
  Channel,
  EntityID,
  AnyAnalyticsNode,
  AggregatedChannelsData,
};
