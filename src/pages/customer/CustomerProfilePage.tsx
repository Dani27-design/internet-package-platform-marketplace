import { Paper, Stack, Typography } from '@mui/material';
import { useAuth } from '../../auth/AuthProvider';

export function CustomerProfilePage() {
  const { user } = useAuth();

  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Profile
      </Typography>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Stack spacing={1}>
          <Typography>Name: {user?.name}</Typography>
          <Typography>Email: {user?.email}</Typography>
          <Typography>Phone Number: {user?.phoneNumber}</Typography>
          <Typography>Role: {user?.role}</Typography>
        </Stack>
      </Paper>
    </Stack>
  );
}
