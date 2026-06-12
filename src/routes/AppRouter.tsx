import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { CustomerLayout } from '../components/customer/CustomerLayout';
import { SellerLayout } from '../components/seller/SellerLayout';
import { USER_ROLES } from '../domain/constants';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { CheckoutPage } from '../pages/customer/CheckoutPage';
import { CustomerDashboardPage } from '../pages/customer/CustomerDashboardPage';
import { CustomerProfilePage } from '../pages/customer/CustomerProfilePage';
import { CustomerTransactionsPage } from '../pages/customer/CustomerTransactionsPage';
import { PackageCatalogPage } from '../pages/customer/PackageCatalogPage';
import { PackageDetailPage } from '../pages/customer/PackageDetailPage';
import { PurchaseSuccessPage } from '../pages/customer/PurchaseSuccessPage';
import { TransactionViewPage } from '../pages/customer/TransactionViewPage';
import { SellerCustomerDetailPage } from '../pages/seller/SellerCustomerDetailPage';
import { SellerCustomersPage } from '../pages/seller/SellerCustomersPage';
import { SellerDashboardPage } from '../pages/seller/SellerDashboardPage';
import { SellerTransactionsPage } from '../pages/seller/SellerTransactionsPage';
import { ROUTES } from './paths';
import { RequireRole } from './RequireRole';

function RoleRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (user.role === USER_ROLES.customer) {
    return <Navigate to={ROUTES.customer.dashboard} replace />;
  }

  return <Navigate to={ROUTES.seller.dashboard} replace />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.root} element={<RoleRedirect />} />
      <Route path={ROUTES.login} element={<LoginPage />} />
      <Route path={ROUTES.register} element={<RegisterPage />} />

      <Route element={<RequireRole role={USER_ROLES.customer} />}>
        <Route element={<CustomerLayout />}>
          <Route
            path={ROUTES.customer.root}
            element={<Navigate to={ROUTES.customer.dashboard} replace />}
          />
          <Route path={ROUTES.customer.dashboard} element={<CustomerDashboardPage />} />
          <Route path={ROUTES.customer.packages} element={<PackageCatalogPage />} />
          <Route path={ROUTES.customer.packageDetail} element={<PackageDetailPage />} />
          <Route path={ROUTES.customer.checkout} element={<CheckoutPage />} />
          <Route
            path={ROUTES.customer.purchaseSuccess}
            element={<PurchaseSuccessPage />}
          />
          <Route
            path={ROUTES.customer.transactions}
            element={<CustomerTransactionsPage />}
          />
          <Route
            path={ROUTES.customer.transactionView}
            element={<TransactionViewPage />}
          />
          <Route path={ROUTES.customer.profile} element={<CustomerProfilePage />} />
        </Route>
      </Route>

      <Route element={<RequireRole role={USER_ROLES.seller} />}>
        <Route element={<SellerLayout />}>
          <Route
            path={ROUTES.seller.root}
            element={<Navigate to={ROUTES.seller.dashboard} replace />}
          />
          <Route path={ROUTES.seller.dashboard} element={<SellerDashboardPage />} />
          <Route path={ROUTES.seller.customers} element={<SellerCustomersPage />} />
          <Route
            path={ROUTES.seller.customerDetail}
            element={<SellerCustomerDetailPage />}
          />
          <Route path={ROUTES.seller.transactions} element={<SellerTransactionsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.root} replace />} />
    </Routes>
  );
}
