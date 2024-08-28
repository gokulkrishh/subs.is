'use client';

import { useState } from 'react';

import { FeedbackIcon } from 'components/icons';
import Loader from 'components/loader';
import { Button } from 'components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import messages from 'config/messages';
import { cn } from 'lib/utils';
import { toast } from 'sonner';
import { User } from 'types/data';

const feedbackEmojis = ['😞', '🙂', '😁'];

export default function FeedbackModal({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const initial = { emoji: '😁', message: '' };
  const [feedback, setFeedback] = useState(initial);
  const [loading, setLoading] = useState(false);

  if (!user?.email) return null;

  const reset = () => setFeedback(initial);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify(feedback),
      });
      if (!response.ok) {
        throw new Error(messages.feedback.error);
      }
      toast.success(messages.feedback.success);
    } catch (error) {
      toast.error(error?.toString() || messages.feedback.error);
    } finally {
      reset();
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Popover
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (isOpen) {
          reset();
        }
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className="h-8 text-xs px-2 tracking-wide bg-accent/50 dark:bg-accent/60 rounded-md"
        >
          <FeedbackIcon className="h-4 w-4 mr-1.5" /> Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-sm mt-1 max-sm:mr-1 p-0 bg-background rounded-md">
        <form
          className="mt-2 w-full block px-2"
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit();
          }}
        >
          <textarea
            value={feedback.message}
            inputMode="text"
            placeholder="how we can improve?"
            className="flex w-full rounded-md transition-all border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-1.5 h-24"
            maxLength={60}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFeedback({ ...feedback, message: e.target.value })
            }
            required
          />
          <div className="flex justify-between my-2.5 items-center w-full">
            <div className="flex items-center gap-2">
              {feedbackEmojis.map((feedbackEmoji) => (
                <Button
                  type="button"
                  key={feedbackEmoji}
                  onClick={() => setFeedback({ ...feedback, emoji: feedbackEmoji })}
                  className={cn(
                    `text-lg inline-flex items-center justify-center grayscale p-0 w-8 transition-all h-8 bg-accent/50 rounded-full border-0`,
                    {
                      'bg-accent grayscale-0': feedback.emoji === feedbackEmoji,
                    },
                  )}
                  variant={'outline'}
                >
                  <span>{feedbackEmoji}</span>
                </Button>
              ))}
            </div>
            <Button className="min-w-16 h-9 gap-2 p-2 px-3" disabled={loading} type="submit">
              {loading ? <Loader className="dark:text-black text-white h-3.5 w-3.5" /> : null}
              Submit
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
