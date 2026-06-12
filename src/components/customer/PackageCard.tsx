import { Box, Button, Card, CardActions, CardContent, Chip, Stack, Typography } from '@mui/material';
import type { InternetPackage } from '../../domain/types';
import { formatPrice, formatQuota, formatValidity } from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';

type PackageCardProps = {
  packageItem: InternetPackage;
  onSelect: (packageId: string) => void;
};

export function PackageCard({ packageItem, onSelect }: PackageCardProps) {
  const providerStyle = getProviderStyle(packageItem.provider);
  const badges = [
    packageItem.isBestValue ? 'Best value' : null,
    packageItem.isPopular ? 'Popular' : null,
    packageItem.isFeatured ? 'Featured' : null,
  ].filter(Boolean) as string[];

  return (
    <Card
      aria-label={packageItem.name}
      variant="outlined"
      sx={{
        background: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        boxShadow: { xs: '0 10px 24px rgba(15, 23, 42, 0.05)', sm: '0 14px 34px rgba(15, 23, 42, 0.06)' },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
        '&:before': {
          bgcolor: providerStyle.accent,
          content: '""',
          height: { xs: 3, sm: 4 },
          left: 0,
          position: 'absolute',
          top: 0,
          width: '100%',
        },
        '&:hover': {
          borderColor: providerStyle.accent,
          boxShadow: '0 24px 56px rgba(15, 23, 42, 0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ flex: 1, p: { xs: 1, sm: 2 } }}>
        <Stack spacing={{ xs: 0.9, sm: 1.75 }}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${providerStyle.accentSoft} 0%, #ffffff 70%)`,
              border: 1,
              borderColor: 'rgba(15, 23, 42, 0.06)',
              borderRadius: { xs: 1.25, sm: 1.5 },
              p: { xs: 0.9, sm: 1.5 },
            }}
          >
            <Stack spacing={{ xs: 0.85, sm: 1.65 }}>
              <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={1}>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Box
                    sx={{
                      alignItems: 'center',
                      bgcolor: providerStyle.accent,
                      borderRadius: 1,
                      color: '#ffffff',
                      display: 'flex',
                      fontSize: { xs: '0.66rem', sm: '0.72rem' },
                      fontWeight: 950,
                      height: { xs: 24, sm: 28 },
                      justifyContent: 'center',
                      width: { xs: 24, sm: 28 },
                    }}
                  >
                    {packageItem.provider.slice(0, 2)}
                  </Box>
                  <Typography color="#111827" fontWeight={900} variant="body2">
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        maxWidth: { xs: 82, sm: 'none' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        verticalAlign: 'bottom',
                        whiteSpace: 'nowrap',
                      }}
                    >
                    {packageItem.provider}
                    </Box>
                  </Typography>
                </Stack>
                <Chip
                  label={badges[0] ?? 'Data plan'}
                  size="small"
                  sx={{
                    bgcolor: '#ffffff',
                    color: providerStyle.accentDark,
                    fontWeight: 900,
                    fontSize: { xs: '0.68rem', sm: '0.8125rem' },
                    height: { xs: 21, sm: 26 },
                    '& .MuiChip-label': {
                      px: { xs: 0.8, sm: 1.1 },
                    },
                  }}
                />
              </Stack>

              <Box>
                <Typography
                  color="text.secondary"
                  fontWeight={800}
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    mb: { xs: 0.35, sm: 0.75 },
                  }}
                  variant="body2"
                >
                  Data package
                </Typography>
                <Typography
                  sx={{
                    color: '#111827',
                    fontSize: { xs: '1.58rem', sm: '2.8rem' },
                    fontWeight: 950,
                    letterSpacing: 0,
                    lineHeight: 0.92,
                  }}
                >
                  {formatQuota(packageItem.quota)}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={1}>
            <Typography
              color="text.secondary"
              fontWeight={800}
              sx={{ fontSize: { xs: '0.72rem', sm: '0.875rem' } }}
              variant="body2"
            >
              {formatValidity(packageItem.validityDays)}
            </Typography>
            <Chip
              label="Mobile data"
              size="small"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                bgcolor: '#f6f8fb',
                color: '#475569',
                fontWeight: 800,
                height: 26,
              }}
            />
          </Stack>

          {badges.length > 1 && (
            <Stack direction="row" spacing={0.75} sx={{ display: { xs: 'none', sm: 'flex' }, flexWrap: 'wrap', gap: 0.75 }}>
              {badges.slice(1).map((badge) => (
                <Chip
                  key={badge}
                  label={badge}
                  size="small"
                  sx={{
                    bgcolor: '#f5f7fb',
                    color: '#475569',
                    fontWeight: 800,
                    maxWidth: '100%',
                    '& .MuiChip-label': {
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    },
                  }}
                />
              ))}
            </Stack>
          )}

          <Box
            sx={{
              borderTop: 1,
              borderColor: 'rgba(15, 23, 42, 0.08)',
              pt: { xs: 0.7, sm: 1.5 },
            }}
          >
            <Typography color="text.secondary" sx={{ fontSize: { xs: '0.72rem', sm: '0.875rem' } }} variant="body2">
              Price
            </Typography>
            <Typography
              sx={{
                color: '#111827',
                fontSize: { xs: '0.98rem', sm: '1.35rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                mt: 0.25,
                overflowWrap: 'anywhere',
              }}
            >
              {formatPrice(packageItem.price)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: { xs: 1, sm: 2.25 }, pb: { xs: 1, sm: 2.25 }, pt: 0 }}>
        <Button
          fullWidth
          onClick={() => onSelect(packageItem.id)}
          size="small"
          sx={{
            bgcolor: '#111827',
            borderRadius: 1.25,
            color: '#ffffff',
            fontWeight: 900,
            minHeight: { xs: 32, sm: 42 },
            '&:hover': {
              bgcolor: providerStyle.accentDark,
            },
          }}
          variant="contained"
        >
          Choose plan
        </Button>
      </CardActions>
    </Card>
  );
}
