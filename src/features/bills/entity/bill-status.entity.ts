export enum BillStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
  REFUSED = 'REFUSED',
  PENDING = 'PENDING'
}

export interface BillStatus {
  id: string;
  name: string;
  value: BillStatusEnum;
}

export type LikeBillStatus = Partial<BillStatus>;

export type CreateBillStatus = Omit<BillStatus, 'id'>;

export const convertJsonToBillStatus = (json: any): BillStatus => {
  if (!json || Object.keys(json).length === 0) {
    return {
      id: 'No ID',
      name: 'No Name',
      value: BillStatusEnum.PENDING
    };
  }

  return {
    id: json.id ?? 'No ID',
    name: json.name ?? 'No Name',
    value: json.value ?? BillStatusEnum.PENDING
  };
};
