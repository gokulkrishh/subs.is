'use client';

import { updateUserCurrency } from 'app/actions/user';
import { CurrencyComboBox } from 'components/currency-combo';
import { User } from 'types/data';

import SettingsCard from './settings-card';

export default function CurrencyCard({ user }: { user: User | null }) {
  return (
    <SettingsCard className="flex flex-col !p-0">
      <div className="flex flex-col pb-0 w-full p-3 px-4">
        <h3 className="font-medium relative">Default currency</h3>
        <div className="text-sm mt-1 text-muted-foreground">Select your preferred currency to display.</div>
      </div>
      <div className="flex w-full justify-end border-t mt-4 border-border rounded-bl-lg rounded-br-lg p-2 px-3.5">
        <CurrencyComboBox onSelect={updateUserCurrency} user={user} />
      </div>
    </SettingsCard>
  );
}
