import { Alert, Box, Button, ButtonBase, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { USER_ROLES } from '../../domain/constants';
import { ROUTES } from '../../routes/paths';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await login(email, password);

      if (user.role === USER_ROLES.customer) {
        navigate(ROUTES.customer.dashboard, { replace: true });
      } else {
        navigate(ROUTES.seller.dashboard, { replace: true });
      }
    } catch {
      setError('Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      subtitle="Access your plans, purchases, and provider catalog in one place."
      title="Sign in"
    >
      <Stack component="form" onSubmit={handleSubmit} spacing={1.5}>
        {error ? <Alert severity="error">{error}</Alert> : null}
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
          autoComplete="current-password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          size="small"
          sx={authFieldSx}
          type="password"
          value={password}
        />
        <Button disabled={isSubmitting} size="large" sx={primaryButtonSx} type="submit" variant="contained">
          Sign in
        </Button>
      </Stack>

      <Paper sx={demoPanelSx} variant="outlined">
        <Stack spacing={1.25}>
          <Typography sx={{ fontWeight: 950 }} variant="body2">
            Demo accounts
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            }}
          >
            <DemoAccount
              email="dani@example.com"
              label="Customer"
              password="customer123"
              onUse={() => {
                setEmail('dani@example.com');
                setPassword('customer123');
              }}
            />
            <DemoAccount
              email="seller@example.com"
              label="Seller"
              password="seller123"
              onUse={() => {
                setEmail('seller@example.com');
                setPassword('seller123');
              }}
            />
          </Box>
        </Stack>
      </Paper>

      <Box sx={switchPanelSx}>
        <Typography color="text.secondary" variant="body2">
          New customer?
        </Typography>
        <Link component={RouterLink} sx={{ fontWeight: 900, textDecoration: 'none' }} to={ROUTES.register}>
          Create account
        </Link>
      </Box>
    </AuthLayout>
  );
}

function DemoAccount({
  label,
  email,
  password,
  onUse,
}: {
  label: string;
  email: string;
  password: string;
  onUse: () => void;
}) {
  return (
    <ButtonBase onClick={onUse} sx={demoAccountSx}>
      <Box sx={{ minWidth: 0, textAlign: 'left' }}>
        <Typography sx={{ color: 'text.secondary', fontWeight: 800 }} variant="caption">
          {label}
        </Typography>
        <Typography sx={{ fontWeight: 850, overflowWrap: 'anywhere' }} variant="body2">
          {email}
        </Typography>
        <Typography color="text.secondary" sx={{ overflowWrap: 'anywhere' }} variant="caption">
          {password}
        </Typography>
      </Box>
    </ButtonBase>
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

const demoPanelSx = {
  bgcolor: 'rgba(248, 250, 252, 0.82)',
  borderColor: 'rgba(15, 23, 42, 0.10)',
  p: 1.25,
};

const demoAccountSx = {
  border: '1px solid rgba(15, 23, 42, 0.08)',
  borderRadius: 1.5,
  display: 'block',
  p: 1.25,
  width: '100%',
  '&:hover': {
    bgcolor: '#ffffff',
    borderColor: 'rgba(47, 91, 216, 0.24)',
  },
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
