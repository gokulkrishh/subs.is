'use client';

import { useState } from 'react';

import Loader from 'components/loader';
import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import messages from 'config/messages';
import { cn } from 'lib/utils';
import { toast } from 'sonner';

import { useAuth } from '../context/auth';

const feedbackEmojis = ['😞', '🙂', '😁'];

export default function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({ emoji: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  if (!user) return null;

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
      setFeedback({ emoji: '', message: '' });
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="h-8 bg-accent/80 text-xs px-2 rounded-md">
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm w-[calc(100%-20px)] bg-background rounded-xl">
        <DialogHeader>
          <DialogTitle className="tracking-normal items-center flex-col flex">
            <div className="font-bold flex items-center gap-2 text-primary text-2xl tracking-tight">
              <span className="mt-0.5">Leave Feedback</span>
            </div>
            <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
              Tell us what you liked or how we can improve!
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await onSubmit();
          }}
        >
          <textarea
            value={feedback.message}
            inputMode="text"
            className="flex w-full rounded-md transition-all border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-1.5 h-24"
            maxLength={60}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFeedback({ ...feedback, message: e.target.value })
            }
          />
          <div className="flex my-4 items-center gap-3">
            {feedbackEmojis.map((feedbackEmoji) => (
              <Button
                type="button"
                key={feedbackEmoji}
                onClick={() => setFeedback({ ...feedback, emoji: feedbackEmoji })}
                className={cn(`text-lg p-1 px-3`, {
                  'bg-accent': feedback.emoji === feedbackEmoji,
                })}
                variant={'outline'}
              >
                {feedbackEmoji}
              </Button>
            ))}
          </div>
          <Button
            variant={'outline'}
            disabled={loading || feedback.message?.trim()?.length === 0}
            className={cn(
              `items-center gap-2 mt-2 max-w-sm justify-center hover:text-black active:text-black text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40 hover:bg-primary/90 active:scale-[0.98] rounded-xl bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[42px] w-full`,
              { 'bg-primary/80 cursor-default': loading },
            )}
            type="submit"
          >
            {loading ? <Loader className="text-white dark:text-black" /> : null}
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
