import { Alert, Box, CircularProgress, Typography } from '@mui/material';

export function LoadingState() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
      <CircularProgress aria-label="Loading" />
    </Box>
  );
}

export function EmptyState({ message }: { message: string }) {
  return <Typography color="text.secondary">{message}</Typography>;
}

export function ErrorState({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}
