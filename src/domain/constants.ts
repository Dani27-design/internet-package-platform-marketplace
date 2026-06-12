export const USER_ROLES = {
  customer: 'customer',
  seller: 'seller',
} as const;

export const TRANSACTION_STATUSES = {
  pending: 'pending',
  success: 'success',
  failed: 'failed',
} as const;

export const PROVIDERS = ['Telkomsel', 'XL', 'Indosat', 'Tri', 'Smartfren'] as const;
