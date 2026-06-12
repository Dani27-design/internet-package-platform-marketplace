import type { PROVIDERS, TRANSACTION_STATUSES, USER_ROLES } from './constants';

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type TransactionStatus =
  (typeof TRANSACTION_STATUSES)[keyof typeof TRANSACTION_STATUSES];

export type Provider = (typeof PROVIDERS)[number];

export type User = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type InternetPackage = {
  id: string;
  provider: Provider;
  name: string;
  quota: number;
  validityDays: number;
  price: number;
  isPopular: boolean;
  isFeatured: boolean;
  isBestValue: boolean;
  benefits: string[];
};

export type Transaction = {
  id: string;
  customerId: string;
  packageId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
};

export type ActivePackage = {
  id: string;
  customerId: string;
  packageId: string;
  totalQuota: number;
  remainingQuota: number;
  expiryDate: string;
};

export type NewCustomerInput = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type NewTransactionInput = {
  customerId: string;
  packageId: string;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
};
