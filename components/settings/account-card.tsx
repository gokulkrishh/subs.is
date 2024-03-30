import Image from 'next/image';

import { User } from 'types/data';

import SettingsCard from './settings-card';

// https://stackoverflow.com/a/33919020/266535
const blurDataURL = `data:image/gif;base64,R0lGODlhAQABAPAAABsbG////yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

export default async function AccountCard({ user }: { user: User | null }) {
  return (
    <SettingsCard className="h-[86px] px-3">
      <div className="flex gap-3 w-full items-center">
        <Image
          className="h-12 w-12 rounded-full border border-input"
          src={user?.avatar_url ?? `/images/avatar.svg`}
          alt={user?.full_name ?? 'Demo account'}
          width={100}
          height={100}
          placeholder="blur"
          blurDataURL={blurDataURL}
          style={{ maxWidth: '100%', objectFit: 'fill' }}
        />
        <div className="grid max-w-sm w-full">
          <div className="font-medium truncate pr-4" title={user?.full_name ?? 'Demo account'}>
            {user?.full_name ?? 'Demo account'}
          </div>
          <div className="text-sm truncate pr-4 text-muted-foreground" title={user?.email ?? 'demo@subs.is'}>
            {user?.email ?? 'demo@subs.is'}
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}
