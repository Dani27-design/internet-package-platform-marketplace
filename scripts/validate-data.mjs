import { readFile } from 'node:fs/promises';

const providers = new Set(['Telkomsel', 'XL', 'Indosat', 'Tri', 'Smartfren']);
const roles = new Set(['customer', 'seller']);
const statuses = new Set(['pending', 'success', 'failed']);

const data = JSON.parse(await readFile(new URL('../db.json', import.meta.url), 'utf8'));

const errors = [];

function requireCollection(name) {
  if (!Array.isArray(data[name])) {
    errors.push(`${name} must be an array`);
  }
}

requireCollection('users');
requireCollection('packages');
requireCollection('transactions');
requireCollection('activePackages');

const users = Array.isArray(data.users) ? data.users : [];
const packages = Array.isArray(data.packages) ? data.packages : [];
const transactions = Array.isArray(data.transactions) ? data.transactions : [];
const activePackages = Array.isArray(data.activePackages) ? data.activePackages : [];

const userIds = new Set(users.map((user) => user.id));
const customerIds = new Set(
  users.filter((user) => user.role === 'customer').map((user) => user.id),
);
const packageIds = new Set(packages.map((packageItem) => packageItem.id));

users.forEach((user) => {
  ['id', 'role', 'name', 'email', 'phoneNumber', 'password'].forEach((field) => {
    if (!user[field]) {
      errors.push(`user ${user.id ?? '<missing id>'} is missing ${field}`);
    }
  });

  if (!roles.has(user.role)) {
    errors.push(`user ${user.id} has unsupported role ${user.role}`);
  }
});

if (!users.some((user) => user.role === 'customer')) {
  errors.push('at least one customer user is required');
}

if (!users.some((user) => user.role === 'seller')) {
  errors.push('at least one seller user is required');
}

packages.forEach((packageItem) => {
  [
    'id',
    'provider',
    'name',
    'quota',
    'validityDays',
    'price',
    'isPopular',
    'isFeatured',
    'isBestValue',
  ].forEach((field) => {
    if (packageItem[field] === undefined || packageItem[field] === null) {
      errors.push(`package ${packageItem.id ?? '<missing id>'} is missing ${field}`);
    }
  });

  if (!providers.has(packageItem.provider)) {
    errors.push(`package ${packageItem.id} has unsupported provider ${packageItem.provider}`);
  }

  if (!Array.isArray(packageItem.benefits) || packageItem.benefits.length === 0) {
    errors.push(`package ${packageItem.id} must include display-only benefits`);
  }
});

providers.forEach((provider) => {
  if (!packages.some((packageItem) => packageItem.provider === provider)) {
    errors.push(`provider ${provider} must have at least one package`);
  }
});

['isPopular', 'isFeatured', 'isBestValue'].forEach((flag) => {
  if (!packages.some((packageItem) => packageItem[flag] === true)) {
    errors.push(`at least one package must have ${flag}`);
  }
});

transactions.forEach((transaction) => {
  ['id', 'customerId', 'packageId', 'amount', 'status', 'createdAt'].forEach((field) => {
    if (!transaction[field]) {
      errors.push(`transaction ${transaction.id ?? '<missing id>'} is missing ${field}`);
    }
  });

  if (!userIds.has(transaction.customerId)) {
    errors.push(`transaction ${transaction.id} references missing customer ${transaction.customerId}`);
  }

  if (!packageIds.has(transaction.packageId)) {
    errors.push(`transaction ${transaction.id} references missing package ${transaction.packageId}`);
  }

  if (!statuses.has(transaction.status)) {
    errors.push(`transaction ${transaction.id} has unsupported status ${transaction.status}`);
  }
});

activePackages.forEach((activePackage) => {
  ['id', 'customerId', 'packageId', 'totalQuota', 'remainingQuota', 'expiryDate'].forEach(
    (field) => {
      if (!activePackage[field]) {
        errors.push(`activePackage ${activePackage.id ?? '<missing id>'} is missing ${field}`);
      }
    },
  );

  if (!customerIds.has(activePackage.customerId)) {
    errors.push(
      `activePackage ${activePackage.id} references missing customer ${activePackage.customerId}`,
    );
  }

  if (!packageIds.has(activePackage.packageId)) {
    errors.push(
      `activePackage ${activePackage.id} references missing package ${activePackage.packageId}`,
    );
  }
});

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Data validation passed.');
