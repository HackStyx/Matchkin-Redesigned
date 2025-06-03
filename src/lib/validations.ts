import { z } from 'zod';

export const waitlistSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  interest: z.enum(['networking', 'dating', 'professional', 'social'])
});

export type WaitlistFormValues = z.infer<typeof waitlistSchema>; 