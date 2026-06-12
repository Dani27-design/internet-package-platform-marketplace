import { Box, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type ReadOnlyDetailProps = {
  title?: string;
  children: ReactNode;
};

export function ReadOnlyDetail({ title, children }: ReadOnlyDetailProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        bgcolor: '#ffffff',
        borderColor: 'rgba(15, 23, 42, 0.08)',
        borderRadius: 2,
        boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
        p: { xs: 1.25, sm: 2 },
      }}
    >
      <Stack spacing={1.25}>
        {title ? (
          <Typography component="h2" variant="h6">
            {title}
          </Typography>
        ) : null}
        {children}
      </Stack>
    </Paper>
  );
}

type DetailFieldProps = {
  label: string;
  value: ReactNode;
};

export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <Box
      sx={{
        bgcolor: '#f8fafc',
        border: 1,
        borderColor: 'rgba(15, 23, 42, 0.06)',
        borderRadius: 1.25,
        minWidth: 0,
        p: 1.25,
      }}
    >
      <Typography color="text.secondary" fontWeight={800} variant="caption">
        {label}
      </Typography>
      <Typography fontWeight={850} sx={{ mt: 0.25, overflowWrap: 'anywhere' }}>
        {value}
      </Typography>
    </Box>
  );
}
