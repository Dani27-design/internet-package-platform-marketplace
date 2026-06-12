import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import type { ActivePackage, InternetPackage } from '../../domain/types';
import {
  calculateUsagePercentage,
  formatDate,
  formatPercentage,
  formatQuota,
} from '../../utils/formatters';

type ActivePackageWidgetProps = {
  activePackage: ActivePackage;
  packageItem: InternetPackage;
};

export function ActivePackageWidget({
  activePackage,
  packageItem,
}: ActivePackageWidgetProps) {
  const usagePercentage = calculateUsagePercentage(
    activePackage.totalQuota,
    activePackage.remainingQuota,
  );

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1.5}>
        <Typography component="h2" variant="h6">
          Active Package
        </Typography>
        <Typography fontWeight={700}>{packageItem.name}</Typography>
        <Box>
          <Typography color="text.secondary" variant="body2">
            Remaining Quota
          </Typography>
          <Typography>
            {formatQuota(activePackage.remainingQuota)} /{' '}
            {formatQuota(activePackage.totalQuota)}
          </Typography>
        </Box>
        <Box>
          <LinearProgress
            aria-label="Usage percentage"
            value={usagePercentage}
            variant="determinate"
          />
          <Typography color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
            {formatPercentage(usagePercentage)} used
          </Typography>
        </Box>
        <Box>
          <Typography color="text.secondary" variant="body2">
            Expiry Date
          </Typography>
          <Typography>{formatDate(activePackage.expiryDate)}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
