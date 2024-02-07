export type Items = {
  helmetId: string;
  quantity: Number;
  id?: string;
};

type ShopCarStatus = 'open' | 'approved' | 'rejected' | 'sent' | 'delivered';

export type ShopCar = {
  id: string;
  userID: string;
  status: ShopCarStatus | string;
  items: Items[];
};
