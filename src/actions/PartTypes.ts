import { QueryData, QueryRowData } from './DBTypes';
import { StatusMessageEnum } from './StatusMessageEnum';

export type Part = {
  part_partdescriptionfileID: number;
  part_name: string;
};

export interface PartTreeNode {
  key: string;
  label: string;
  data?: {
    type?: 'PartTableMeta';
    data: PartTableMeta;
  };
  children?: PartTreeNode[];
}

export type PartTableMeta = {
  tableName: string;
  where?: string;
};

export type PartListResponse = {
  message: StatusMessageEnum;
  data: QueryRowData[];
};

export type PartDataRequest = {
  token: string;
  partId: number;
};

export type PartDataResponse = {
  message: StatusMessageEnum;
  data: PartTreeNode[];
};

export type PartTableDataRequest = {
  token: string;
  query: string;
};

export type PartTableDataResponse = {
  message: StatusMessageEnum;
  data: QueryData;
};
