import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createTransaction, getPackageById } from '../../api/queries';
import { useAuth } from '../../auth/AuthProvider';
import { ResponsivePanel } from '../../components/customer/ResponsivePanel';
import { TRANSACTION_STATUSES } from '../../domain/constants';
import { ROUTES } from '../../routes/paths';
import { formatPrice, formatQuota, formatValidity } from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';

export function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { packageId = '' } = useParams();
  const packageQuery = useQuery({
    queryKey: ['package', packageId],
    queryFn: () => getPackageById(packageId),
    enabled: Boolean(packageId),
  });
  const packageItem = packageQuery.data;
  const providerStyle = packageItem ? getProviderStyle(packageItem.provider) : null;
  const purchaseMutation = useMutation({
    mutationFn: () => {
      if (!user || !packageItem) {
        throw new Error('Checkout requires customer and package');
      }

      return createTransaction({
        customerId: user.id,
        packageId: packageItem.id,
        amount: packageItem.price,
        status: TRANSACTION_STATUSES.success,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: (transaction) => {
      queryClient.invalidateQueries({ queryKey: ['customerTransactions', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['transaction', transaction.id] });
      navigate(ROUTES.customer.purchaseSuccessPath(transaction.id));
    },
  });

  return (
    <ResponsivePanel onClose={() => navigate(ROUTES.customer.packages)} title="Checkout">
      {packageItem && user && providerStyle ? (
        <Stack spacing={{ xs: 2, sm: 1.75 }}>
          <Box
            aria-label="Package Summary Customer Information Payment Method Total Price"
            sx={{
              display: 'grid',
              gap: { xs: 1.5, sm: 1.75 },
              gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1.08fr) minmax(280px, 0.92fr)' },
            }}
          >
            <Box
              sx={{
                background: `linear-gradient(135deg, ${providerStyle.accentSoft} 0%, #ffffff 72%)`,
                border: 1,
                borderColor: 'rgba(15, 23, 42, 0.08)',
                borderRadius: 2,
                overflow: 'hidden',
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
              <Stack
                spacing={1.75}
                sx={{
                  height: '100%',
                  justifyContent: 'space-between',
                  p: { xs: 2, sm: 2.25 },
                  pl: { xs: 2.5, sm: 2.75 },
                }}
              >
                <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={1.5}>
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
                        {packageItem.provider}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Package Summary
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label={formatValidity(packageItem.validityDays)}
                    size="small"
                    sx={{
                      bgcolor: '#ffffff',
                      color: providerStyle.accentDark,
                      fontWeight: 900,
                    }}
                  />
                </Stack>

                <Box>
                  <Typography color="text.secondary" fontWeight={800} variant="body2">
                    Data package
                  </Typography>
                  <Typography
                    sx={{
                      color: '#111827',
                      fontSize: { xs: '3rem', sm: '3.25rem' },
                      fontWeight: 950,
                      letterSpacing: 0,
                      lineHeight: 0.92,
                      mt: 0.75,
                    }}
                  >
                    {formatQuota(packageItem.quota)}
                  </Typography>
                  <Typography color="text.secondary" fontWeight={800} sx={{ mt: 1 }} variant="body2">
                    {packageItem.name}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Stack spacing={1}>
              <CheckoutInfo
                label="Customer Information"
                primary={user.name}
                secondary={`${user.email} • ${user.phoneNumber}`}
              />
              <CheckoutInfo
                label="Payment Method"
                primary="Mock Payment Method"
                secondary="Demo checkout"
              />
            </Stack>
          </Box>

          <Stack
            alignItems={{ xs: 'stretch', sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            spacing={1.5}
            sx={{
              bgcolor: '#ffffff',
              bottom: -20,
              mx: { xs: -2, sm: -3 },
              mt: { xs: 0.5, sm: 0.25 },
              px: { xs: 2, sm: 3 },
              py: { xs: 2, sm: 1.5 },
              position: 'sticky',
            }}
          >
            <Box>
              <Typography color="text.secondary" fontWeight={800} variant="body2">
                Total Price
              </Typography>
              <Typography color="#111827" fontWeight={950} sx={{ fontSize: '1.35rem', lineHeight: 1.1 }}>
                {formatPrice(packageItem.price)}
              </Typography>
            </Box>
          <Button
            disabled={purchaseMutation.isPending}
            onClick={() => purchaseMutation.mutate()}
              sx={{
                bgcolor: providerStyle.accent,
                borderRadius: 1.5,
                fontWeight: 950,
                minHeight: 48,
                px: 3,
                '&:hover': {
                  bgcolor: providerStyle.accentDark,
                },
              }}
            variant="contained"
          >
            Confirm Purchase
          </Button>
          </Stack>
        </Stack>
      ) : (
        <Typography color="text.secondary">Checkout package not found</Typography>
      )}
    </ResponsivePanel>
  );
}

function CheckoutInfo({
  label,
  primary,
  secondary,
}: {
  label: string;
  primary: string;
  secondary: string;
}) {
  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        border: 1,
        borderColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 1.5,
        p: 1.5,
      }}
    >
      <Typography color="text.secondary" fontWeight={800} variant="body2">
        {label}
      </Typography>
      <Typography color="#111827" fontWeight={950} sx={{ mt: 0.35, overflowWrap: 'anywhere' }}>
        {primary}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.25, overflowWrap: 'anywhere' }} variant="body2">
        {secondary}
      </Typography>
    </Box>
  );
}
