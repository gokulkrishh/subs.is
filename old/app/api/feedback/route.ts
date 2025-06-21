import { use } from 'react';

import { NextRequest } from 'next/server';

import { User } from '@supabase/supabase-js';
import messages from 'config/messages';
import { email } from 'config/urls';
import FeedbackEmail from 'emails/feedback';
import { checkAuth } from 'lib/auth';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY ?? '');

export async function POST(request: NextRequest) {
  return await checkAuth(async (user: User) => {
    try {
      const { message, emoji } = await request.json();
      if (!message.length) {
        return new Response(JSON.stringify({ message: messages.feedback.error }), { status: 400 });
      }
      try {
        await resend.emails.send({
          from: email.from,
          to: email.from,
          cc: user.email,
          subject: `New feedback for Subs Tracker `,
          react: FeedbackEmail({ fullName: user.user_metadata.full_name, message, emoji }),
        });
        return new Response(JSON.stringify({ message: messages.feedback.success }), { status: 200 });
      } catch (error: any) {
        throw new Error(error.message);
      }
    } catch {
      return new Response(JSON.stringify({ message: messages.feedback.error }), { status: 500 });
    }
  });
}
