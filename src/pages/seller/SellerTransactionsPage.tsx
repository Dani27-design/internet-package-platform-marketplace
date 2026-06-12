import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getPackages, getTransactions, getUsers } from '../../api/queries';
import { SellerTransactionList } from '../../components/seller/SellerTransactionList';

export function SellerTransactionsPage() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const usersById = new Map((usersQuery.data ?? []).map((user) => [user.id, user]));
  const packagesById = new Map(
    (packagesQuery.data ?? []).map((packageItem) => [packageItem.id, packageItem]),
  );

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Transactions
      </Typography>
      <SellerTransactionList
        packagesById={packagesById}
        transactions={transactionsQuery.data ?? []}
        usersById={usersById}
      />
    </Stack>
  );
}
