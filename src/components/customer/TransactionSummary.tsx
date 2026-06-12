import { Box, Chip, Stack, Typography } from '@mui/material';
import { DetailField, ReadOnlyDetail } from '../common/ReadOnlyDetail';
import type { InternetPackage, Transaction, TransactionStatus } from '../../domain/types';
import { formatDate, formatPrice } from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';

type TransactionSummaryProps = {
  transaction: Transaction;
  packageItem: InternetPackage;
};

export function TransactionSummary({
  transaction,
  packageItem,
}: TransactionSummaryProps) {
  const providerStyle = getProviderStyle(packageItem.provider);
  const statusStyle = getStatusStyle(transaction.status);

  return (
    <Box aria-label="Transaction Summary Provider Amount">
    <ReadOnlyDetail>
      <Stack spacing={1.5}>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${providerStyle.accentSoft} 0%, #ffffff 72%)`,
            border: 1,
            borderColor: 'rgba(15, 23, 42, 0.08)',
            borderRadius: 2,
            overflow: 'hidden',
            p: { xs: 1.5, sm: 2 },
            position: 'relative',
            '&:before': {
              bgcolor: providerStyle.accent,
              content: '""',
              height: '100%',
              left: 0,
              position: 'absolute',
              top: 0,
              width: 6,
            },
          }}
        >
          <Stack spacing={1.5} sx={{ pl: 0.75 }}>
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="space-between"
              spacing={1.5}
            >
              <Stack alignItems="center" direction="row" spacing={1}>
                <Box
                  sx={{
                    alignItems: 'center',
                    bgcolor: providerStyle.accent,
                    borderRadius: 1.25,
                    color: '#ffffff',
                    display: 'flex',
                    fontSize: '0.76rem',
                    fontWeight: 950,
                    height: 34,
                    justifyContent: 'center',
                    width: 34,
                  }}
                >
                  {packageItem.provider.slice(0, 2)}
                </Box>
                <Box>
                  <Typography color="#111827" fontWeight={950}>
                    {packageItem.name}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {packageItem.provider} order
                  </Typography>
                </Box>
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

            <Box>
              <Typography color="text.secondary" fontWeight={800} variant="body2">
                Paid amount
              </Typography>
              <Typography
                sx={{
                  color: '#111827',
                  fontSize: { xs: '1.65rem', sm: '2.1rem' },
                  fontWeight: 950,
                  lineHeight: 1,
                  mt: 0.5,
                }}
              >
                {formatPrice(transaction.amount)}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
          }}
        >
          <DetailField label="Purchase Date" value={formatDate(transaction.createdAt)} />
          <DetailField label="Provider" value={packageItem.provider} />
        </Box>
      </Stack>
    </ReadOnlyDetail>
    </Box>
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
