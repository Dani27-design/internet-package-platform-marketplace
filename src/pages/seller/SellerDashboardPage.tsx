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
    <Stack spacing={{ xs: 1.75, md: 2 }}>
      <Typography
        component="h1"
        sx={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          m: -1,
          overflow: 'hidden',
          p: 0,
          position: 'absolute',
          width: 1,
        }}
      >
        Seller Dashboard
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={0.75}
        sx={{ alignItems: { xs: 'flex-start', sm: 'flex-end' }, justifyContent: 'space-between' }}
      >
        <Box>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '0.82rem',
              fontWeight: 900,
            }}
          >
            Business overview
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.45rem', md: '1.9rem' },
              fontWeight: 950,
              letterSpacing: 0,
              lineHeight: 1.05,
            }}
          >
            Sales, customers, and network performance
          </Typography>
        </Box>
        <Typography color="text.secondary" sx={{ fontWeight: 800 }} variant="body2">
          Read-only analytics
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 1.25, md: 1.5 },
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(4, minmax(0, 1fr))',
          },
        }}
      >
        <KpiCard
          accent="#2f5bd8"
          helper="Registered buyers"
          label="Total Customers"
          value={`${getTotalCustomers(users)}`}
        />
        <KpiCard
          accent="#7c3aed"
          helper="All purchase records"
          label="Total Transactions"
          value={`${getTotalTransactions(transactions)}`}
        />
        <KpiCard
          accent="#ef3b45"
          helper="Gross order value"
          label="Total Revenue"
          value={formatPrice(getTotalRevenue(transactions))}
        />
        <KpiCard
          accent="#2f7d73"
          helper="Successful orders"
          label="Transaction Success Rate"
          value={formatPercentage(getTransactionSuccessRate(transactions))}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 1.25, md: 1.5 },
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
        <SectionHeader
          eyebrow="Latest activity"
          title="Recent Transactions"
        />
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
  const maxValue = Math.max(
    ...rows.map((row) => Number(row.value.replace(/[^0-9]/g, ''))),
    1,
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        bgcolor: 'rgba(255,255,255,0.9)',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        boxShadow: '0 18px 48px rgba(15, 23, 42, 0.06)',
        p: { xs: 1.5, md: 2 },
      }}
    >
      <Stack spacing={1.5}>
        <SectionHeader title={title} />
        {rows.length > 0 ? (
          rows.map((row) => (
            <Stack key={row.label} spacing={0.75}>
              <Box sx={{ alignItems: 'center', display: 'flex', gap: 2 }}>
                <Typography sx={{ flex: 1, fontWeight: 900 }}>{row.label}</Typography>
                <Typography sx={{ fontWeight: 950 }}>{row.value}</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: 'rgba(15, 23, 42, 0.06)',
                  borderRadius: '999px',
                  height: 7,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    bgcolor: '#2f5bd8',
                    borderRadius: '999px',
                    height: '100%',
                    width: `${Math.max(
                      12,
                      (Number(row.value.replace(/[^0-9]/g, '')) / maxValue) * 100,
                    )}%`,
                  }}
                />
              </Box>
            </Stack>
          ))
        ) : (
          <Typography color="text.secondary" sx={{ fontWeight: 700 }}>
            No data
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <Box>
      {eyebrow ? (
        <Typography color="text.secondary" sx={{ fontWeight: 850 }} variant="caption">
          {eyebrow}
        </Typography>
      ) : null}
      <Typography component="h2" sx={{ fontSize: '1.15rem', fontWeight: 950 }}>
        {title}
      </Typography>
    </Box>
  );
}
