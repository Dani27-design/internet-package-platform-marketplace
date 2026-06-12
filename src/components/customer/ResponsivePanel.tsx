import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
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
        fullWidth
        maxWidth="sm"
        onClose={onClose}
        open
      >
        <DialogTitle sx={{ pr: 6 }}>
          <Box id="responsive-panel-title">{title}</Box>
          <Button
            onClick={onClose}
            size="small"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            Close
          </Button>
        </DialogTitle>
        <DialogContent sx={{ pb: 3 }}>{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      ModalProps={{ keepMounted: true }}
      onClose={onClose}
      open
      PaperProps={{
        sx: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          maxHeight: '88vh',
        },
      }}
    >
      <Box sx={{ overflowY: 'auto', p: 2 }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box component="h2" sx={{ fontSize: 20, m: 0 }}>
            {title}
          </Box>
          <Button onClick={onClose} size="small">
            Close
          </Button>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
}
