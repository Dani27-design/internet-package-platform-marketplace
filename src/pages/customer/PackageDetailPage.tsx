import { Button, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById } from '../../api/queries';
import { ResponsivePanel } from '../../components/customer/ResponsivePanel';
import { ROUTES } from '../../routes/paths';
import { formatPrice, formatQuota, formatValidity } from '../../utils/formatters';

export function PackageDetailPage() {
  const navigate = useNavigate();
  const { packageId = '' } = useParams();
  const packageQuery = useQuery({
    queryKey: ['package', packageId],
    queryFn: () => getPackageById(packageId),
    enabled: Boolean(packageId),
  });
  const packageItem = packageQuery.data;

  return (
    <ResponsivePanel
      onClose={() => navigate(ROUTES.customer.packages)}
      title="Package Detail"
    >
      {packageItem ? (
        <Stack spacing={2}>
          <Typography color="primary">{packageItem.provider}</Typography>
          <Typography component="h1" variant="h5">
            {packageItem.name}
          </Typography>
          <Typography>
            {formatQuota(packageItem.quota)} • {formatValidity(packageItem.validityDays)}
          </Typography>
          <Stack spacing={0.5}>
            <Typography fontWeight={700}>Benefits</Typography>
            {packageItem.benefits.map((benefit) => (
              <Typography key={benefit} color="text.secondary">
                {benefit}
              </Typography>
            ))}
          </Stack>
          <Typography fontWeight={700}>{formatPrice(packageItem.price)}</Typography>
          <Button
            onClick={() => navigate(ROUTES.customer.checkoutPath(packageItem.id))}
            variant="contained"
          >
            Continue to Checkout
          </Button>
        </Stack>
      ) : (
        <Typography color="text.secondary">Package not found</Typography>
      )}
    </ResponsivePanel>
  );
}
