export enum ValueType {
  Text = 'string',
  Numeric = 'number',
  Boolean = 'boolean',
}

export type GenreAttribute = {
  attrName: string;
  attrType: ValueType;
  required: boolean;
}

export type Genre = {
  id: number;
  name: string;
  attributes: GenreAttribute[];
}

export type NewGenre = Omit<Genre, 'id'>

export type Game = {
  id: number;
  name: string;
  cpuRequirements: string;
  memoryRequirements: string;
  storageRequirements: string;
  genreId: number;
  genre?: Genre;
  genreAttributes: any[];
  price: string;
  imageSrc?: string;
}

export type NewGame = Omit<Game, 'id'>

export type DLC = Omit<
  Game,
  'cpuRequirements' | 'memoryRequirements' | 'storageRequirements' | 'genre'
> & {
  gameId: number;
  game?: Game;
}

export type NewDLC = Omit<DLC, 'id'>

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

export type LogInRequest = Omit<User, 'id' | 'role'>

export type SafeUser = Omit<
  User,
  'password'
>

export enum PaymentMethod {
  Cash = 'Cash',
  CreditCard = 'Credit Card',
}

export type Purchase = {
  id: number;
  gameId?: number;
  game?: Game;
  dlcId?: number;
  dlc?: DLC;
  userId: number;
  user?: User;
  paymentMethod: PaymentMethod;
  pricePaid: number;
}

export type NewPurchase = Omit<Purchase, 'id'>

export type Lend = {
  id: number;
  lenderUserId: number;
  gameId: number;
  game?: Game;
  userId: number;
  user?: User;
  expirationDate: Date;
}

export type NewLend = Omit<Lend, 'id'>
