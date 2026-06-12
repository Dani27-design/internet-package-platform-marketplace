import { Button, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getActivePackages,
  getCustomerTransactions,
  getPackages,
  getUsers,
} from '../../api/queries';
import { DetailField, ReadOnlyDetail } from '../../components/common/ReadOnlyDetail';
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

      <ReadOnlyDetail title="Customer Information">
        {customer ? (
          <>
            <DetailField label="Name" value={customer.name} />
            <DetailField label="Email" value={customer.email} />
            <DetailField label="Phone Number" value={customer.phoneNumber} />
          </>
        ) : (
          <Typography color="text.secondary">Customer not found</Typography>
        )}
      </ReadOnlyDetail>

      <ReadOnlyDetail title="Active Package">
        {activePackage && activePackageItem ? (
          <>
            <DetailField label="Package" value={activePackageItem.name} />
            <DetailField
              label="Remaining Quota"
              value={formatQuota(activePackage.remainingQuota)}
            />
            <DetailField label="Expiry Date" value={formatDate(activePackage.expiryDate)} />
          </>
        ) : (
          <Typography color="text.secondary">No active package</Typography>
        )}
      </ReadOnlyDetail>

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
