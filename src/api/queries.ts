import { USER_ROLES } from '../domain/constants';
import type {
  ActivePackage,
  InternetPackage,
  NewCustomerInput,
  NewTransactionInput,
  Transaction,
  User,
} from '../domain/types';
import { apiRequest } from './client';

export function getUsers() {
  return apiRequest<User[]>('/users');
}

export function getPackages() {
  return apiRequest<InternetPackage[]>('/packages');
}

export function getTransactions() {
  return apiRequest<Transaction[]>('/transactions');
}

export function getActivePackages() {
  return apiRequest<ActivePackage[]>('/activePackages');
}

export async function getPackageById(packageId: string) {
  const packages = await apiRequest<InternetPackage[]>(`/packages?id=${packageId}`);

  return packages[0] ?? null;
}

export async function getTransactionById(transactionId: string) {
  const transactions = await apiRequest<Transaction[]>(`/transactions?id=${transactionId}`);

  return transactions[0] ?? null;
}

export function getCustomerTransactions(customerId: string) {
  return apiRequest<Transaction[]>(
    `/transactions?customerId=${encodeURIComponent(customerId)}`,
  );
}

export async function getCustomerActivePackage(customerId: string) {
  const activePackages = await apiRequest<ActivePackage[]>(
    `/activePackages?customerId=${encodeURIComponent(customerId)}`,
  );

  return activePackages[0] ?? null;
}

export async function findUserByCredentials(email: string, password: string) {
  const users = await apiRequest<User[]>(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  );

  return users[0] ?? null;
}

export function createCustomer(input: NewCustomerInput) {
  return apiRequest<User>('/users', {
    method: 'POST',
    body: {
      id: `user-customer-${crypto.randomUUID()}`,
      role: USER_ROLES.customer,
      ...input,
    },
  });
}

export function createTransaction(input: NewTransactionInput) {
  return apiRequest<Transaction>('/transactions', {
    method: 'POST',
    body: {
      id: `trx-${crypto.randomUUID()}`,
      ...input,
    },
  });
}
