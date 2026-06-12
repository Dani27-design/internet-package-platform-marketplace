import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

async function listFiles(dir) {
  const entries = await readdir(new URL(dir, root), { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

const packageJson = JSON.parse(await read('package.json'));
const db = JSON.parse(await read('db.json'));
const sourceFiles = await listFiles('src');
const sourceEntries = await Promise.all(
  sourceFiles.map(async (file) => [file, await read(file)]),
);
const source = Object.fromEntries(sourceEntries);
const allSource = Object.values(source).join('\n');
const errors = [];

function requireInFile(file, values, label = file) {
  const content = source[file] ?? '';

  values.forEach((value) => {
    if (!content.includes(value)) {
      errors.push(`${label} missing ${value}`);
    }
  });
}

function requireScript(name) {
  if (!packageJson.scripts?.[name]) {
    errors.push(`package.json missing script ${name}`);
  }
}

[
  'react',
  'react-dom',
  '@mui/material',
  '@tanstack/react-query',
  'react-router-dom',
  'json-server',
].forEach((dependency) => {
  if (!packageJson.dependencies?.[dependency]) {
    errors.push(`package.json missing dependency ${dependency}`);
  }
});

['typescript', 'vite', '@vitejs/plugin-react'].forEach((dependency) => {
  if (!packageJson.devDependencies?.[dependency]) {
    errors.push(`package.json missing dev dependency ${dependency}`);
  }
});

['build', 'api', 'typecheck', 'validate:all'].forEach(requireScript);

['users', 'packages', 'transactions', 'activePackages'].forEach((collection) => {
  if (!Array.isArray(db[collection])) {
    errors.push(`db.json missing ${collection} collection`);
  }
});

['Telkomsel', 'XL', 'Indosat', 'Tri', 'Smartfren'].forEach((provider) => {
  if (!allSource.includes(provider) && !JSON.stringify(db).includes(provider)) {
    errors.push(`provider missing ${provider}`);
  }
});

requireInFile('src/auth/AuthProvider.tsx', ['login', 'registerCustomer', 'logout']);
requireInFile('src/auth/session.ts', ['localStorage', 'toAuthenticatedUser']);
requireInFile('src/pages/auth/LoginPage.tsx', [
  'AuthLayout',
  'TextField',
  'Email',
  'Password',
  'login(email, password)',
  'USER_ROLES.customer',
  'ROUTES.customer.dashboard',
  'ROUTES.seller.dashboard',
  'Demo accounts',
  'dani@example.com',
  'seller@example.com',
]);
requireInFile('src/pages/auth/RegisterPage.tsx', [
  'AuthLayout',
  'TextField',
  'Name',
  'Email',
  'Phone Number',
  'Password',
  'registerCustomer',
  'ROUTES.customer.dashboard',
  'Customer registration only',
]);
requireInFile('src/components/auth/AuthLayout.tsx', [
  'Internet Package Marketplace',
  'Discover, compare, and purchase internet packages',
  'Supported providers',
  'PROVIDERS',
]);
requireInFile('src/routes/RequireRole.tsx', ['RequireRole', 'Navigate']);
requireInFile('src/routes/AppRouter.tsx', [
  'USER_ROLES.customer',
  'USER_ROLES.seller',
  'ROUTES.customer.dashboard',
  'ROUTES.seller.dashboard',
]);

requireInFile('src/pages/customer/CustomerDashboardPage.tsx', [
  'Active Package',
  'Popular Packages',
  'Featured Packages',
  'Best Value Packages',
  'Explore By Provider',
  'Recent Transactions',
]);
requireInFile('src/pages/customer/PackageCatalogPage.tsx', [
  'Search Package',
  'Provider',
]);
requireInFile('src/pages/customer/PackageDetailPage.tsx', [
  'Benefits',
  'Continue to Checkout',
]);
requireInFile('src/pages/customer/CheckoutPage.tsx', [
  'Package Summary',
  'Customer Information',
  'Payment Method',
  'Total Price',
  'Confirm Purchase',
  'createTransaction',
]);
requireInFile('src/pages/customer/PurchaseSuccessPage.tsx', [
  'Purchase Success',
  'View Transaction',
  'Continue Browsing',
  'Return to Dashboard',
]);
requireInFile('src/pages/customer/CustomerTransactionsPage.tsx', [
  'getCustomerTransactions',
  'customerId',
]);
requireInFile('src/pages/customer/TransactionViewPage.tsx', [
  'Transaction View',
  'TransactionSummary',
]);
requireInFile('src/pages/customer/CustomerProfilePage.tsx', [
  'Name:',
  'Email:',
  'Phone Number:',
  'Role:',
]);

requireInFile('src/pages/seller/SellerDashboardPage.tsx', [
  'Total Customers',
  'Total Transactions',
  'Total Revenue',
  'Transaction Success Rate',
  'Top Providers',
  'Top Packages',
  'Recent Transactions',
]);
requireInFile('src/pages/seller/SellerCustomersPage.tsx', [
  'Phone Number',
  'Active Package',
  'Total Transactions',
  'customerDetailPath',
]);
requireInFile('src/pages/seller/SellerCustomerDetailPage.tsx', [
  'Customer Information',
  'Active Package',
  'Remaining Quota',
  'Transaction History',
]);
requireInFile('src/components/seller/SellerTransactionList.tsx', [
  'Customer',
  'Package',
  'Provider',
  'Status',
  'Amount',
  'Purchase Date',
]);
requireInFile('src/components/customer/ResponsivePanel.tsx', [
  'Dialog',
  'Drawer',
  'anchor="bottom"',
]);
requireInFile('src/components/seller/SellerLayout.tsx', [
  'Drawer',
  'variant="permanent"',
]);

const implementationOnlySource = Object.entries(source)
  .filter(([file]) => file !== 'src/components/DESIGN_SYSTEM.md')
  .map(([, content]) => content)
  .join('\n');

[
  'Wishlist',
  'Coupon',
  'Notification',
  'Chat',
  'Payment Gateway',
  'Report Export',
  'Multi Language',
  'Real Telecom',
].forEach((forbiddenText) => {
  if (implementationOnlySource.includes(forbiddenText)) {
    errors.push(`implementation includes excluded feature text: ${forbiddenText}`);
  }
});

if (
  implementationOnlySource.includes('Package CRUD') ||
  implementationOnlySource.includes('Customer CRUD')
) {
  errors.push('implementation includes excluded CRUD text');
}

if (source['src/pages/customer/CustomerProfilePage.tsx']?.match(/edit/i)) {
  errors.push('customer profile includes edit behavior text');
}

if (
  source['src/pages/auth/LoginPage.tsx']?.includes('PlaceholderPage') ||
  source['src/pages/auth/RegisterPage.tsx']?.includes('PlaceholderPage')
) {
  errors.push('auth pages must not use placeholders');
}

if (source['src/pages/auth/RegisterPage.tsx']?.includes('USER_ROLES.seller')) {
  errors.push('registration must not create seller users');
}

if (source['src/pages/seller/SellerDashboardPage.tsx']?.includes('Button')) {
  errors.push('seller dashboard should not expose operational actions');
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('PRD validation passed.');
