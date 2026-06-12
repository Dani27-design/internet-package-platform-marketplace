import { Box, Paper, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getPackages, getTransactions, getUsers } from '../../api/queries';
import { KpiCard } from '../../components/seller/KpiCard';
import { SellerTransactionList } from '../../components/seller/SellerTransactionList';
import {
  getTopPackages,
  getTopProviders,
  getTotalCustomers,
  getTotalRevenue,
  getTotalTransactions,
  getTransactionSuccessRate,
} from '../../utils/analytics';
import { formatPercentage, formatPrice } from '../../utils/formatters';

export function SellerDashboardPage() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });

  const users = usersQuery.data ?? [];
  const packages = packagesQuery.data ?? [];
  const transactions = transactionsQuery.data ?? [];
  const usersById = new Map(users.map((user) => [user.id, user]));
  const packagesById = new Map(packages.map((packageItem) => [packageItem.id, packageItem]));
  const recentTransactions = [...transactions].slice(0, 5);
  const topProviders = getTopProviders(transactions, packages);
  const topPackages = getTopPackages(transactions, packages);

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Seller Dashboard
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        <KpiCard label="Total Customers" value={`${getTotalCustomers(users)}`} />
        <KpiCard
          label="Total Transactions"
          value={`${getTotalTransactions(transactions)}`}
        />
        <KpiCard label="Total Revenue" value={formatPrice(getTotalRevenue(transactions))} />
        <KpiCard
          label="Transaction Success Rate"
          value={formatPercentage(getTransactionSuccessRate(transactions))}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        }}
      >
        <RankingSection
          rows={topProviders.map((item) => ({
            label: item.provider,
            value: formatPrice(item.revenue),
          }))}
          title="Top Providers"
        />
        <RankingSection
          rows={topPackages.map((item) => ({
            label: item.name,
            value: formatPrice(item.revenue),
          }))}
          title="Top Packages"
        />
      </Box>

      <Stack spacing={2}>
        <Typography component="h2" variant="h6">
          Recent Transactions
        </Typography>
        <SellerTransactionList
          packagesById={packagesById}
          transactions={recentTransactions}
          usersById={usersById}
        />
      </Stack>
    </Stack>
  );
}

function RankingSection({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <Typography component="h2" variant="h6">
          {title}
        </Typography>
        {rows.length > 0 ? (
          rows.map((row) => (
            <Box
              key={row.label}
              sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
            >
              <Typography>{row.label}</Typography>
              <Typography fontWeight={700}>{row.value}</Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">No data</Typography>
        )}
      </Stack>
    </Paper>
  );
}
