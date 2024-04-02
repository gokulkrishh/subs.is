import { getUser } from 'app/actions/user';
import AccountCard from 'components/settings/account-card';
import Appearance from 'components/settings/appearance-card';
import CurrencyCard from 'components/settings/currency-card';
import DeleteCard from 'components/settings/delete-card';
import ExportCard from 'components/settings/export-card';

export default async function Page() {
  const user = await getUser();

  return (
    <div className="flex flex-col my-10 gap-2">
      <div className="border-border flex flex-col">
        <h2 className="font-medium mb-2">General</h2>
        <div className="flex gap-4 flex-col">
          <AccountCard user={user} />
          <Appearance />
          <CurrencyCard user={user} />
          <ExportCard user={user} />
        </div>
      </div>
      {user ? (
        <div className="border-border mt-5 pb-24 flex flex-col">
          <h2 className="font-medium mb-2">Danger Zone</h2>
          <div className="flex gap-4 flex-col">
            <DeleteCard />
          </div>
        </div>
      ) : null}
    </div>
  );
}
