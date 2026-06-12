import { Stack, Typography } from '@mui/material';
import { DetailField, ReadOnlyDetail } from '../common/ReadOnlyDetail';
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
    <ReadOnlyDetail>
      <Stack spacing={1}>
        <Typography component="h2" variant="h6">
          Transaction Summary
        </Typography>
        <DetailField label="Status" value={transaction.status} />
        <DetailField label="Purchase Date" value={formatDate(transaction.createdAt)} />
        <DetailField label="Package" value={packageItem.name} />
        <DetailField label="Provider" value={packageItem.provider} />
        <DetailField label="Amount" value={formatPrice(transaction.amount)} />
      </Stack>
    </ReadOnlyDetail>
  );
}
