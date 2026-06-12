import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCustomerActivePackage,
  getCustomerTransactions,
  getPackages,
} from '../../api/queries';
import { useAuth } from '../../auth/AuthProvider';
import { ResponsiveGrid } from '../../components/common/Page';
import { ActivePackageWidget } from '../../components/customer/ActivePackageWidget';
import { PackageCard } from '../../components/customer/PackageCard';
import { ProviderEntry } from '../../components/customer/ProviderEntry';
import { PROVIDERS } from '../../domain/constants';
import type { InternetPackage, TransactionStatus } from '../../domain/types';
import { ROUTES } from '../../routes/paths';
import { formatDate, formatPrice } from '../../utils/formatters';

export function CustomerDashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const customerId = user?.id ?? '';
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionKey>('bestValue');

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
  const popularPackages = packages.filter((packageItem) => packageItem.isPopular);
  const featuredPackages = packages.filter((packageItem) => packageItem.isFeatured);
  const bestValuePackages = packages.filter((packageItem) => packageItem.isBestValue);
  const packageCollections: Record<CollectionKey, InternetPackage[]> = {
    bestValue: bestValuePackages,
    popular: popularPackages,
    featured: featuredPackages,
  };
  const collectionTabs: Array<{
    key: CollectionKey;
    label: string;
    fullLabel: string;
  }> = [
    { key: 'bestValue', label: 'Best value', fullLabel: 'Best Value Packages' },
    { key: 'popular', label: 'Popular', fullLabel: 'Popular Packages' },
    { key: 'featured', label: 'Featured', fullLabel: 'Featured Packages' },
  ];
  const recommendedPackages = packageCollections[selectedCollection];

  const openPackage = (packageId: string) => {
    navigate(ROUTES.customer.packageDetailPath(packageId));
  };

  return (
    <Stack aria-label="Active Package" spacing={{ xs: 2.25, sm: 4 }}>
        {activePackage && activePackageItem ? (
          <ActivePackageWidget
            activePackage={activePackage}
            packageItem={activePackageItem}
          />
        ) : (
          <Paper
            variant="outlined"
            sx={{
              borderColor: 'rgba(15, 23, 42, 0.14)',
              p: { xs: 2.5, sm: 3 },
            }}
          >
            <Typography component="h2" variant="h6">
              Active Package
            </Typography>
          </Paper>
        )}

        <NextActions
          onBrowsePackages={() => navigate(ROUTES.customer.packages)}
          onBrowseProviders={() =>
            document.getElementById('provider-discovery')?.scrollIntoView()
          }
          onViewTransactions={() => navigate(ROUTES.customer.transactions)}
        />

        <Box aria-label="Popular Packages Featured Packages Best Value Packages">
          <SectionHeader
            action={
              <Button
                onClick={() => navigate(ROUTES.customer.packages)}
                size="small"
                sx={{
                  borderColor: 'rgba(15, 23, 42, 0.16)',
                  borderRadius: 1.5,
                  color: '#111827',
                  fontWeight: 900,
                  minHeight: { xs: 32, sm: 36 },
                  px: { xs: 1.25, sm: 1.75 },
                  '&:hover': {
                    borderColor: '#111827',
                    bgcolor: '#ffffff',
                  },
                }}
                variant="outlined"
              >
                View all plans
              </Button>
            }
            title="Deals for you"
          />
          <Stack spacing={{ xs: 1.25, sm: 2 }}>
            <Box
              sx={{
                bgcolor: '#ffffff',
                border: 1,
                borderColor: 'rgba(15, 23, 42, 0.08)',
                borderRadius: { xs: 1.25, sm: 1.5 },
                boxShadow: { xs: '0 10px 24px rgba(15, 23, 42, 0.04)', sm: '0 14px 32px rgba(15, 23, 42, 0.05)' },
                p: { xs: 0.45, sm: 0.75 },
              }}
            >
              <ToggleButtonGroup
                exclusive
                fullWidth
                onChange={(_, value: CollectionKey | null) => {
                  if (value) {
                    setSelectedCollection(value);
                  }
                }}
                size="small"
                sx={{
                  display: 'grid',
                  gap: { xs: 0.35, sm: 0.75 },
                  gridTemplateColumns: {
                    xs: 'repeat(3, minmax(0, 1fr))',
                    sm: 'repeat(3, minmax(0, 1fr))',
                  },
                  '& .MuiToggleButtonGroup-grouped': {
                    border: 0,
                    borderRadius: 1.5,
                    color: '#64748b',
                    fontSize: { xs: '0.78rem', sm: '0.875rem' },
                    fontWeight: 900,
                    m: 0,
                    minHeight: { xs: 34, sm: 44 },
                    px: { xs: 0.5, sm: 1 },
                    textTransform: 'none',
                  },
                  '& .MuiToggleButton-root.Mui-selected': {
                    bgcolor: '#1457d9',
                    color: '#ffffff',
                    boxShadow: '0 10px 22px rgba(20, 87, 217, 0.18)',
                    '&:hover': {
                      bgcolor: '#1457d9',
                    },
                  },
                  '& .MuiToggleButton-root.Mui-selected.Mui-disabled': {
                    bgcolor: '#1457d9',
                    color: '#ffffff',
                  },
                }}
                value={selectedCollection}
              >
                {collectionTabs.map((tab) => (
                  <ToggleButton
                    key={tab.key}
                    aria-label={tab.fullLabel}
                    value={tab.key}
                  >
                    {tab.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <PlanGrid
              packages={recommendedPackages}
              onSelect={openPackage}
              columns={{ sm: 2, md: recommendedPackages.length > 2 ? 3 : 2 }}
            />
          </Stack>
        </Box>

        <Box id="provider-discovery" aria-label="Explore By Provider">
          <SectionHeader
            action={
              <Button
                onClick={() => navigate(ROUTES.customer.packages)}
                size="small"
                sx={{
                  borderColor: 'rgba(15, 23, 42, 0.16)',
                  borderRadius: 1.5,
                  color: '#111827',
                  fontWeight: 900,
                  minHeight: { xs: 32, sm: 36 },
                  px: { xs: 1.25, sm: 1.75 },
                  '&:hover': {
                    borderColor: '#111827',
                    bgcolor: '#ffffff',
                  },
                }}
                variant="outlined"
              >
                View catalog
              </Button>
            }
            title="Shop by network"
          />
          <Box
            sx={{
              display: { xs: 'flex', sm: 'grid' },
              gap: { xs: 0.9, sm: 1.25 },
              gridTemplateColumns: {
                sm: 'repeat(2, minmax(0, 1fr))',
                lg: 'repeat(5, minmax(0, 1fr))',
              },
              mx: { xs: -1.5, sm: 0 },
              overflowX: { xs: 'auto', sm: 'visible' },
              px: { xs: 2, sm: 0 },
              scrollPaddingLeft: { xs: 16, sm: 0 },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {PROVIDERS.map((provider) => (
              <ProviderEntry
                key={provider}
                onSelect={() =>
                  navigate(`${ROUTES.customer.packages}?provider=${provider}`)
                }
                provider={provider}
              />
            ))}
          </Box>
        </Box>

        <Box aria-label="Recent Transactions">
          <SectionHeader title="Recent purchases" />
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 0.75, sm: 1 },
              gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
            }}
          >
            {recentTransactions.length > 0 ? (
              recentTransactions.map((transaction) => {
                const packageItem = packagesById.get(transaction.packageId);
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
                      bgcolor: '#fff',
                      border: 1,
                      borderColor: 'rgba(15, 23, 42, 0.08)',
                      borderRadius: { xs: 1.25, sm: 1.5 },
                      boxShadow: { xs: '0 8px 20px rgba(15, 23, 42, 0.04)', sm: '0 14px 30px rgba(15, 23, 42, 0.05)' },
                      cursor: 'pointer',
                      p: { xs: 1.25, sm: 2 },
                      transition: 'border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
                      '&:hover': {
                        borderColor: 'rgba(15, 23, 42, 0.22)',
                        boxShadow: '0 20px 38px rgba(15, 23, 42, 0.08)',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Stack spacing={{ xs: 0.65, sm: 1.25 }}>
                      <Stack
                        alignItems="flex-start"
                        direction="row"
                        justifyContent="space-between"
                        spacing={1.5}
                      >
                        <Typography
                          fontWeight={800}
                          sx={{
                            color: '#111827',
                            fontSize: { xs: '0.92rem', sm: '1rem' },
                            overflowWrap: 'anywhere',
                          }}
                        >
                          {packageItem?.name ?? transaction.packageId}
                        </Typography>
                        <Chip
                          label={transaction.status}
                          size="small"
                          sx={{
                            bgcolor: statusStyle.bg,
                            color: statusStyle.color,
                            fontWeight: 800,
                            height: { xs: 24, sm: 26 },
                            textTransform: 'capitalize',
                          }}
                        />
                      </Stack>
                      <Typography
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' } }}
                        variant="body2"
                      >
                        {formatDate(transaction.createdAt)} •{' '}
                        {formatPrice(transaction.amount)}
                      </Typography>
                    </Stack>
                  </Paper>
                );
              })
            ) : (
              <Typography color="text.secondary">No transactions</Typography>
            )}
          </Box>
        </Box>
    </Stack>
  );
}

type CollectionKey = 'popular' | 'featured' | 'bestValue';

function NextActions({
  onBrowsePackages,
  onBrowseProviders,
  onViewTransactions,
}: {
  onBrowsePackages: () => void;
  onBrowseProviders: () => void;
  onViewTransactions: () => void;
}) {
  return (
    <Box aria-label="Quick actions">
      <Box
        sx={{
          display: { xs: 'flex', sm: 'grid' },
          gap: { xs: 0.75, sm: 1 },
          gridTemplateColumns: { sm: 'repeat(3, minmax(0, 1fr))' },
          mx: { xs: -1.5, sm: 0 },
          overflowX: { xs: 'auto', sm: 'visible' },
          px: { xs: 1.5, sm: 0 },
          scrollPaddingLeft: { xs: 12, sm: 0 },
          scrollSnapType: { xs: 'x mandatory', sm: 'none' },
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <ActionCard
          accent="#1457d9"
          background="#edf4ff"
          marker="GB"
          label="Find a plan"
          onClick={onBrowsePackages}
          supportingText="Compare package value"
        />
        <ActionCard
          accent="#ef3b45"
          background="#fff1f2"
          marker="NET"
          label="Provider catalog"
          onClick={onBrowseProviders}
          supportingText="Start from a network"
        />
        <ActionCard
          accent="#0f766e"
          background="#ecfdf5"
          marker="ID"
          label="Purchase activity"
          onClick={onViewTransactions}
          supportingText="Review order status"
        />
      </Box>
    </Box>
  );
}

function ActionCard({
  accent,
  background,
  marker,
  label,
  supportingText,
  onClick,
}: {
  accent: string;
  background: string;
  marker: string;
  label: string;
  supportingText: string;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      sx={{
        alignItems: 'stretch',
        background: `linear-gradient(135deg, #ffffff 0%, ${background} 100%)`,
        border: 1,
        borderColor: 'rgba(15, 23, 42, 0.10)',
        borderRadius: { xs: 1.75, sm: 2.25 },
        boxShadow: '0 12px 28px rgba(15, 23, 42, 0.05)',
        color: '#111827',
        flex: { xs: '0 0 190px', sm: 'initial' },
        justifyContent: 'flex-start',
        minHeight: { xs: 64, sm: 82 },
        overflow: 'hidden',
        p: { xs: 0.65, sm: 1 },
        scrollSnapAlign: { xs: 'start', sm: 'none' },
        textAlign: 'left',
        textTransform: 'none',
        transition: 'border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
        '&:hover': {
          bgcolor: '#ffffff',
          borderColor: accent,
          boxShadow: '0 18px 42px rgba(15, 23, 42, 0.10)',
          transform: 'translateY(-2px)',
        },
      }}
      variant="text"
    >
      <Stack
        alignItems="center"
        direction="row"
        spacing={{ xs: 0.85, sm: 1.35 }}
        sx={{ textAlign: 'left', width: '100%' }}
      >
        <Box
          sx={{
            alignItems: 'center',
            bgcolor: accent,
            borderRadius: { xs: 1.25, sm: 1.75 },
            color: '#ffffff',
            display: 'flex',
            flex: { xs: '0 0 36px', sm: '0 0 48px' },
            fontSize: { xs: '0.68rem', sm: '0.78rem' },
            fontWeight: 950,
            height: { xs: 36, sm: 48 },
            justifyContent: 'center',
            letterSpacing: 0,
            width: { xs: 36, sm: 48 },
          }}
        >
          {marker}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography fontWeight={950} sx={{ fontSize: { xs: '0.86rem', sm: '1rem' }, lineHeight: 1.1, overflowWrap: 'anywhere' }}>
            {label}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              display: { xs: 'none', sm: 'block' },
              lineHeight: 1.25,
              mt: 0.25,
              overflowWrap: 'anywhere',
              fontSize: { xs: '0.76rem', sm: '0.875rem' },
            }}
            variant="body2"
          >
            {supportingText}
          </Typography>
        </Box>
      </Stack>
    </Button>
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

function PlanGrid({
  packages,
  onSelect,
  columns = { sm: 2, md: 3 },
}: {
  packages: InternetPackage[];
  onSelect: (packageId: string) => void;
  columns?: { sm?: number; md?: number };
}) {
  return (
    <>
      {packages.length > 0 ? (
        <ResponsiveGrid columns={columns}>
          {packages.map((packageItem) => (
            <PackageCard
              key={packageItem.id}
              packageItem={packageItem}
              onSelect={onSelect}
            />
          ))}
        </ResponsiveGrid>
      ) : (
        <Typography color="text.secondary">No packages found</Typography>
      )}
    </>
  );
}

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      spacing={1.25}
      sx={{ mb: { xs: 1, sm: 1.75 } }}
    >
      <Typography
        component="h2"
        sx={{
          color: '#111827',
          fontSize: { xs: '1rem', sm: '1.3rem' },
          fontWeight: 950,
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      {action}
    </Stack>
  );
}
