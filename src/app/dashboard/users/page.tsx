import PageContainer from '@/components/layout/page-container';
import { UsersList } from '@/features/users/components/list-users';

export default function UsersPage() {
  return (
    <PageContainer>
      <UsersList />
    </PageContainer>
  );
}
