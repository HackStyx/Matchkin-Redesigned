'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { waitlistSchema, type WaitlistFormValues } from '@/lib/validations';
import { scaleIn, fadeIn } from '@/lib/animations';

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      interest: 'networking'
    }
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit. Please try again.');
      }
      
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-neopop-surface to-neopop-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">Waitlist</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Be among the first to experience the next generation of connection platforms.
          </p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              className="max-w-md mx-auto"
              initial="initial"
              animate="animate"
              exit={{ opacity: 0, y: -20 }}
              variants={scaleIn}
            >
              {error && (
                <motion.div 
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/40 text-white"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="neopop-card p-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      {...register('name')}
                      id="name"
                      className="w-full p-4 bg-neopop-background/80 border border-amber-500/30 text-white rounded-none focus:border-amber-500 transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        className="text-red-400 text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      className="w-full p-4 bg-neopop-background/80 border border-amber-500/30 text-white rounded-none focus:border-amber-500 transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <motion.p
                        className="text-red-400 text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-1">
                      Primary Interest
                    </label>
                    <select
                      {...register('interest')}
                      id="interest"
                      className="w-full p-4 bg-neopop-background/80 border border-amber-500/30 text-white rounded-none focus:border-amber-500 transition-colors"
                    >
                      <option value="networking">Networking</option>
                      <option value="dating">Dating</option>
                      <option value="professional">Professional Growth</option>
                      <option value="social">Social Connections</option>
                    </select>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="neopop"
                    size="lg"
                    disabled={submitting}
                    className="w-full mt-4"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : 'Join Exclusive Waitlist'}
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center max-w-md mx-auto neopop-card p-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success animation */}
              <motion.div
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-10 w-10 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Future!</h3>
              <p className="text-gray-400 mb-6">You've joined an exclusive community of forward-thinkers.</p>
              <Button 
                variant="outline" 
                onClick={() => setSubmitted(false)}
                className="mx-auto"
              >
                Back to Form
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 