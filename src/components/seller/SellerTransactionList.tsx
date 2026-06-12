import { Box, Paper, Typography } from '@mui/material';
import type { InternetPackage, Transaction, User } from '../../domain/types';
import { formatDate, formatPrice } from '../../utils/formatters';

type SellerTransactionListProps = {
  transactions: Transaction[];
  usersById: Map<string, User>;
  packagesById: Map<string, InternetPackage>;
};

export function SellerTransactionList({
  transactions,
  usersById,
  packagesById,
}: SellerTransactionListProps) {
  return (
    <Paper variant="outlined">
      {transactions.length > 0 ? (
        transactions.map((transaction) => {
          const customer = usersById.get(transaction.customerId);
          const packageItem = packagesById.get(transaction.packageId);

          return (
            <Box
              key={transaction.id}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                p: 2,
              }}
            >
              <Typography fontWeight={700}>
                {customer?.name ?? transaction.customerId}
              </Typography>
              <Typography color="text.secondary">
                {packageItem?.name ?? transaction.packageId} •{' '}
                {packageItem?.provider ?? 'Provider'} • {transaction.status} •{' '}
                {formatPrice(transaction.amount)} • {formatDate(transaction.createdAt)}
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
  );
}
