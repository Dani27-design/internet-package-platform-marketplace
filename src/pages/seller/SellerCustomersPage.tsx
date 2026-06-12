import { Box, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getActivePackages,
  getPackages,
  getTransactions,
  getUsers,
} from '../../api/queries';
import { DetailField } from '../../components/common/ReadOnlyDetail';
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
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1.2fr 1fr 1.2fr 1fr',
                  },
                }}
              >
                <DetailField label="Name" value={customer.name} />
                <DetailField label="Phone Number" value={customer.phoneNumber} />
                <DetailField
                  label="Active Package"
                  value={packageItem?.name ?? 'No active package'}
                />
                <DetailField label="Total Transactions" value={`${totalTransactions}`} />
              </Box>
            </Box>
          );
        })}
      </Paper>
    </Stack>
  );
}
