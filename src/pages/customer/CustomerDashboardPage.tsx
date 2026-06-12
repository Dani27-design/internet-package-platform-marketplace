import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getCustomerActivePackage,
  getCustomerTransactions,
  getPackages,
} from '../../api/queries';
import { useAuth } from '../../auth/AuthProvider';
import { ActivePackageWidget } from '../../components/customer/ActivePackageWidget';
import { PackageCard } from '../../components/customer/PackageCard';
import { PROVIDERS } from '../../domain/constants';
import type { InternetPackage } from '../../domain/types';
import { ROUTES } from '../../routes/paths';
import { formatDate, formatPrice } from '../../utils/formatters';

export function CustomerDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const customerId = user?.id ?? '';

  const packagesQuery = useQuery({
    queryKey: ['packages'],
    queryFn: getPackages,
  });
  const activePackageQuery = useQuery({
    queryKey: ['activePackage', customerId],
    queryFn: () => getCustomerActivePackage(customerId),
    enabled: Boolean(customerId),
  });
  const transactionsQuery = useQuery({
    queryKey: ['customerTransactions', customerId],
    queryFn: () => getCustomerTransactions(customerId),
    enabled: Boolean(customerId),
  });

  const packages = packagesQuery.data ?? [];
  const packagesById = new Map(packages.map((item) => [item.id, item]));
  const activePackage = activePackageQuery.data;
  const activePackageItem = activePackage
    ? packagesById.get(activePackage.packageId)
    : undefined;
  const recentTransactions = [...(transactionsQuery.data ?? [])].slice(0, 3);

  const openPackage = (packageId: string) => {
    navigate(ROUTES.customer.packageDetailPath(packageId));
  };

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Dashboard
      </Typography>

      {activePackage && activePackageItem ? (
        <ActivePackageWidget
          activePackage={activePackage}
          packageItem={activePackageItem}
        />
      ) : (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography>Active Package</Typography>
        </Paper>
      )}

      <PackageSection
        packages={packages.filter((packageItem) => packageItem.isPopular)}
        title="Popular Packages"
        onSelect={openPackage}
      />
      <PackageSection
        packages={packages.filter((packageItem) => packageItem.isFeatured)}
        title="Featured Packages"
        onSelect={openPackage}
      />
      <PackageSection
        packages={packages.filter((packageItem) => packageItem.isBestValue)}
        title="Best Value Packages"
        onSelect={openPackage}
      />

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography component="h2" variant="h6">
            Explore By Provider
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {PROVIDERS.map((provider) => (
              <Button
                key={provider}
                onClick={() =>
                  navigate(`${ROUTES.customer.packages}?provider=${provider}`)
                }
                variant="outlined"
              >
                {provider}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Typography component="h2" variant="h6">
            Recent Transactions
          </Typography>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => {
              const packageItem = packagesById.get(transaction.packageId);

              return (
                <Box
                  key={transaction.id}
                  onClick={() =>
                    navigate(ROUTES.customer.transactionViewPath(transaction.id))
                  }
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    cursor: 'pointer',
                    pb: 1,
                  }}
                >
                  <Typography fontWeight={700}>
                    {packageItem?.name ?? transaction.packageId}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {transaction.status} • {formatDate(transaction.createdAt)} •{' '}
                    {formatPrice(transaction.amount)}
                  </Typography>
                </Box>
              );
            })
          ) : (
            <Typography color="text.secondary">No transactions</Typography>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}

function PackageSection({
  title,
  packages,
  onSelect,
}: {
  title: string;
  packages: InternetPackage[];
  onSelect: (packageId: string) => void;
}) {
  return (
    <Stack spacing={2}>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
          },
        }}
      >
        {packages.map((packageItem) => (
          <PackageCard
            key={packageItem.id}
            packageItem={packageItem}
            onSelect={onSelect}
          />
        ))}
      </Box>
    </Stack>
  );
}
