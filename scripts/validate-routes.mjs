import { readFile } from 'node:fs/promises';

const pathsSource = await readFile(new URL('../src/routes/paths.ts', import.meta.url), 'utf8');
const navigationSource = await readFile(
  new URL('../src/routes/navigation.ts', import.meta.url),
  'utf8',
);
const routerSource = await readFile(
  new URL('../src/routes/AppRouter.tsx', import.meta.url),
  'utf8',
);

const errors = [];

const requiredRouteTokens = [
  'login',
  'register',
  'dashboard',
  'packages',
  'packageDetail',
  'checkout',
  'purchaseSuccess',
  'transactions',
  'transactionView',
  'profile',
  'customers',
  'customerDetail',
];

requiredRouteTokens.forEach((token) => {
  if (!pathsSource.includes(token)) {
    errors.push(`missing route token: ${token}`);
  }
});

const requiredCustomerNavigation = ['Dashboard', 'Packages', 'Transactions', 'Profile'];
const requiredSellerNavigation = ['Dashboard', 'Customers', 'Transactions'];

requiredCustomerNavigation.forEach((label) => {
  if (!navigationSource.includes(`label: '${label}'`)) {
    errors.push(`missing customer navigation label: ${label}`);
  }
});

requiredSellerNavigation.forEach((label) => {
  if (!navigationSource.includes(`label: '${label}'`)) {
    errors.push(`missing seller navigation label: ${label}`);
  }
});

[
  'ROUTES.customer.dashboard',
  'ROUTES.customer.packages',
  'ROUTES.customer.packageDetail',
  'ROUTES.customer.checkout',
  'ROUTES.customer.purchaseSuccess',
  'ROUTES.customer.transactions',
  'ROUTES.customer.transactionView',
  'ROUTES.customer.profile',
  'ROUTES.seller.dashboard',
  'ROUTES.seller.customers',
  'ROUTES.seller.customerDetail',
  'ROUTES.seller.transactions',
].forEach((routeUsage) => {
  if (!routerSource.includes(routeUsage)) {
    errors.push(`router is missing ${routeUsage}`);
  }
});

if (!routerSource.includes('RequireRole role={USER_ROLES.customer}')) {
  errors.push('router is missing customer role guard');
}

if (!routerSource.includes('RequireRole role={USER_ROLES.seller}')) {
  errors.push('router is missing seller role guard');
}

if (!routerSource.includes('path="*"')) {
  errors.push('router is missing not-found behavior');
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Route validation passed.');
