import { Box, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCustomerTransactions, getPackages } from '../../api/queries';
import { useAuth } from '../../auth/AuthProvider';
import { ROUTES } from '../../routes/paths';
import { formatDate, formatPrice } from '../../utils/formatters';

export function CustomerTransactionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const customerId = user?.id ?? '';
  const transactionsQuery = useQuery({
    queryKey: ['customerTransactions', customerId],
    queryFn: () => getCustomerTransactions(customerId),
    enabled: Boolean(customerId),
  });
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
  const packagesById = new Map(
    (packagesQuery.data ?? []).map((packageItem) => [packageItem.id, packageItem]),
  );
  const transactions = transactionsQuery.data ?? [];

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Transactions
      </Typography>
      <Paper variant="outlined">
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            const packageItem = packagesById.get(transaction.packageId);

            return (
              <Box
                key={transaction.id}
                onClick={() =>
                  navigate(ROUTES.customer.transactionViewPath(transaction.id))
                }
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  cursor: 'pointer',
                  p: 2,
                }}
              >
                <Typography fontWeight={700}>
                  {packageItem?.name ?? transaction.packageId}
                </Typography>
                <Typography color="text.secondary">
                  {transaction.status} • {formatDate(transaction.createdAt)} •{' '}
                  {formatPrice(transaction.amount)}
                </Typography>
              </Box>
            );
          })
        ) : (
          <Typography color="text.secondary" sx={{ p: 2 }}>
            No transactions
          </Typography>
        )}
      </Paper>
    </Stack>
  );
}
