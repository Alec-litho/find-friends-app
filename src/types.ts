export declare interface User {
  address: UserAddress;
  company: UserCompany;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}
export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
