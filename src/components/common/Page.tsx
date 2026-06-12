import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type PageProps = {
  title: string;
  children: ReactNode;
};

export function Page({ title, children }: PageProps) {
  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        {title}
      </Typography>
      {children}
    </Stack>
  );
}

type ResponsiveGridProps = {
  children: ReactNode;
  columns?: {
    sm?: number;
    md?: number;
  };
};

export function ResponsiveGrid({
  children,
  columns = { sm: 2, md: 3 },
}: ResponsiveGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: `repeat(${columns.sm ?? 2}, minmax(0, 1fr))`,
          md: `repeat(${columns.md ?? 3}, minmax(0, 1fr))`,
        },
      }}
    >
      {children}
    </Box>
  );
}
