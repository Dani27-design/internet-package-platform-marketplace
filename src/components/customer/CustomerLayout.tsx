import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { customerNavigationItems } from '../../routes/navigation';

export function CustomerLayout() {
  const { logout, user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f4f8ff 0%, #fff7f2 38%, #f8fbf7 72%, #ffffff 100%)',
      }}
    >
      <Box
        component="header"
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(18px)',
          borderBottom: 1,
          borderColor: 'rgba(15, 23, 42, 0.08)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1, sm: 1.5 } }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 3 }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
          >
            <Stack alignItems="center" direction="row" spacing={{ xs: 1, sm: 1.5 }}>
              <Box
                aria-hidden
                sx={{
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #1457d9 0%, #ef4444 100%)',
                  border: '1px solid rgba(15, 23, 42, 0.08)',
                  borderRadius: 1.5,
                  boxShadow: '0 12px 26px rgba(20, 87, 217, 0.22)',
                  color: '#ffffff',
                  display: 'flex',
                  fontSize: { xs: '0.72rem', sm: '0.82rem' },
                  fontWeight: 950,
                  height: { xs: 34, sm: 42 },
                  justifyContent: 'center',
                  letterSpacing: 0,
                  width: { xs: 34, sm: 42 },
                }}
              >
                net
              </Box>
              <Box>
                <Typography
                  component="p"
                  sx={{
                    color: '#111827',
                    fontSize: { xs: '0.95rem', sm: '1.08rem' },
                    fontWeight: 900,
                    letterSpacing: 0,
                    lineHeight: 1.1,
                  }}
                >
                  Internet Package Store
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.78rem', sm: '0.875rem' }, mt: 0.1 }}
                  variant="body2"
                >
                  {user?.name}
                </Typography>
              </Box>
            </Stack>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: { xs: 'nowrap', sm: 'wrap' },
                gap: { xs: 0.5, sm: 1 },
                mx: { xs: -0.25, sm: 0 },
                overflowX: { xs: 'auto', sm: 'visible' },
                pb: { xs: 0.25, sm: 0 },
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                '& .MuiButton-root': {
                  flex: { xs: '0 0 auto', sm: 'initial' },
                  minHeight: { xs: 32, sm: 36 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  borderRadius: { xs: 999, sm: 1.5 },
                  fontWeight: 800,
                  px: { xs: 1.25, sm: 1.5 },
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
                    bgcolor: 'transparent',
                    color: 'text.secondary',
                    '&.active': {
                      bgcolor: '#1457d9',
                      boxShadow: '0 10px 20px rgba(20, 87, 217, 0.20)',
                      color: '#fff',
                    },
                    '&:not(.active):hover': {
                      bgcolor: '#eef2f7',
                      color: '#111827',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={logout}
                size="small"
                sx={{
                  borderColor: 'rgba(15, 23, 42, 0.18)',
                  color: '#111827',
                  bgcolor: '#ffffff',
                  '&:hover': {
                    borderColor: '#111827',
                    bgcolor: '#ffffff',
                  },
                }}
                variant="outlined"
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1.75, sm: 4 } }}>
        <Outlet />
      </Container>
    </Box>
  );
}
