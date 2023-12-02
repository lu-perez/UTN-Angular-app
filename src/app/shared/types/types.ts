export type Game = {
  id: number;
  name: string;
  cpuRequirements: string;
  memoryRequirements: string;
  storageRequirements: string;
  genre: string;
  price: string;
}

export type DLC = Omit<
  Game,
  'cpuRequirements' | 'memoryRequirements' | 'storageRequirements' | 'genre'
> & {
  relatedGameId: number;
};

export enum Role {
  User = 'User',
  Admin = 'Admin',
  Agent = 'Agent',
}

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
}

export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'Credit Card',
}

export type Purchase = {
  id: number;
  gameId: number;
  userId: number;
  paymentMethod: PaymentMethod;
  pricePaid: string;
}

export type Lend = {
  id: number;
  gameId: number;
  lenderUserId: number;
  borrowerUserId: number;
  expirationDate: Date;
}
