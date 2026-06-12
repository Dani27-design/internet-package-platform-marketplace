import { readFile } from 'node:fs/promises';

const files = {
  main: '../src/main.tsx',
  theme: '../src/theme.ts',
  page: '../src/components/common/Page.tsx',
  readOnlyDetail: '../src/components/common/ReadOnlyDetail.tsx',
  queryState: '../src/components/common/QueryState.tsx',
  usageBoundaries: '../src/components/DESIGN_SYSTEM.md',
  customerLayout: '../src/components/customer/CustomerLayout.tsx',
  sellerLayout: '../src/components/seller/SellerLayout.tsx',
  packageCard: '../src/components/customer/PackageCard.tsx',
  activePackage: '../src/components/customer/ActivePackageWidget.tsx',
  transactionSummary: '../src/components/customer/TransactionSummary.tsx',
  sellerTransactionList: '../src/components/seller/SellerTransactionList.tsx',
  kpiCard: '../src/components/seller/KpiCard.tsx',
  providerEntry: '../src/components/customer/ProviderEntry.tsx',
  responsivePanel: '../src/components/customer/ResponsivePanel.tsx',
  loginPage: '../src/pages/auth/LoginPage.tsx',
  registerPage: '../src/pages/auth/RegisterPage.tsx',
  authLayout: '../src/components/auth/AuthLayout.tsx',
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
  'ThemeProvider',
  'theme',
].forEach((requiredText) => {
  if (!source.main.includes(requiredText)) {
    errors.push(`main missing ${requiredText}`);
  }
});

['createTheme', 'MuiButton', 'MuiCard', 'MuiPaper'].forEach((requiredText) => {
  if (!source.theme.includes(requiredText)) {
    errors.push(`theme missing ${requiredText}`);
  }
});

['Page', 'ResponsiveGrid'].forEach((requiredText) => {
  if (!source.page.includes(requiredText)) {
    errors.push(`shared layout primitive missing ${requiredText}`);
  }
});

['ReadOnlyDetail', 'DetailField'].forEach((requiredText) => {
  if (!source.readOnlyDetail.includes(requiredText)) {
    errors.push(`read-only detail primitive missing ${requiredText}`);
  }
});

['LoadingState', 'EmptyState', 'ErrorState'].forEach((requiredText) => {
  if (!source.queryState.includes(requiredText)) {
    errors.push(`query state primitive missing ${requiredText}`);
  }
});

['provider', 'name', 'quota', 'validityDays', 'price'].forEach((requiredText) => {
  if (!source.packageCard.includes(requiredText)) {
    errors.push(`package card missing ${requiredText}`);
  }
});

['totalQuota', 'remainingQuota', 'expiryDate', 'calculateUsagePercentage'].forEach(
  (requiredText) => {
    if (!source.activePackage.includes(requiredText)) {
      errors.push(`active package widget missing ${requiredText}`);
    }
  },
);

['Transaction Summary', 'DetailField'].forEach((requiredText) => {
  if (!source.transactionSummary.includes(requiredText)) {
    errors.push(`transaction summary missing ${requiredText}`);
  }
});

['SellerTransactionList', 'DetailField'].forEach((requiredText) => {
  if (!source.sellerTransactionList.includes(requiredText)) {
    errors.push(`transaction list pattern missing ${requiredText}`);
  }
});

['label', 'value'].forEach((requiredText) => {
  if (!source.kpiCard.includes(requiredText)) {
    errors.push(`KPI card missing ${requiredText}`);
  }
});

['ProviderEntry', 'Provider'].forEach((requiredText) => {
  if (!source.providerEntry.includes(requiredText)) {
    errors.push(`provider entry missing ${requiredText}`);
  }
});

['AuthLayout', 'TextField', 'login(email, password)', 'Demo accounts'].forEach(
  (requiredText) => {
    if (!source.loginPage.includes(requiredText)) {
      errors.push(`login form pattern missing ${requiredText}`);
    }
  },
);

['AuthLayout', 'TextField', 'registerCustomer', 'Customer registration only'].forEach((requiredText) => {
  if (!source.registerPage.includes(requiredText)) {
    errors.push(`register form pattern missing ${requiredText}`);
  }
});

['Internet Package Marketplace', 'PROVIDERS', 'Supported providers'].forEach(
  (requiredText) => {
    if (!source.authLayout.includes(requiredText)) {
      errors.push(`auth layout missing ${requiredText}`);
    }
  },
);

if (source.loginPage.includes('PlaceholderPage') || source.registerPage.includes('PlaceholderPage')) {
  errors.push('auth form pattern must not use placeholder pages');
}

['Dialog', 'Drawer'].forEach((requiredText) => {
  if (!source.responsivePanel.includes(requiredText)) {
    errors.push(`responsive panel missing ${requiredText}`);
  }
});

['customerNavigationItems', 'sellerNavigationItems'].forEach((requiredText) => {
  if (
    !source.customerLayout.includes(requiredText) &&
    !source.sellerLayout.includes(requiredText)
  ) {
    errors.push(`role shell missing ${requiredText}`);
  }
});

[
  'Shopping cart',
  'Wishlist',
  'Coupons',
  'Notification center',
  'Chat',
  'Real payment',
  'Package CRUD',
  'Customer CRUD',
  'Report export',
  'Multi-language',
  'Real quota tracking',
  'Real telecom integration',
].forEach((requiredText) => {
  if (!source.usageBoundaries.includes(requiredText)) {
    errors.push(`usage boundaries missing ${requiredText}`);
  }
});

const combinedSource = Object.entries(source)
  .filter(([key]) => key !== 'usageBoundaries')
  .map(([, value]) => value)
  .join('\n');

['Wishlist', 'Coupon', 'Notification', 'Chat', 'Export'].forEach((forbiddenText) => {
  if (combinedSource.includes(forbiddenText)) {
    errors.push(`design-system implementation must not add ${forbiddenText}`);
  }
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Design system validation passed.');
