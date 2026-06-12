import { Box, Button, Stack, Typography } from '@mui/material';
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
    <Stack spacing={{ xs: 2, sm: 2.5 }}>
      <Box
        sx={{
          bgcolor: '#ffffff',
          border: 1,
          borderColor: 'rgba(15, 23, 42, 0.08)',
          borderRadius: 2,
          boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
          p: { xs: 1.75, sm: 2.25 },
        }}
      >
        <Stack alignItems="center" direction="row" spacing={1.25}>
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: '#eaf8e8',
              borderRadius: 999,
              color: '#2f6b2f',
              display: 'flex',
              flex: '0 0 42px',
              fontWeight: 950,
              height: 42,
              justifyContent: 'center',
              width: 42,
            }}
          >
            OK
          </Box>
          <Box>
            <Typography
              component="h1"
              sx={{
                color: '#111827',
                fontSize: { xs: '1.25rem', sm: '1.55rem' },
                fontWeight: 950,
                lineHeight: 1.1,
              }}
            >
              Purchase Success
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Your purchase has been completed.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {transaction && packageItem ? (
        <TransactionSummary transaction={transaction} packageItem={packageItem} />
      ) : (
        <Typography color="text.secondary">Transaction summary not found</Typography>
      )}

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        sx={{
          '& .MuiButton-root': {
            borderRadius: 1.5,
            fontWeight: 950,
            minHeight: 44,
          },
        }}
      >
        <Button
          disabled={!transaction}
          onClick={() =>
            transaction &&
            navigate(ROUTES.customer.transactionViewPath(transaction.id))
          }
          sx={{ bgcolor: '#1457d9' }}
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
