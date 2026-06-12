import { Box, Paper, Typography } from '@mui/material';
import { DetailField } from '../common/ReadOnlyDetail';
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
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: {
                    xs: '1fr',
                    md: '1.2fr 1.2fr 1fr 0.8fr 1fr 1fr',
                  },
                }}
              >
                <DetailField label="Customer" value={customer?.name ?? transaction.customerId} />
                <DetailField label="Package" value={packageItem?.name ?? transaction.packageId} />
                <DetailField label="Provider" value={packageItem?.provider ?? 'Provider'} />
                <DetailField label="Status" value={transaction.status} />
                <DetailField label="Amount" value={formatPrice(transaction.amount)} />
                <DetailField label="Purchase Date" value={formatDate(transaction.createdAt)} />
              </Box>
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
