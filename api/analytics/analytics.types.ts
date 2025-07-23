type EntityID<T = string | number> = T;

type BaseEntity = {
  id: EntityID;
  name: string;
  values: number[];
};

type Channel = BaseEntity;

type Employee = BaseEntity & {
  channels?: Channel[];
};
type Branch = BaseEntity & {
  employees?: Employee[];
};
type Company = BaseEntity & {
  branches?: Branch[];
};

type AnyAnalyticsNode = Company | Branch | Employee | Channel;

type AnalyticsQueryParams = {
  startDate: string;
  endDate: string;
};

export type {
  BaseEntity,
  Company,
  Branch,
  Employee,
  Channel,
  EntityID,
  AnyAnalyticsNode,
  AnalyticsQueryParams,
};
