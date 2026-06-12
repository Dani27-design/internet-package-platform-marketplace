import { Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getPackageById, getTransactionById } from '../../api/queries';
import { ResponsivePanel } from '../../components/customer/ResponsivePanel';
import { TransactionSummary } from '../../components/customer/TransactionSummary';
import { ROUTES } from '../../routes/paths';

export function TransactionViewPage() {
  const navigate = useNavigate();
  const { transactionId = '' } = useParams();
  const transactionQuery = useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: Boolean(transactionId),
  });
  const transaction = transactionQuery.data;
  const packageQuery = useQuery({
    queryKey: ['package', transaction?.packageId],
    queryFn: () => getPackageById(transaction?.packageId ?? ''),
    enabled: Boolean(transaction?.packageId),
  });
  const packageItem = packageQuery.data;

  return (
    <ResponsivePanel
      onClose={() => navigate(ROUTES.customer.transactions)}
      title="Purchase detail"
    >
      {transaction && packageItem ? (
        <TransactionSummary transaction={transaction} packageItem={packageItem} />
      ) : (
        <Typography color="text.secondary">Transaction not found</Typography>
      )}
    </ResponsivePanel>
  );
}
