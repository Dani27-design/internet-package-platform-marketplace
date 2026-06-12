import { useAuth } from '../../auth/AuthProvider';
import { Page } from '../../components/common/Page';
import { DetailField, ReadOnlyDetail } from '../../components/common/ReadOnlyDetail';

export function CustomerProfilePage() {
  const { user } = useAuth();

  return (
    <Page title="Profile">
      <ReadOnlyDetail>
        <DetailField label="Name:" value={user?.name} />
        <DetailField label="Email:" value={user?.email} />
        <DetailField label="Phone Number:" value={user?.phoneNumber} />
        <DetailField label="Role:" value={user?.role} />
      </ReadOnlyDetail>
    </Page>
  );
}
