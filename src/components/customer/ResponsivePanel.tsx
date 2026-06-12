import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
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
      <Dialog fullWidth maxWidth="sm" onClose={onClose} open>
        <DialogTitle sx={{ pr: 6 }}>
          {title}
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            X
          </IconButton>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer anchor="bottom" onClose={onClose} open>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box component="h2" sx={{ fontSize: 20, m: 0 }}>
            {title}
          </Box>
          <IconButton aria-label="Close" onClick={onClose}>
            X
          </IconButton>
        </Box>
        {children}
      </Box>
    </Drawer>
  );
}
