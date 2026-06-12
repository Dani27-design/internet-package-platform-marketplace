import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { customerNavigationItems } from '../../routes/navigation';

export function CustomerLayout() {
  const { logout, user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Box
        component="header"
        sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Typography component="p" variant="h6">
                Internet Package Marketplace
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {user?.name}
              </Typography>
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                gap: 1,
                '& .MuiButton-root': {
                  minWidth: { xs: 'calc(50% - 8px)', sm: 'auto' },
                },
              }}
            >
              {customerNavigationItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  size="small"
                  sx={{
                    '&.active': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button onClick={logout} size="small" variant="outlined">
                Logout
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}
