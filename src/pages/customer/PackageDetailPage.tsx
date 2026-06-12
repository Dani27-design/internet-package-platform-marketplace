import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById } from '../../api/queries';
import { ResponsivePanel } from '../../components/customer/ResponsivePanel';
import { ROUTES } from '../../routes/paths';
import { formatPrice, formatQuota, formatValidity } from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';

export function PackageDetailPage() {
  const navigate = useNavigate();
  const { packageId = '' } = useParams();
  const packageQuery = useQuery({
    queryKey: ['package', packageId],
    queryFn: () => getPackageById(packageId),
    enabled: Boolean(packageId),
  });
  const packageItem = packageQuery.data;
  const providerStyle = packageItem ? getProviderStyle(packageItem.provider) : null;
  const visibleBenefits = packageItem
    ? packageItem.benefits.filter((benefit) => {
        const normalizedBenefit = benefit.toLowerCase();

        return (
          !normalizedBenefit.includes(formatQuota(packageItem.quota).toLowerCase()) &&
          !normalizedBenefit.includes('validity') &&
          !normalizedBenefit.includes('best value package') &&
          !normalizedBenefit.includes('featured package')
        );
      })
    : [];

  return (
    <ResponsivePanel
      onClose={() => navigate(ROUTES.customer.packages)}
      title="Plan detail"
    >
      {packageItem && providerStyle ? (
        <Stack spacing={{ xs: 2.25, sm: 1.75 }}>
          <Box
            sx={{
              display: 'grid',
              gap: { xs: 1.5, sm: 1.75 },
              gridTemplateColumns: '1fr',
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
                spacing={{ xs: 2, sm: 1.75 }}
                sx={{
                  height: '100%',
                  justifyContent: 'space-between',
                  p: { xs: 2, sm: 2.25 },
                  pl: { xs: 2.5, sm: 2.75 },
                }}
              >
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
                        {packageItem.provider}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        Mobile data plan
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label={packageItem.isBestValue ? 'Best value' : packageItem.isPopular ? 'Popular' : 'Featured'}
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
                    {formatValidity(packageItem.validityDays)} validity
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {visibleBenefits.length > 0 && (
              <Stack spacing={1}>
                <Typography color="#111827" fontWeight={950}>
                  Benefits
                </Typography>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                  {visibleBenefits.map((benefit) => (
                    <Chip
                      key={benefit}
                      label={benefit}
                      sx={{
                        bgcolor: '#f6f8fb',
                        border: 1,
                        borderColor: 'rgba(15, 23, 42, 0.08)',
                        color: '#334155',
                        fontWeight: 800,
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            )}
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
                Total price
              </Typography>
              <Typography color="#111827" fontWeight={950} sx={{ fontSize: '1.35rem', lineHeight: 1.1 }}>
                {formatPrice(packageItem.price)}
              </Typography>
            </Box>
            <Button
              onClick={() => navigate(ROUTES.customer.checkoutPath(packageItem.id))}
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
              Continue to Checkout
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Typography color="text.secondary">Package not found</Typography>
      )}
    </ResponsivePanel>
  );
}
