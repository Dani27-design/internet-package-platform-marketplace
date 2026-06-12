import { Box, Paper, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type ReadOnlyDetailProps = {
  title?: string;
  children: ReactNode;
};

export function ReadOnlyDetail({ title, children }: ReadOnlyDetailProps) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1}>
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
    <Box sx={{ minWidth: 0 }}>
      <Typography color="text.secondary" variant="caption">
        {label}
      </Typography>
      <Typography sx={{ overflowWrap: 'anywhere' }}>{value}</Typography>
    </Box>
  );
}
