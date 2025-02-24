import { convertJsonToPack, Pack } from '@/features/packs/entities/pack.entity';
import { jsonUserToUser, User } from '@/features/users/entities/user.entity';
import {
  BillStatus,
  BillStatusEnum,
  convertJsonToBillStatus
} from './bill-status.entity';

export interface Bill {
  id: string;
  pack?: Pack;
  owner?: User;
  status: BillStatus;
  dateBought: Date;
  activationDate?: Date;
  paymentImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UploadImageBill = Pick<Bill, 'paymentImage'>;

export type LikeBill = Partial<Bill>;

export const convertJsonToBill = (json: any): Bill => {
  if (!json) {
    return {
      id: 'No ID',
      pack: {
        id: 'No ID',
        title: 'No Title',
        description: 'No Description',
        price: 0,
        roi: 0,
        image: ''
      } as Pack,
      owner: {
        id: 'No ID',
        username: 'No Username',
        email: 'No Email',
        firstName: 'No First Name',
        lastName: 'No Last Name',
        isActive: false,
        avatar: 'No Avatar',
        createdAt: new Date(),
        skill: 'No Skill',
        bio: 'No Bio',
        phoneNumber: 'No Phone Number',
        socialMedia: {}
      } as User,
      status: {
        id: 'No ID',
        name: 'No Name',
        value: BillStatusEnum.PENDING
      } as BillStatus,
      dateBought: new Date(),
      activationDate: new Date(),
      paymentImage: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  return {
    id: json.id ?? 'No ID',
    pack: convertJsonToPack(json.pack),
    owner: jsonUserToUser(json.owner),
    status: convertJsonToBillStatus(json.status),
    dateBought: new Date(json.dateBought) ?? new Date(),
    activationDate: new Date(json.activationDate) ?? new Date(),
    paymentImage: json.paymentImage ?? undefined,
    createdAt: new Date(json.createdAt) ?? new Date(),
    updatedAt: new Date(json.updatedAt) ?? new Date()
  };
};

export const convertJsonToArrayBill = (json: any): Bill[] => {
  if (!json) {
    return [];
  }

  if (!Array.isArray(json)) {
    return [];
  }

  return json.map((bill: any) => convertJsonToBill(bill));
};
