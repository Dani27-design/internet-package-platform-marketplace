import { Box, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getActivePackages,
  getPackages,
  getTransactions,
  getUsers,
} from '../../api/queries';
import { USER_ROLES } from '../../domain/constants';
import { ROUTES } from '../../routes/paths';

export function SellerCustomersPage() {
  const navigate = useNavigate();
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
  const activePackagesQuery = useQuery({
    queryKey: ['activePackages'],
    queryFn: getActivePackages,
  });
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const customers = (usersQuery.data ?? []).filter(
    (user) => user.role === USER_ROLES.customer,
  );
  const packagesById = new Map(
    (packagesQuery.data ?? []).map((packageItem) => [packageItem.id, packageItem]),
  );
  const activePackagesByCustomerId = new Map(
    (activePackagesQuery.data ?? []).map((activePackage) => [
      activePackage.customerId,
      activePackage,
    ]),
  );
  const transactions = transactionsQuery.data ?? [];

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Customers
      </Typography>
      <Paper variant="outlined">
        {customers.map((customer) => {
          const activePackage = activePackagesByCustomerId.get(customer.id);
          const packageItem = activePackage
            ? packagesById.get(activePackage.packageId)
            : undefined;
          const totalTransactions = transactions.filter(
            (transaction) => transaction.customerId === customer.id,
          ).length;

          return (
            <Box
              key={customer.id}
              onClick={() => navigate(ROUTES.seller.customerDetailPath(customer.id))}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                cursor: 'pointer',
                p: 2,
              }}
            >
              <Typography fontWeight={700}>{customer.name}</Typography>
              <Typography color="text.secondary">
                Phone Number: {customer.phoneNumber}
              </Typography>
              <Typography color="text.secondary">
                Active Package: {packageItem?.name ?? 'No active package'}
              </Typography>
              <Typography color="text.secondary">
                Total Transactions: {totalTransactions}
              </Typography>
            </Box>
          );
        })}
      </Paper>
    </Stack>
  );
}
