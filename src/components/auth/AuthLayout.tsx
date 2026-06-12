import { Box, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { PROVIDERS } from '../../domain/constants';
import { getProviderStyle } from '../../utils/providerStyles';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        background:
          'linear-gradient(135deg, #f8fbff 0%, #fffaf6 48%, #f4fbf8 100%)',
        display: 'flex',
        minHeight: '100dvh',
        overflow: 'hidden',
        px: { xs: 1.5, md: 4 },
        py: { xs: 1.5, md: 5 },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gap: { xs: 1.5, md: 2.5 },
          gridTemplateColumns: { xs: '1fr', md: '0.95fr 0.85fr' },
          maxWidth: 1080,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            background:
              'linear-gradient(135deg, #101827 0%, #173c8c 58%, #ef3b45 135%)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow: '0 28px 80px rgba(15, 23, 42, 0.18)',
            color: '#ffffff',
            display: 'flex',
            minHeight: { xs: 'auto', md: 540 },
            overflow: 'hidden',
            p: { xs: 2, sm: 2.5, md: 4 },
            position: 'relative',
            '&::before': {
              background:
                'repeating-linear-gradient(115deg, rgba(255,255,255,0.10) 0 8px, transparent 8px 42px)',
              content: '""',
              inset: 0,
              opacity: 0.22,
              position: 'absolute',
            },
          }}
        >
          <Stack
            spacing={{ xs: 2, md: 3 }}
            sx={{ justifyContent: 'space-between', width: '100%', zIndex: 1 }}
          >
            <Stack spacing={{ xs: 1.25, sm: 2, md: 3 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box
                  aria-label="Internet Package Marketplace"
                  sx={{
                    alignItems: 'center',
                    background:
                      'linear-gradient(135deg, rgba(20,87,217,0.95), rgba(239,59,69,0.9))',
                    border: '1px solid rgba(255,255,255,0.22)',
                    borderRadius: 2,
                    boxShadow: '0 16px 38px rgba(0,0,0,0.22)',
                    display: 'flex',
                    flex: '0 0 auto',
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    height: 48,
                    justifyContent: 'center',
                    letterSpacing: 0,
                    width: 48,
                  }}
                >
                  net
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '1.05rem', md: '1.3rem' },
                      fontWeight: 950,
                      letterSpacing: 0,
                      lineHeight: 1.15,
                    }}
                  >
                    Internet Package Store
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.68)' }} variant="body2">
                    Data plans from every network
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '2rem', md: '3.5rem' },
                    fontWeight: 950,
                    letterSpacing: 0,
                    lineHeight: 0.98,
                    maxWidth: 560,
                  }}
                >
                  Buy data without guessing.
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.76)',
                    fontSize: { xs: '0.95rem', md: '1.05rem' },
                    lineHeight: 1.65,
                    maxWidth: 540,
                  }}
                >
                  Compare quota, validity, and price across providers before checkout.
                </Typography>
              </Stack>
            </Stack>

            <Box
              sx={{
                display: { xs: 'none', sm: 'grid' },
                gap: 1,
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <Metric label="Networks" value="5" />
              <Metric label="Popular plan" value="40GB" />
              <Metric label="Fast checkout" value="1 min" />
            </Box>

            <Stack spacing={1.25} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 800 }} variant="body2">
                Supported providers
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
                  gridTemplateColumns: {
                    xs: 'repeat(2, minmax(0, 1fr))',
                    sm: 'repeat(5, minmax(0, 1fr))',
                    md: 'repeat(3, minmax(0, 1fr))',
                  },
                }}
              >
                {PROVIDERS.map((provider) => (
                  <ProviderTile key={provider} provider={provider} />
                ))}
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <Box sx={{ alignSelf: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              backdropFilter: 'blur(18px)',
              background: 'rgba(255,255,255,0.86)',
              border: '1px solid rgba(15, 23, 42, 0.10)',
              boxShadow: '0 24px 70px rgba(15, 23, 42, 0.12)',
              p: { xs: 2, sm: 3.5 },
              width: '100%',
            }}
          >
            <Stack spacing={{ xs: 2, sm: 2.5 }}>
              <Stack spacing={0.75}>
                <Typography
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '2.25rem' },
                    fontWeight: 950,
                    letterSpacing: 0,
                    lineHeight: 1.05,
                  }}
                >
                  {title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.55 }}>
                  {subtitle}
                </Typography>
              </Stack>
              {children}
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.14)',
        border: '1px solid rgba(255,255,255,0.18)',
        borderRadius: 2,
        p: { xs: 1, md: 1.25 },
      }}
    >
      <Typography sx={{ color: 'rgba(255,255,255,0.62)', fontWeight: 800 }} variant="caption">
        {label}
      </Typography>
      <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.35rem' }, fontWeight: 950 }}>
        {value}
      </Typography>
    </Box>
  );
}

function ProviderTile({ provider }: { provider: (typeof PROVIDERS)[number] }) {
  const style = getProviderStyle(provider);

  return (
    <Box
      sx={{
        alignItems: 'center',
        background: 'rgba(255,255,255,0.13)',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: 1.5,
        display: 'flex',
        gap: 0.75,
        minHeight: 38,
        px: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: style.accent,
          borderRadius: '50%',
          flex: '0 0 auto',
          height: 9,
          width: 9,
        }}
      />
      <Typography
        sx={{
          color: '#ffffff',
          fontSize: '0.78rem',
          fontWeight: 850,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {provider}
      </Typography>
    </Box>
  );
}
