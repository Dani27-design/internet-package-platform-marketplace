import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type PageProps = {
  title: string;
  children: ReactNode;
};

export function Page({ title, children }: PageProps) {
  return (
    <Stack spacing={{ xs: 1.75, sm: 3 }}>
      <Typography
        component="h1"
        sx={{
          color: '#0f172a',
          fontSize: { xs: '1.35rem', sm: '1.85rem' },
          fontWeight: 800,
          letterSpacing: 0,
          lineHeight: 1.15,
        }}
      >
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
        display: { xs: 'flex', sm: 'grid' },
        gap: { xs: 1.25, sm: 2 },
        justifyItems: { sm: 'stretch' },
        gridTemplateColumns: {
          sm: `repeat(${columns.sm ?? 2}, minmax(0, 1fr))`,
          md: `repeat(${columns.md ?? 3}, minmax(0, 1fr))`,
        },
        mx: { xs: -1.5, sm: 0 },
        overflowX: { xs: 'auto', sm: 'visible' },
        px: { xs: 2, sm: 0 },
        scrollPaddingLeft: { xs: 16, sm: 0 },
        scrollSnapType: { xs: 'x mandatory', sm: 'none' },
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'contents',
          '& > *': {
            flex: { xs: '0 0 238px', sm: 'initial' },
            scrollSnapAlign: { xs: 'start', sm: 'none' },
            width: { xs: 238, sm: '100%' },
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
