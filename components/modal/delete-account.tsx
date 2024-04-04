import { SyntheticEvent, useState } from 'react';

import Loader from 'components/loader';
import { Button } from 'components/ui/button';
import { Dialog, DialogContent } from 'components/ui/dialog';
import { Input } from 'components/ui/input';

type DeleteAccountModalProps = {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (emailId: string) => void;
  emailId: string;
};

export default function DeleteAccountModal({ open, setOpen, onSubmit, loading, emailId }: DeleteAccountModalProps) {
  const [email, setEmail] = useState('');
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-md p-4 max-sm:w-[calc(100%-30px)]">
        <h3 className="font-medium !space-y-0">Delete Your Account</h3>
        <div className="text-sm text-muted-foreground !space-y-0">
          Type this account email to delete your account and its data.
        </div>
        <form
          className="mt-1.5"
          onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (email === emailId) {
              onSubmit(email);
            }
          }}
        >
          <Input
            autoComplete="off"
            id="name"
            type="email"
            placeholder="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            className="h-11"
            inputMode="email"
            value={email}
            required
            data-1p-ignore
          />

          <div className="flex justify-end mt-4">
            <Button
              className="gap-2 font-normal"
              variant={'destructive'}
              type="submit"
              disabled={email !== emailId || loading}
            >
              {loading ? <Loader className="w-4 h-4 !text-white" /> : null} Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
