import { Box, Button, Container, Drawer, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { sellerNavigationItems } from '../../routes/navigation';

const drawerWidth = 264;

export function SellerLayout() {
  const { logout, user } = useAuth();

  return (
    <Box
      sx={{
        background:
          'linear-gradient(135deg, #f8fbff 0%, #fffaf6 48%, #f4fbf8 100%)',
        minHeight: '100dvh',
      }}
    >
      <Drawer
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,251,255,0.94) 100%)',
            borderRight: '1px solid rgba(15, 23, 42, 0.08)',
            boxShadow: '18px 0 50px rgba(15, 23, 42, 0.06)',
            boxSizing: 'border-box',
            p: 2,
            width: drawerWidth,
          },
        }}
        variant="permanent"
      >
        <Stack spacing={2.5} sx={{ height: '100%' }}>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                alignItems: 'center',
                background:
                  'linear-gradient(135deg, rgba(20,87,217,0.95), rgba(239,59,69,0.9))',
                borderRadius: 2,
                boxShadow: '0 16px 34px rgba(47,91,216,0.2)',
                color: '#ffffff',
                display: 'flex',
                flex: '0 0 auto',
                fontSize: '0.85rem',
                fontWeight: 950,
                height: 46,
                justifyContent: 'center',
                letterSpacing: 0,
                width: 46,
              }}
            >
              net
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="p"
                sx={{ fontSize: '1.05rem', fontWeight: 950, letterSpacing: 0, lineHeight: 1.1 }}
              >
                Seller Portal
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.25 }} variant="body2">
                {user?.name}
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              background:
                'linear-gradient(135deg, rgba(16,24,39,0.96), rgba(23,60,140,0.9))',
              borderRadius: 2,
              color: '#ffffff',
              overflow: 'hidden',
              p: 1.5,
              position: 'relative',
              '&::before': {
                background:
                  'repeating-linear-gradient(115deg, rgba(255,255,255,0.12) 0 7px, transparent 7px 34px)',
                content: '""',
                inset: 0,
                opacity: 0.22,
                position: 'absolute',
              },
            }}
          >
            <Stack spacing={0.5} sx={{ position: 'relative' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.66)', fontWeight: 800 }} variant="caption">
                Business console
              </Typography>
              <Typography sx={{ fontSize: '1.45rem', fontWeight: 950, lineHeight: 1 }}>
                Monitor sales
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontWeight: 700 }} variant="caption">
                Customers, plans, and purchase status
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={0.75}>
            {sellerNavigationItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                fullWidth
                to={item.path}
                sx={{
                  borderRadius: 2,
                  color: 'text.secondary',
                  fontWeight: 900,
                  justifyContent: 'flex-start',
                  minHeight: 44,
                  px: 1.5,
                  '&.active': {
                    bgcolor: '#2f5bd8',
                    boxShadow: '0 14px 30px rgba(47,91,216,0.22)',
                    color: '#ffffff',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={logout}
            sx={{
              borderColor: 'rgba(15, 23, 42, 0.16)',
              borderRadius: 2,
              color: 'text.primary',
              fontWeight: 900,
              minHeight: 44,
            }}
            variant="outlined"
          >
            Logout
          </Button>
        </Stack>
      </Drawer>

      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(18px)',
          bgcolor: 'rgba(255,255,255,0.86)',
          borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
          display: { xs: 'block', md: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1, md: 1.25 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1, md: 2 }}
            sx={{ alignItems: { xs: 'stretch', md: 'center' } }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', minWidth: 0 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  background:
                    'linear-gradient(135deg, rgba(20,87,217,0.95), rgba(239,59,69,0.9))',
                  borderRadius: 2,
                  boxShadow: '0 14px 30px rgba(47,91,216,0.18)',
                  color: '#ffffff',
                  display: 'flex',
                  flex: '0 0 auto',
                  fontSize: '0.85rem',
                  fontWeight: 950,
                  height: 44,
                  justifyContent: 'center',
                  letterSpacing: 0,
                  width: 44,
                }}
              >
                net
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="p"
                  sx={{
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    fontWeight: 950,
                    letterSpacing: 0,
                    lineHeight: 1.1,
                  }}
                >
                  Seller Portal
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.2 }} variant="body2">
                  {user?.name}
                </Typography>
              </Box>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction="row"
              sx={{
                gap: { xs: 0.75, md: 1 },
                mx: { xs: -1.5, sm: 0 },
                overflowX: { xs: 'auto', md: 'visible' },
                px: { xs: 1.5, sm: 0 },
                scrollbarWidth: 'none',
                whiteSpace: 'nowrap',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {sellerNavigationItems.map((item) => (
                <Button
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    borderRadius: 2,
                    color: 'text.secondary',
                    flex: '0 0 auto',
                    fontWeight: 900,
                    minHeight: 40,
                    px: { xs: 1.75, md: 2 },
                    '&.active': {
                      bgcolor: '#2f5bd8',
                      boxShadow: '0 12px 28px rgba(47,91,216,0.22)',
                      color: '#ffffff',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={logout}
                sx={{
                  borderColor: 'rgba(15, 23, 42, 0.16)',
                  borderRadius: 2,
                  color: 'text.primary',
                  flex: '0 0 auto',
                  fontWeight: 900,
                  minHeight: 40,
                  px: { xs: 1.75, md: 2 },
                }}
                variant="outlined"
              >
                Logout
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ ml: { xs: 0, md: `${drawerWidth}px` } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 1.5, sm: 3 }, py: { xs: 1, md: 0.75 } }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
