import { Button, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getActivePackages,
  getCustomerTransactions,
  getPackages,
  getUsers,
} from '../../api/queries';
import { SellerTransactionList } from '../../components/seller/SellerTransactionList';
import { ROUTES } from '../../routes/paths';
import { formatDate, formatQuota } from '../../utils/formatters';

export function SellerCustomerDetailPage() {
  const navigate = useNavigate();
  const { customerId = '' } = useParams();
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
    queryKey: ['customerTransactions', customerId],
    queryFn: () => getCustomerTransactions(customerId),
    enabled: Boolean(customerId),
  });

  const users = usersQuery.data ?? [];
  const customer = users.find((user) => user.id === customerId);
  const packages = packagesQuery.data ?? [];
  const packagesById = new Map(packages.map((packageItem) => [packageItem.id, packageItem]));
  const usersById = new Map(users.map((user) => [user.id, user]));
  const activePackage = (activePackagesQuery.data ?? []).find(
    (item) => item.customerId === customerId,
  );
  const activePackageItem = activePackage
    ? packagesById.get(activePackage.packageId)
    : undefined;
  const transactions = transactionsQuery.data ?? [];

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Customer Detail
      </Typography>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography component="h2" variant="h6">
            Customer Information
          </Typography>
          {customer ? (
            <>
              <Typography>Name: {customer.name}</Typography>
              <Typography>Email: {customer.email}</Typography>
              <Typography>Phone Number: {customer.phoneNumber}</Typography>
            </>
          ) : (
            <Typography color="text.secondary">Customer not found</Typography>
          )}
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography component="h2" variant="h6">
            Active Package
          </Typography>
          {activePackage && activePackageItem ? (
            <>
              <Typography>{activePackageItem.name}</Typography>
              <Typography>Remaining Quota: {formatQuota(activePackage.remainingQuota)}</Typography>
              <Typography>Expiry Date: {formatDate(activePackage.expiryDate)}</Typography>
            </>
          ) : (
            <Typography color="text.secondary">No active package</Typography>
          )}
        </Stack>
      </Paper>

      <Stack spacing={2}>
        <Typography component="h2" variant="h6">
          Transaction History
        </Typography>
        <SellerTransactionList
          packagesById={packagesById}
          transactions={transactions}
          usersById={usersById}
        />
      </Stack>

      <Button onClick={() => navigate(ROUTES.seller.transactions)} variant="outlined">
        View Transactions
      </Button>
    </Stack>
  );
}
