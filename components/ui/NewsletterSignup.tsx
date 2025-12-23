import React, { useState, useCallback } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { submitContactForm } from '../../lib/api/forms';
import { trackFormSubmit } from '../../lib/analytics';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'inline' | 'modal';
  onSuccess?: () => void;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = React.memo(({
  className = '',
  variant = 'inline',
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      trackFormSubmit('Newsletter Signup', { email });

      // Use contact form API for newsletter
      const result = await submitContactForm({
        name: 'Newsletter Subscriber',
        email,
        topic: 'newsletter',
        message: 'Newsletter subscription request',
      });

      if (result.success) {
        setIsSuccess(true);
        setEmail('');
        onSuccess?.();
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Newsletter subscription error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, onSuccess]);

  if (variant === 'modal') {
    return (
      <div className={`bg-white dark:bg-surface rounded-[2rem] p-8 border border-black/10 dark:border-white/10 ${className}`}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-coral" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-text-primary dark:text-white mb-2">
            Stay Updated
          </h3>
          <p className="text-text-secondary dark:text-white/70">
            Get the latest marketing insights and strategies delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || isSuccess}
            error={error || undefined}
          />

          {isSuccess && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Successfully subscribed!</span>
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Subscribing...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Subscribed!
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <Input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isSubmitting || isSuccess}
        className="flex-1"
        error={error || undefined}
      />
      <Button
        type="submit"
        size="md"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isSuccess ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          'Subscribe'
        )}
      </Button>
    </form>
  );
});

NewsletterSignup.displayName = 'NewsletterSignup';

export default NewsletterSignup;

