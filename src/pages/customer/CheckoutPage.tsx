import { Button, Divider, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { createTransaction, getPackageById } from '../../api/queries';
import { useAuth } from '../../auth/AuthProvider';
import { ResponsivePanel } from '../../components/customer/ResponsivePanel';
import { TRANSACTION_STATUSES } from '../../domain/constants';
import { ROUTES } from '../../routes/paths';
import { formatPrice, formatQuota, formatValidity } from '../../utils/formatters';

export function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { packageId = '' } = useParams();
  const packageQuery = useQuery({
    queryKey: ['package', packageId],
    queryFn: () => getPackageById(packageId),
    enabled: Boolean(packageId),
  });
  const packageItem = packageQuery.data;
  const purchaseMutation = useMutation({
    mutationFn: () => {
      if (!user || !packageItem) {
        throw new Error('Checkout requires customer and package');
      }

      return createTransaction({
        customerId: user.id,
        packageId: packageItem.id,
        amount: packageItem.price,
        status: TRANSACTION_STATUSES.success,
        createdAt: new Date().toISOString(),
      });
    },
    onSuccess: (transaction) => {
      queryClient.invalidateQueries({ queryKey: ['customerTransactions', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['transaction', transaction.id] });
      navigate(ROUTES.customer.purchaseSuccessPath(transaction.id));
    },
  });

  return (
    <ResponsivePanel onClose={() => navigate(ROUTES.customer.packages)} title="Checkout">
      {packageItem && user ? (
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography component="h2" variant="h6">
              Package Summary
            </Typography>
            <Typography>{packageItem.name}</Typography>
            <Typography color="text.secondary">
              {packageItem.provider} • {formatQuota(packageItem.quota)} •{' '}
              {formatValidity(packageItem.validityDays)}
            </Typography>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography component="h2" variant="h6">
              Customer Information
            </Typography>
            <Typography>{user.name}</Typography>
            <Typography color="text.secondary">{user.email}</Typography>
            <Typography color="text.secondary">{user.phoneNumber}</Typography>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography component="h2" variant="h6">
              Payment Method
            </Typography>
            <Typography color="text.secondary">Mock Payment Method</Typography>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography component="h2" variant="h6">
              Total Price
            </Typography>
            <Typography fontWeight={700}>{formatPrice(packageItem.price)}</Typography>
          </Stack>
          <Button
            disabled={purchaseMutation.isPending}
            onClick={() => purchaseMutation.mutate()}
            variant="contained"
          >
            Confirm Purchase
          </Button>
        </Stack>
      ) : (
        <Typography color="text.secondary">Checkout package not found</Typography>
      )}
    </ResponsivePanel>
  );
}
