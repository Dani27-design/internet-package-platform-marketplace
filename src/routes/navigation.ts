import { ROUTES } from './paths';

export type NavigationItem = {
  label: string;
  path: string;
};

export const customerNavigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.customer.dashboard,
  },
  {
    label: 'Packages',
    path: ROUTES.customer.packages,
  },
  {
    label: 'Transactions',
    path: ROUTES.customer.transactions,
  },
  {
    label: 'Profile',
    path: ROUTES.customer.profile,
  },
];

export const sellerNavigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.seller.dashboard,
  },
  {
    label: 'Customers',
    path: ROUTES.seller.customers,
  },
  {
    label: 'Transactions',
    path: ROUTES.seller.transactions,
  },
];
