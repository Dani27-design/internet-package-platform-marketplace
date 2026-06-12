import { readFile } from 'node:fs/promises';

const files = {
  dashboard: '../src/pages/customer/CustomerDashboardPage.tsx',
  catalog: '../src/pages/customer/PackageCatalogPage.tsx',
  detail: '../src/pages/customer/PackageDetailPage.tsx',
  checkout: '../src/pages/customer/CheckoutPage.tsx',
  success: '../src/pages/customer/PurchaseSuccessPage.tsx',
  transactions: '../src/pages/customer/CustomerTransactionsPage.tsx',
  transactionView: '../src/pages/customer/TransactionViewPage.tsx',
  profile: '../src/pages/customer/CustomerProfilePage.tsx',
  layout: '../src/components/customer/CustomerLayout.tsx',
  responsivePanel: '../src/components/customer/ResponsivePanel.tsx',
  packageCard: '../src/components/customer/PackageCard.tsx',
  transactionSummary: '../src/components/customer/TransactionSummary.tsx',
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
  'Active Package',
  'Popular Packages',
  'Featured Packages',
  'Best Value Packages',
  'Explore By Provider',
  'Recent Transactions',
].forEach((requiredText) => {
  if (!source.dashboard.includes(requiredText)) {
    errors.push(`dashboard missing ${requiredText}`);
  }
});

['Search Package', 'Provider', 'No packages found'].forEach((requiredText) => {
  if (!source.catalog.includes(requiredText)) {
    errors.push(`catalog missing ${requiredText}`);
  }
});

['Benefits', 'Continue to Checkout'].forEach((requiredText) => {
  if (!source.detail.includes(requiredText)) {
    errors.push(`detail missing ${requiredText}`);
  }
});

[
  'Package Summary',
  'Customer Information',
  'Payment Method',
  'Total Price',
  'Confirm Purchase',
  'TRANSACTION_STATUSES.success',
].forEach((requiredText) => {
  if (!source.checkout.includes(requiredText)) {
    errors.push(`checkout missing ${requiredText}`);
  }
});

['View Transaction', 'Continue Browsing', 'Return to Dashboard'].forEach(
  (requiredText) => {
    if (!source.success.includes(requiredText)) {
      errors.push(`success missing ${requiredText}`);
    }
  },
);

['status', 'createdAt', 'amount'].forEach((requiredText) => {
  if (!source.transactions.includes(requiredText)) {
    errors.push(`transactions missing ${requiredText}`);
  }
});

['Transaction Summary', 'Provider', 'Amount'].forEach((requiredText) => {
  if (!source.transactionSummary.includes(requiredText)) {
    errors.push(`transaction view missing ${requiredText}`);
  }
});

['Name:', 'Email:', 'Phone Number:', 'Role:'].forEach((requiredText) => {
  if (!source.profile.includes(requiredText)) {
    errors.push(`profile missing ${requiredText}`);
  }
});

if (source.profile.includes('edit') || source.profile.includes('Edit')) {
  errors.push('profile must remain read-only');
}

['Dashboard', 'Packages', 'Transactions', 'Profile'].forEach((requiredText) => {
  if (!source.layout.includes(requiredText) && !source.layout.includes('customerNavigationItems')) {
    errors.push(`layout missing ${requiredText}`);
  }
});

['Dialog', 'Drawer'].forEach((requiredText) => {
  if (!source.responsivePanel.includes(requiredText)) {
    errors.push(`responsive panel missing ${requiredText}`);
  }
});

['provider', 'name', 'quota', 'validityDays', 'price'].forEach((requiredText) => {
  if (!source.packageCard.includes(requiredText)) {
    errors.push(`package card missing ${requiredText}`);
  }
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Customer validation passed.');
