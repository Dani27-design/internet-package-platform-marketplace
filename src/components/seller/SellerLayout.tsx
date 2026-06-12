import { Box, Button, Container, Drawer, Stack, Typography } from '@mui/material';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { sellerNavigationItems } from '../../routes/navigation';

const drawerWidth = 240;

export function SellerLayout() {
  const { logout, user } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Drawer
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            p: 2,
            width: drawerWidth,
          },
        }}
        variant="permanent"
      >
        <Stack spacing={3} sx={{ height: '100%' }}>
          <Box>
            <Typography component="p" variant="h6">
              Seller Portal
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.name}
            </Typography>
          </Box>
          <Stack spacing={1}>
            {sellerNavigationItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                fullWidth
                to={item.path}
                sx={{
                  justifyContent: 'flex-start',
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </Stack>
      </Drawer>

      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Container maxWidth="lg" sx={{ px: 2, py: 2 }}>
          <Stack
            direction="column"
            spacing={2}
            alignItems="stretch"
          >
            <Box>
              <Typography component="p" variant="h6">
                Seller Portal
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
                  minWidth: 'calc(50% - 8px)',
                },
              }}
            >
              {sellerNavigationItems.map((item) => (
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
      <Box sx={{ ml: { xs: 0, md: `${drawerWidth}px` } }}>
        <Container
          maxWidth="lg"
          sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, md: 3 } }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
