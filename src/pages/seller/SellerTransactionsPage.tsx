import { Box, Stack, Typography } from '@mui/material';
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
    <Stack spacing={{ xs: 2, md: 2.5 }}>
      <Box>
        <Typography color="text.secondary" sx={{ fontWeight: 850 }} variant="caption">
          Purchase ledger
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.55rem', md: '1.95rem' },
            fontWeight: 950,
            letterSpacing: 0,
            lineHeight: 1.05,
          }}
        >
          Transactions
        </Typography>
      </Box>
      <SellerTransactionList
        packagesById={packagesById}
        transactions={transactionsQuery.data ?? []}
        usersById={usersById}
      />
    </Stack>
  );
}
