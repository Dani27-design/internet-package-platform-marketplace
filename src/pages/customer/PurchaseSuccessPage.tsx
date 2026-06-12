import { Button, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById, getTransactionById } from '../../api/queries';
import { TransactionSummary } from '../../components/customer/TransactionSummary';
import { ROUTES } from '../../routes/paths';

export function PurchaseSuccessPage() {
  const navigate = useNavigate();
  const { transactionId = '' } = useParams();
  const transactionQuery = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: Boolean(transactionId),
  });
  const transaction = transactionQuery.data;
  const packageQuery = useQuery({
    queryKey: ['package', transaction?.packageId],
    queryFn: () => getPackageById(transaction?.packageId ?? ''),
    enabled: Boolean(transaction?.packageId),
  });
  const packageItem = packageQuery.data;

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Purchase Success
      </Typography>
      <Typography>Your purchase has been completed.</Typography>
      {transaction && packageItem ? (
        <TransactionSummary transaction={transaction} packageItem={packageItem} />
      ) : (
        <Typography color="text.secondary">Transaction summary not found</Typography>
      )}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <Button
          disabled={!transaction}
          onClick={() =>
            transaction &&
            navigate(ROUTES.customer.transactionViewPath(transaction.id))
          }
          variant="contained"
        >
          View Transaction
        </Button>
        <Button onClick={() => navigate(ROUTES.customer.packages)} variant="outlined">
          Continue Browsing
        </Button>
        <Button onClick={() => navigate(ROUTES.customer.dashboard)} variant="outlined">
          Return to Dashboard
        </Button>
      </Stack>
    </Stack>
  );
}
