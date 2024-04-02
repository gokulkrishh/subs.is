import { ThemeToggle } from 'components/theme-toggle';

import SettingsCard from './settings-card';

export default async function Appearance() {
  return (
    <SettingsCard className="flex flex-col !p-0">
      <div className="flex flex-col pb-0 w-full p-3 px-4">
        <h3 className="font-medium relative">Appearance</h3>
        <div className="text-sm mt-1 text-muted-foreground">Change how this app looks and feels.</div>
      </div>
      <div className="flex w-full justify-end border-t mt-4 border-border rounded-bl-lg rounded-br-lg p-2 px-3.5">
        <ThemeToggle />
      </div>
    </SettingsCard>
  );
}
