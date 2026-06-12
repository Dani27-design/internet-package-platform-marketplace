import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import type { ReactNode } from 'react';

type ResponsivePanelProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function ResponsivePanel({ title, children, onClose }: ResponsivePanelProps) {
  const isDesktop = useMediaQuery('(min-width:600px)');

  if (isDesktop) {
    return (
      <Dialog
        aria-labelledby="responsive-panel-title"
        BackdropProps={{
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.34)',
            backdropFilter: 'blur(1px)',
          },
        }}
        fullWidth
        maxWidth="md"
        onClose={onClose}
        open
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 28px 90px rgba(15, 23, 42, 0.28)',
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={2}>
            <Typography
              component="h2"
              id="responsive-panel-title"
              sx={{
                color: '#111827',
                fontSize: '1.2rem',
                fontWeight: 950,
                lineHeight: 1.15,
              }}
            >
              {title}
            </Typography>
            <Button
              onClick={onClose}
              size="small"
              sx={{
                borderColor: 'rgba(15, 23, 42, 0.14)',
                borderRadius: 999,
                color: '#111827',
                fontWeight: 900,
                minHeight: 34,
                px: 1.5,
              }}
              variant="outlined"
            >
              Close
            </Button>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 2.5 }}>{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      aria-labelledby="responsive-panel-title"
      anchor="bottom"
      ModalProps={{
        keepMounted: true,
        BackdropProps: {
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.18)',
            backdropFilter: 'blur(1px)',
          },
        },
      }}
      onClose={onClose}
      open
      PaperProps={{
        sx: {
          bgcolor: '#ffffff',
          borderTopLeftRadius: { xs: 20, sm: 24 },
          borderTopRightRadius: { xs: 20, sm: 24 },
          boxShadow: '0 -28px 80px rgba(15, 23, 42, 0.24)',
          maxHeight: '90vh',
          overflow: 'hidden',
          width: '100%',
        },
      }}
    >
      <Box data-surface="Dialog Drawer bottom sheet">
        <Stack
          alignItems="center"
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 1.15 },
          }}
        >
          <Box
            aria-hidden
            sx={{
              bgcolor: 'rgba(15, 23, 42, 0.18)',
              borderRadius: 999,
              height: 5,
              mb: { xs: 1.5, sm: 1.1 },
              width: 44,
            }}
          />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ width: '100%' }}
          >
            <Typography
              component="h2"
              id="responsive-panel-title"
              sx={{
                color: '#111827',
                fontSize: { xs: '1.05rem', sm: '1.18rem' },
                fontWeight: 950,
                lineHeight: 1.15,
              }}
            >
              {title}
            </Typography>
            <Button
              onClick={onClose}
              size="small"
              sx={{
                borderColor: 'rgba(15, 23, 42, 0.14)',
                borderRadius: 999,
                color: '#111827',
                fontWeight: 900,
                minHeight: 34,
                px: 1.5,
              }}
              variant="outlined"
            >
              Close
            </Button>
          </Stack>
        </Stack>
        <Box
          sx={{
            maxHeight: 'calc(90vh - 76px)',
            overflowY: 'auto',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Drawer>
  );
}
