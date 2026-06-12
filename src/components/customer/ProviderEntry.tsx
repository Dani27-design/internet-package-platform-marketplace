import { Box, Button, Stack, Typography } from '@mui/material';
import type { Provider } from '../../domain/types';
import { getProviderStyle } from '../../utils/providerStyles';

type ProviderEntryProps = {
  provider: Provider;
  onSelect: (provider: Provider) => void;
};

export function ProviderEntry({ provider, onSelect }: ProviderEntryProps) {
  const providerStyle = getProviderStyle(provider);

  return (
    <Button
      onClick={() => onSelect(provider)}
      sx={{
        alignItems: 'stretch',
        bgcolor: '#ffffff',
        border: 1,
        borderColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 1,
        boxShadow: 'none',
        color: '#0f172a',
        flex: { xs: '0 0 132px', sm: 'initial' },
        justifyContent: 'flex-start',
        minHeight: { xs: 50, sm: 58 },
        overflow: 'hidden',
        p: 0,
        textAlign: 'left',
        textTransform: 'none',
        transition: 'border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease',
        '&:hover': {
          bgcolor: '#fff',
          borderColor: providerStyle.accent,
          boxShadow: '0 12px 28px rgba(15, 23, 42, 0.08)',
          transform: 'translateY(-1px)',
        },
      }}
      variant="text"
    >
      <Box
        sx={{
          bgcolor: providerStyle.accent,
          flex: { xs: '0 0 5px', sm: '0 0 5px' },
        }}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1.25,
          px: { xs: 1.25, sm: 1.5 },
          py: { xs: 1, sm: 1.25 },
          width: '100%',
        }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <Box
            sx={{
              bgcolor: providerStyle.accent,
              borderRadius: 999,
              boxShadow: `0 0 0 5px ${providerStyle.accentSoft}`,
              flex: { xs: '0 0 9px', sm: '0 0 10px' },
              height: { xs: 9, sm: 10 },
              width: { xs: 9, sm: 10 },
            }}
          />
          <Typography
            fontWeight={900}
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {provider}
          </Typography>
        </Stack>
      </Box>
    </Button>
  );
}
