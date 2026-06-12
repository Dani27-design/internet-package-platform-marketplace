import { readFile } from 'node:fs/promises';

const files = {
  dashboard: '../src/pages/seller/SellerDashboardPage.tsx',
  customers: '../src/pages/seller/SellerCustomersPage.tsx',
  customerDetail: '../src/pages/seller/SellerCustomerDetailPage.tsx',
  transactions: '../src/pages/seller/SellerTransactionsPage.tsx',
  layout: '../src/components/seller/SellerLayout.tsx',
  transactionList: '../src/components/seller/SellerTransactionList.tsx',
  kpiCard: '../src/components/seller/KpiCard.tsx',
};

const sourceEntries = await Promise.all(
  Object.entries(files).map(async ([key, path]) => [
    key,
    await readFile(new URL(path, import.meta.url), 'utf8'),
  ]),
);
const source = Object.fromEntries(sourceEntries);
const errors = [];

[
  'Total Customers',
  'Total Transactions',
  'Total Revenue',
  'Transaction Success Rate',
  'Top Providers',
  'Top Packages',
  'Recent Transactions',
].forEach((requiredText) => {
  if (!source.dashboard.includes(requiredText)) {
    errors.push(`seller dashboard missing ${requiredText}`);
  }
});

['Phone Number', 'Active Package', 'Total Transactions'].forEach((requiredText) => {
  if (!source.customers.includes(requiredText)) {
    errors.push(`seller customers missing ${requiredText}`);
  }
});

['Customer Information', 'Active Package', 'Remaining Quota', 'Transaction History'].forEach(
  (requiredText) => {
    if (!source.customerDetail.includes(requiredText)) {
      errors.push(`seller customer detail missing ${requiredText}`);
    }
  },
);

['customer', 'packageItem', 'provider', 'status', 'amount', 'createdAt'].forEach(
  (requiredText) => {
    if (!source.transactionList.includes(requiredText)) {
      errors.push(`seller transaction list missing ${requiredText}`);
    }
  },
);

['Dashboard', 'Customers', 'Transactions'].forEach((requiredText) => {
  if (!source.layout.includes(requiredText) && !source.layout.includes('sellerNavigationItems')) {
    errors.push(`seller layout missing ${requiredText}`);
  }
});

const combinedSellerSource = Object.values(source).join('\n');
['Create', 'Edit', 'Delete', 'Export', 'Update', 'Remove'].forEach((forbiddenText) => {
  if (combinedSellerSource.includes(forbiddenText)) {
    errors.push(`seller pages must remain read-only and include no ${forbiddenText} action`);
  }
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Seller validation passed.');
