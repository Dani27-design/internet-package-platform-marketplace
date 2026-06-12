import { readFile } from 'node:fs/promises';

const files = {
  responsivePanel: '../src/components/customer/ResponsivePanel.tsx',
  customerLayout: '../src/components/customer/CustomerLayout.tsx',
  sellerLayout: '../src/components/seller/SellerLayout.tsx',
  sellerTransactionList: '../src/components/seller/SellerTransactionList.tsx',
  sellerCustomers: '../src/pages/seller/SellerCustomersPage.tsx',
  readOnlyDetail: '../src/components/common/ReadOnlyDetail.tsx',
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
  'useMediaQuery',
  'min-width:600px',
  'Dialog',
  'Drawer',
  'anchor="bottom"',
  'aria-labelledby',
  'Close',
].forEach((requiredText) => {
  if (!source.responsivePanel.includes(requiredText)) {
    errors.push(`responsive panel missing ${requiredText}`);
  }
});

['xs:', 'sm:', 'flexWrap', 'minWidth'].forEach((requiredText) => {
  if (!source.customerLayout.includes(requiredText)) {
    errors.push(`customer layout missing responsive pattern ${requiredText}`);
  }
});

['Drawer', 'variant="permanent"', "display: { xs: 'none', md: 'block' }", 'drawerWidth'].forEach(
  (requiredText) => {
    if (!source.sellerLayout.includes(requiredText)) {
      errors.push(`seller layout missing desktop drawer pattern ${requiredText}`);
    }
  },
);

["display: { xs: 'block', md: 'none' }", 'flexWrap', 'minWidth'].forEach(
  (requiredText) => {
    if (!source.sellerLayout.includes(requiredText)) {
      errors.push(`seller layout missing mobile responsive pattern ${requiredText}`);
    }
  },
);

['gridTemplateColumns', 'xs:', 'md:', 'DetailField'].forEach((requiredText) => {
  if (!source.sellerTransactionList.includes(requiredText)) {
    errors.push(`seller transaction list missing responsive pattern ${requiredText}`);
  }
});

['gridTemplateColumns', 'xs:', 'md:', 'DetailField'].forEach((requiredText) => {
  if (!source.sellerCustomers.includes(requiredText)) {
    errors.push(`seller customers list missing responsive pattern ${requiredText}`);
  }
});

if (!source.readOnlyDetail.includes('overflowWrap')) {
  errors.push('shared read-only detail field missing overflowWrap');
}

const combinedSellerSource = [
  source.sellerLayout,
  source.sellerTransactionList,
  source.sellerCustomers,
].join('\n');

['Create', 'Edit', 'Delete', 'Export', 'Update', 'Remove'].forEach((forbiddenText) => {
  if (combinedSellerSource.includes(forbiddenText)) {
    errors.push(`responsive seller work must not add ${forbiddenText} action`);
  }
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Responsive validation passed.');
