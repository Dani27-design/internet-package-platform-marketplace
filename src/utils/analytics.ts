import { TRANSACTION_STATUSES, USER_ROLES } from '../domain/constants';
import type { InternetPackage, Transaction, User } from '../domain/types';

export function getTotalCustomers(users: User[]) {
  return users.filter((user) => user.role === USER_ROLES.customer).length;
}

export function getTotalTransactions(transactions: Transaction[]) {
  return transactions.length;
}

export function getTotalRevenue(transactions: Transaction[]) {
  return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

export function getTransactionSuccessRate(transactions: Transaction[]) {
  if (transactions.length === 0) {
    return 0;
  }

  const successCount = transactions.filter(
    (transaction) => transaction.status === TRANSACTION_STATUSES.success,
  ).length;

  return (successCount / transactions.length) * 100;
}

export function getTopProviders(
  transactions: Transaction[],
  packages: InternetPackage[],
) {
  const providerTotals = new Map<string, number>();
  const packagesById = new Map(packages.map((item) => [item.id, item]));

  transactions.forEach((transaction) => {
    const packageItem = packagesById.get(transaction.packageId);

    if (!packageItem) {
      return;
    }

    providerTotals.set(
      packageItem.provider,
      (providerTotals.get(packageItem.provider) ?? 0) + transaction.amount,
    );
  });

  return [...providerTotals.entries()]
    .map(([provider, revenue]) => ({ provider, revenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getTopPackages(
  transactions: Transaction[],
  packages: InternetPackage[],
) {
  const packageTotals = new Map<string, number>();
  const packagesById = new Map(packages.map((item) => [item.id, item]));

  transactions.forEach((transaction) => {
    packageTotals.set(
      transaction.packageId,
      (packageTotals.get(transaction.packageId) ?? 0) + transaction.amount,
    );
  });

  return [...packageTotals.entries()]
    .map(([packageId, revenue]) => {
      const packageItem = packagesById.get(packageId);

      return {
        packageId,
        name: packageItem?.name ?? packageId,
        provider: packageItem?.provider,
        revenue,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);
}
