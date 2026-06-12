import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import type { InternetPackage, Transaction, User } from '../../domain/types';
import { formatDate, formatPrice } from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';
import { DetailField } from '../common/ReadOnlyDetail';

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
  void DetailField;

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        bgcolor: 'rgba(255,255,255,0.9)',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        boxShadow: '0 18px 48px rgba(15, 23, 42, 0.07)',
        overflowX: 'auto',
      }}
    >
      <Table sx={{ minWidth: 860 }} aria-label="Seller transaction table">
        <TableHead>
          <TableRow>
            {['Customer', 'Package', 'Provider', 'Status', 'Amount', 'Purchase Date'].map(
              (header) => (
                <TableCell key={header} sx={headCellSx}>
                  {header}
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => {
              const customer = usersById.get(transaction.customerId);
              const packageItem = packagesById.get(transaction.packageId);

              return (
                <TableRow
                  key={transaction.id}
                  hover
                  sx={{
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': {
                      bgcolor: 'rgba(237, 243, 255, 0.38)',
                    },
                  }}
                >
                  <TableCell sx={bodyCellSx}>
                    <PrimaryText value={customer?.name ?? transaction.customerId} />
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <PrimaryText value={packageItem?.name ?? transaction.packageId} />
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <ProviderPill provider={packageItem?.provider} />
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <StatusPill status={transaction.status} />
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <Typography sx={{ fontWeight: 950 }}>
                      {formatPrice(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <Typography sx={{ color: 'text.secondary', fontWeight: 800 }}>
                      {formatDate(transaction.createdAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={6} sx={{ borderBottom: 0, p: 3 }}>
                <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
                  No transactions
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function PrimaryText({ value }: { value: string }) {
  return (
    <Typography
      sx={{
        fontWeight: 900,
        maxWidth: 220,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </Typography>
  );
}

function ProviderPill({ provider }: { provider?: InternetPackage['provider'] }) {
  if (!provider) {
    return <Typography color="text.secondary">Provider</Typography>;
  }

  const providerStyle = getProviderStyle(provider);

  return (
    <Box
      sx={{
        alignItems: 'center',
        bgcolor: providerStyle.accentSoft,
        border: `1px solid ${providerStyle.accent}26`,
        borderRadius: '999px',
        color: providerStyle.accentDark,
        display: 'inline-flex',
        gap: 0.75,
        px: 1.1,
        py: 0.6,
      }}
    >
      <Box
        sx={{
          bgcolor: providerStyle.accent,
          borderRadius: '50%',
          height: 9,
          width: 9,
        }}
      />
      <Typography sx={{ fontWeight: 950, lineHeight: 1 }} variant="body2">
        {provider}
      </Typography>
    </Box>
  );
}

function StatusPill({ status }: { status: string }) {
  const isSuccess = status === 'success';
  const isPending = status === 'pending';

  return (
    <Box
      sx={{
        bgcolor: isSuccess ? '#e8f8e5' : isPending ? '#fff4d6' : '#fff0f1',
        borderRadius: '999px',
        color: isSuccess ? '#3d7a32' : isPending ? '#8a6200' : '#9f1722',
        display: 'inline-flex',
        fontSize: '0.82rem',
        fontWeight: 950,
        lineHeight: 1,
        px: 1.1,
        py: 0.75,
        textTransform: 'capitalize',
      }}
    >
      {status}
    </Box>
  );
}

const headCellSx = {
  bgcolor: 'rgba(248, 250, 252, 0.92)',
  borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
  color: 'text.secondary',
  fontSize: '0.76rem',
  fontWeight: 950,
  letterSpacing: 0,
  py: 1.25,
};

const bodyCellSx = {
  borderBottom: '1px solid rgba(15, 23, 42, 0.06)',
  py: 1.35,
};
