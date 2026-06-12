export const ROUTES = {
  root: '/',
  login: '/login',
  register: '/register',
  customer: {
    root: '/customer',
    dashboard: '/customer/dashboard',
    packages: '/customer/packages',
    packageDetail: '/customer/packages/:packageId',
    packageDetailPath: (packageId: string) => `/customer/packages/${packageId}`,
    checkout: '/customer/checkout/:packageId',
    checkoutPath: (packageId: string) => `/customer/checkout/${packageId}`,
    purchaseSuccess: '/customer/success/:transactionId',
    purchaseSuccessPath: (transactionId: string) =>
      `/customer/success/${transactionId}`,
    transactions: '/customer/transactions',
    transactionView: '/customer/transactions/:transactionId',
    transactionViewPath: (transactionId: string) =>
      `/customer/transactions/${transactionId}`,
    profile: '/customer/profile',
  },
  seller: {
    root: '/seller',
    dashboard: '/seller/dashboard',
    customers: '/seller/customers',
    customerDetail: '/seller/customers/:customerId',
    customerDetailPath: (customerId: string) => `/seller/customers/${customerId}`,
    transactions: '/seller/transactions',
  },
} as const;
