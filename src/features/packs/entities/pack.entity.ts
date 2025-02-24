export interface Pack {
  id: string;
  title: string;
  description: string;
  price: number;
  roi: number;
  // months: number;
  image: string;
  // commission: string;
  // maxPrice: string;
}

export type LikePack = Partial<Pack>;

export type CreatePack = Omit<Pack, 'id'>;

export const convertJsonToPack = (json: any): Pack => {
  if (!json || Object.keys(json).length === 0) {
    return {
      id: 'No ID',
      title: 'No Title',
      description: 'No Description',
      price: 0,
      roi: 0,
      image: ''
    };
  }

  return {
    id: (json.id ??= 'No ID'),
    title: (json.title ??= 'No Title'),
    description: (json.description ??= 'No Description'),
    price: isNaN(Number(json.price)) ? 0 : Number(json.price),
    roi: isNaN(Number(json.roi)) ? 0 : Number(json.roi),
    // months: json.months ??="",
    image: (json.image ??= '')
    // commission: json.commission ??="",
    // maxPrice: json.maxPrice ??="",
  };
};
