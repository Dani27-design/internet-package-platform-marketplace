import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import type { InternetPackage } from '../../domain/types';
import { formatPrice, formatQuota, formatValidity } from '../../utils/formatters';

type PackageCardProps = {
  packageItem: InternetPackage;
  onSelect: (packageId: string) => void;
};

export function PackageCard({ packageItem, onSelect }: PackageCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography color="primary" variant="body2">
            {packageItem.provider}
          </Typography>
          <Typography component="h3" sx={{ overflowWrap: 'anywhere' }} variant="h6">
            {packageItem.name}
          </Typography>
          <Typography color="text.secondary">
            {formatQuota(packageItem.quota)} • {formatValidity(packageItem.validityDays)}
          </Typography>
          <Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>
            {formatPrice(packageItem.price)}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button onClick={() => onSelect(packageItem.id)} size="small">
          View Detail
        </Button>
      </CardActions>
    </Card>
  );
}
