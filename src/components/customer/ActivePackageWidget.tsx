import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import type { ActivePackage, InternetPackage } from '../../domain/types';
import {
  calculateUsagePercentage,
  formatDate,
  formatPercentage,
  formatQuota,
} from '../../utils/formatters';
import { getProviderStyle } from '../../utils/providerStyles';

type ActivePackageWidgetProps = {
  activePackage: ActivePackage;
  packageItem: InternetPackage;
};

export function ActivePackageWidget({
  activePackage,
  packageItem,
}: ActivePackageWidgetProps) {
  const usagePercentage = calculateUsagePercentage(
    activePackage.totalQuota,
    activePackage.remainingQuota,
  );
  const providerStyle = getProviderStyle(packageItem.provider);

  return (
    <Paper
      variant="outlined"
      sx={{
        background:
          `linear-gradient(135deg, #111827 0%, #18243a 48%, ${providerStyle.accentDark} 130%)`,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 26px 72px rgba(15, 23, 42, 0.22)',
        overflow: 'hidden',
        position: 'relative',
        '&:before': {
          background:
            'linear-gradient(120deg, transparent 0 54%, rgba(255,255,255,0.08) 54% 62%, transparent 62% 100%)',
          backgroundSize: '72px 72px',
          content: '""',
          inset: 0,
          opacity: 0.6,
          pointerEvents: 'none',
          position: 'absolute',
        },
        '&:after': {
          background: `linear-gradient(90deg, ${providerStyle.accent} 0%, #ffffff 45%, #22c55e 100%)`,
          bottom: 0,
          content: '""',
          height: 5,
          left: 0,
          position: 'absolute',
          right: 0,
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.35fr) minmax(280px, 0.65fr)' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            p: { xs: 2.25, sm: 3 },
            position: 'relative',
          }}
        >
          <Stack spacing={3.25} sx={{ height: '100%', justifyContent: 'space-between' }}>
            <Box>
              <Stack alignItems="center" direction="row" spacing={1.25} sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.10)',
                    borderRadius: 999,
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 900,
                    px: 1.25,
                    py: 0.45,
                  }}
                >
                  My package
                </Typography>
                <Typography color="rgba(255,255,255,0.62)" fontWeight={800} variant="body2">
                  {packageItem.provider}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: { xs: '1.85rem', sm: '2.4rem' },
                  fontWeight: 950,
                  lineHeight: 1,
                  overflowWrap: 'anywhere',
                }}
              >
                {packageItem.name}
              </Typography>
              <Typography color="rgba(255,255,255,0.62)" sx={{ mt: 1 }} variant="body2">
                Ready for browsing, streaming, and daily apps
              </Typography>
            </Box>

            <Box>
              <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 1 }}>
                <Typography color="rgba(255,255,255,0.62)" fontWeight={800} variant="body2">
                  Usage
                </Typography>
                <Typography color="#ffffff" fontWeight={900} variant="body2">
                  {formatPercentage(usagePercentage)} used
                </Typography>
              </Stack>
              <LinearProgress
                aria-label="Usage percentage"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.14)',
                  borderRadius: 999,
                  height: 9,
                  '& .MuiLinearProgress-bar': {
                    bgcolor: providerStyle.accent,
                    borderRadius: 999,
                  },
                }}
                value={usagePercentage}
                variant="determinate"
              />
            </Box>
          </Stack>
        </Box>

        <Box
          sx={{
            borderLeft: { md: 1 },
            borderTop: { xs: 1, md: 0 },
            borderColor: 'rgba(255,255,255,0.10)',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(12px)',
            p: { xs: 2.25, sm: 3 },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: 1.25,
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              height: '100%',
              alignContent: 'center',
            }}
          >
            <Box
              sx={{
                background: 'rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(18px)',
                border: 1,
                borderColor: 'rgba(255, 255, 255, 0.18)',
                borderRadius: 1.75,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
                gridColumn: '1 / -1',
                p: 1.75,
              }}
            >
              <Typography color="rgba(255,255,255,0.68)" fontWeight={800} variant="body2">
                Remaining quota
              </Typography>
              <Typography
                sx={{
                  color: '#ffffff',
                  fontSize: { xs: '2rem', sm: '2.35rem' },
                  fontWeight: 950,
                  lineHeight: 1,
                  mt: 0.5,
                }}
              >
                {formatQuota(activePackage.remainingQuota)}
              </Typography>
            </Box>

            <PlanMeta label="Total quota" value={formatQuota(activePackage.totalQuota)} />
            <PlanMeta label="Valid until" value={formatDate(activePackage.expiryDate)} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

function PlanMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Box
      sx={{
        background: 'rgba(255, 255, 255, 0.16)',
        backdropFilter: 'blur(18px)',
        border: 1,
        borderColor: 'rgba(255, 255, 255, 0.18)',
        borderRadius: 1.75,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
        minWidth: 0,
        p: 1.5,
      }}
    >
      <Typography color="rgba(255,255,255,0.68)" fontWeight={800} variant="body2">
        {label}
      </Typography>
      <Typography
        color="#ffffff"
        fontWeight={900}
        sx={{
          fontSize: { xs: '1.05rem', sm: '1.15rem' },
          lineHeight: 1.1,
          mt: 0.55,
          overflowWrap: 'anywhere',
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
