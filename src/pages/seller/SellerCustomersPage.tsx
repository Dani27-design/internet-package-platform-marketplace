import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getActivePackages,
  getPackages,
  getTransactions,
  getUsers,
} from '../../api/queries';
import { DetailField } from '../../components/common/ReadOnlyDetail';
import { USER_ROLES } from '../../domain/constants';
import { ROUTES } from '../../routes/paths';
import { getProviderStyle } from '../../utils/providerStyles';

export function SellerCustomersPage() {
  const navigate = useNavigate();
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
  const activePackagesQuery = useQuery({
    queryKey: ['activePackages'],
    queryFn: getActivePackages,
  });
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const customers = (usersQuery.data ?? []).filter(
    (user) => user.role === USER_ROLES.customer,
  );
  const packagesById = new Map(
    (packagesQuery.data ?? []).map((packageItem) => [packageItem.id, packageItem]),
  );
  const activePackagesByCustomerId = new Map(
    (activePackagesQuery.data ?? []).map((activePackage) => [
      activePackage.customerId,
      activePackage,
    ]),
  );
  const transactions = transactionsQuery.data ?? [];

  return (
    <Stack spacing={{ xs: 2, md: 2.5 }}>
      <Box>
        <Typography color="text.secondary" sx={{ fontWeight: 850 }} variant="caption">
          Customer directory
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1.55rem', md: '1.95rem' },
            fontWeight: 950,
            letterSpacing: 0,
            lineHeight: 1.05,
          }}
        >
          Customers
        </Typography>
      </Box>

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
        <Table sx={{ minWidth: 820 }} aria-label="Seller customer table">
          <TableHead>
            <TableRow>
              {['Name', 'Phone Number', 'Active Package', 'Total Transactions'].map(
                (header) => (
                  <TableCell key={header} sx={headCellSx}>
                    {header}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              const activePackage = activePackagesByCustomerId.get(customer.id);
              const packageItem = activePackage
                ? packagesById.get(activePackage.packageId)
                : undefined;
              const totalTransactions = transactions.filter(
                (transaction) => transaction.customerId === customer.id,
              ).length;

              return (
                <TableRow
                  key={customer.id}
                  hover
                  onClick={() => navigate(ROUTES.seller.customerDetailPath(customer.id))}
                  sx={{
                    cursor: 'pointer',
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': {
                      bgcolor: 'rgba(237, 243, 255, 0.42)',
                    },
                  }}
                >
                  <TableCell sx={bodyCellSx}>
                    <Box>
                      <Typography sx={{ fontWeight: 950 }}>{customer.name}</Typography>
                      <Typography color="text.secondary" sx={{ fontWeight: 700 }} variant="caption">
                        {customer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <Typography sx={{ fontWeight: 900 }}>{customer.phoneNumber}</Typography>
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    {packageItem ? (
                      <PackagePill provider={packageItem.provider} value={packageItem.name} />
                    ) : (
                      <Typography color="text.secondary" sx={{ fontWeight: 800 }}>
                        No active package
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <Typography sx={{ fontWeight: 950 }}>{totalTransactions}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

function PackagePill({
  provider,
  value,
}: {
  provider: Parameters<typeof getProviderStyle>[0];
  value: string;
}) {
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
        py: 0.65,
      }}
    >
      <Box sx={{ bgcolor: providerStyle.accent, borderRadius: '50%', height: 9, width: 9 }} />
      <Typography sx={{ fontWeight: 950, lineHeight: 1 }} variant="body2">
        {value}
      </Typography>
    </Box>
  );
}

void DetailField;

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
