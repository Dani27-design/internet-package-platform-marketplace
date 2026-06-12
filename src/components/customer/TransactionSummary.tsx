import { Paper, Stack, Typography } from '@mui/material';
import type { InternetPackage, Transaction } from '../../domain/types';
import { formatDate, formatPrice } from '../../utils/formatters';

type TransactionSummaryProps = {
  transaction: Transaction;
  packageItem: InternetPackage;
};

export function TransactionSummary({
  transaction,
  packageItem,
}: TransactionSummaryProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Typography component="h2" variant="h6">
          Transaction Summary
        </Typography>
        <Typography>Status: {transaction.status}</Typography>
        <Typography>Purchase Date: {formatDate(transaction.createdAt)}</Typography>
        <Typography>Package: {packageItem.name}</Typography>
        <Typography>Provider: {packageItem.provider}</Typography>
        <Typography>Amount: {formatPrice(transaction.amount)}</Typography>
      </Stack>
    </Paper>
  );
}
