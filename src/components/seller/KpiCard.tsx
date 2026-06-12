import { Box, Paper, Stack, Typography } from '@mui/material';

type KpiCardProps = {
  label: string;
  value: string;
  accent?: string;
  helper?: string;
};

export function KpiCard({ label, value, accent = '#2f5bd8', helper }: KpiCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        background: 'rgba(255,255,255,0.86)',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        boxShadow: '0 16px 42px rgba(15, 23, 42, 0.06)',
        overflow: 'hidden',
        p: { xs: 1.5, md: 2 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          bgcolor: accent,
          borderRadius: '999px',
          height: 7,
          left: 16,
          position: 'absolute',
          right: 16,
          top: 0,
        }}
      />
      <Stack spacing={0.75}>
        <Typography color="text.secondary" sx={{ fontWeight: 800 }} variant="body2">
          {label}
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: '1.65rem', md: '1.95rem' },
            fontWeight: 950,
            letterSpacing: 0,
            lineHeight: 1.05,
          }}
        >
          {value}
        </Typography>
        {helper ? (
          <Typography color="text.secondary" sx={{ fontWeight: 700 }} variant="caption">
            {helper}
          </Typography>
        ) : null}
      </Stack>
    </Paper>
  );
}
