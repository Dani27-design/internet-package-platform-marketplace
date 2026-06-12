import { Alert, Box, Button, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { ROUTES } from '../../routes/paths';

export function RegisterPage() {
  const { registerCustomer } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await registerCustomer({
        name,
        email,
        phoneNumber,
        password,
      });
      navigate(ROUTES.customer.dashboard, { replace: true });
    } catch {
      setError('Customer registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      subtitle="Create a customer profile for faster checkout and purchase tracking."
      title="Create account"
    >
      <Paper sx={notePanelSx} variant="outlined">
        <Typography sx={{ color: '#173c8c', fontWeight: 950 }} variant="body2">
          Customer registration only
        </Typography>
        <Typography color="text.secondary" variant="caption">
          Seller access is managed from the seeded business account.
        </Typography>
      </Paper>

      <Stack component="form" onSubmit={handleSubmit} spacing={1.5}>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <TextField
          autoComplete="name"
          label="Name"
          onChange={(event) => setName(event.target.value)}
          required
          size="small"
          sx={authFieldSx}
          value={name}
        />
        <TextField
          autoComplete="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
          size="small"
          sx={authFieldSx}
          type="email"
          value={email}
        />
        <TextField
          autoComplete="tel"
          label="Phone Number"
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
          size="small"
          sx={authFieldSx}
          value={phoneNumber}
        />
        <TextField
          autoComplete="new-password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          size="small"
          sx={authFieldSx}
          type="password"
          value={password}
        />
        <Button disabled={isSubmitting} size="large" sx={primaryButtonSx} type="submit" variant="contained">
          Create account
        </Button>
      </Stack>
      <Box sx={switchPanelSx}>
        <Typography color="text.secondary" variant="body2">
          Already registered?
        </Typography>
        <Link component={RouterLink} sx={{ fontWeight: 900, textDecoration: 'none' }} to={ROUTES.login}>
          Sign in
        </Link>
      </Box>
    </AuthLayout>
  );
}

const authFieldSx = {
  '& .MuiInputBase-root': {
    bgcolor: '#ffffff',
    borderRadius: 1.5,
    fontWeight: 800,
    minHeight: 46,
  },
  '& .MuiInputBase-input': {
    fontSize: '0.95rem',
  },
};

const primaryButtonSx = {
  bgcolor: '#2f5bd8',
  borderRadius: 1.5,
  boxShadow: '0 14px 30px rgba(47,91,216,0.24)',
  fontWeight: 950,
  minHeight: 48,
  '&:hover': {
    bgcolor: '#244ac4',
  },
};

const notePanelSx = {
  background: 'linear-gradient(135deg, rgba(237,243,255,0.95), rgba(255,255,255,0.88))',
  borderColor: 'rgba(47, 91, 216, 0.16)',
  p: 1.25,
};

const switchPanelSx = {
  alignItems: 'center',
  bgcolor: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(15, 23, 42, 0.08)',
  borderRadius: 1.5,
  display: 'flex',
  justifyContent: 'space-between',
  px: 1.5,
  py: 1.25,
};
