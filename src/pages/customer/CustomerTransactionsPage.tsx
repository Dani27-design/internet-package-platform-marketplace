import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getCustomerTransactions, getPackages } from '../../api/queries';
import { useAuth } from '../../auth/AuthProvider';
import type { TransactionStatus } from '../../domain/types';
import { ROUTES } from '../../routes/paths';
import { formatDate, formatPrice } from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';

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
  const completedCount = transactions.filter(
    (transaction) => transaction.status === 'success',
  ).length;

  return (
    <Stack spacing={{ xs: 2, sm: 3 }}>
      <Stack
        alignItems={{ xs: 'stretch', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        spacing={1.5}
      >
        <Box>
          <Typography
            component="h1"
            sx={{
              color: '#111827',
              fontSize: { xs: '1.35rem', sm: '1.85rem' },
              fontWeight: 950,
              lineHeight: 1.1,
            }}
          >
            Purchases
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {transactions.length} orders • {completedCount} successful
          </Typography>
        </Box>
        <Button
          onClick={() => navigate(ROUTES.customer.packages)}
          sx={{
            borderColor: 'rgba(15, 23, 42, 0.16)',
            borderRadius: 1.5,
            color: '#111827',
            fontWeight: 900,
            minHeight: 36,
            px: 1.75,
          }}
          variant="outlined"
        >
          Browse plans
        </Button>
      </Stack>

      <Box
        aria-label="status createdAt amount"
        sx={{
          display: 'grid',
          gap: { xs: 1, sm: 1.25 },
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
        }}
      >
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            const packageItem = packagesById.get(transaction.packageId);
            const providerStyle = packageItem
              ? getProviderStyle(packageItem.provider)
              : null;
            const statusStyle = getStatusStyle(transaction.status);

            return (
              <Paper
                key={transaction.id}
                onClick={() =>
                  navigate(ROUTES.customer.transactionViewPath(transaction.id))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    navigate(ROUTES.customer.transactionViewPath(transaction.id));
                  }
                }}
                role="button"
                tabIndex={0}
                sx={{
                  bgcolor: '#ffffff',
                  border: 1,
                  borderColor: 'rgba(15, 23, 42, 0.08)',
                  borderRadius: 1.75,
                  boxShadow: '0 12px 30px rgba(15, 23, 42, 0.05)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
                  '&:before': {
                    bgcolor: providerStyle?.accent ?? '#1457d9',
                    content: '""',
                    height: '100%',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: 5,
                  },
                  '&:hover': {
                    borderColor: providerStyle?.accent ?? '#1457d9',
                    boxShadow: '0 18px 42px rgba(15, 23, 42, 0.09)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Stack spacing={1.5} sx={{ p: { xs: 1.5, sm: 1.75 }, pl: { xs: 2, sm: 2.25 } }}>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1.5}
                  >
                    <Stack spacing={0.35} sx={{ minWidth: 0 }}>
                      <Stack alignItems="center" direction="row" spacing={1}>
                        {providerStyle ? (
                          <Box
                            sx={{
                              bgcolor: providerStyle.accent,
                              borderRadius: 999,
                              boxShadow: `0 0 0 5px ${providerStyle.accentSoft}`,
                              flex: '0 0 9px',
                              height: 9,
                              width: 9,
                            }}
                          />
                        ) : null}
                        <Typography
                          fontWeight={950}
                          sx={{
                            color: '#111827',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {packageItem?.name ?? transaction.packageId}
                        </Typography>
                      </Stack>
                      <Typography color="text.secondary" variant="body2">
                        {packageItem?.provider ?? 'Package order'} • {formatDate(transaction.createdAt)}
                      </Typography>
                    </Stack>
                    <Chip
                      label={transaction.status}
                      size="small"
                      sx={{
                        bgcolor: statusStyle.bg,
                        color: statusStyle.color,
                        fontWeight: 900,
                        textTransform: 'capitalize',
                      }}
                    />
                  </Stack>

                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography color="text.secondary" variant="body2">
                        Total
                      </Typography>
                      <Typography color="#111827" fontWeight={950} sx={{ fontSize: '1.18rem' }}>
                        {formatPrice(transaction.amount)}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        bgcolor: providerStyle?.accentSoft ?? '#edf4ff',
                        borderRadius: 999,
                        color: providerStyle?.accentDark ?? '#173c8c',
                        fontWeight: 900,
                        px: 1.25,
                        py: 0.55,
                      }}
                      variant="body2"
                    >
                      View detail
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            );
          })
        ) : (
          <Typography color="text.secondary" sx={{ p: 2 }}>
            No transactions
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

function getStatusStyle(status: TransactionStatus) {
  if (status === 'success') {
    return { bg: '#eaf8e8', color: '#2f6b2f' };
  }

  if (status === 'failed') {
    return { bg: '#fff0f1', color: '#a32632' };
  }

  return { bg: '#fff7d8', color: '#8a6200' };
}
