import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { Button } from './Button';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent: React.FC = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      applyCookiePreferences(savedPreferences);
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Enable/disable analytics based on preference
    if (prefs.analytics) {
      // Analytics already loaded in index.html, just ensure it's active
      // You can add logic here to enable/disable GA if needed
    } else {
      // Disable analytics (optional - requires additional implementation)
    }
  };

  const handleAcceptAll = useCallback(() => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    applyCookiePreferences(allAccepted);
    setIsVisible(false);
  }, []);

  const handleAcceptSelected = useCallback(() => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    applyCookiePreferences(preferences);
    setIsVisible(false);
    setShowPreferences(false);
  }, [preferences]);

  const handleRejectAll = useCallback(() => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem('cookie-consent', JSON.stringify(onlyEssential));
    applyCookiePreferences(onlyEssential);
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-surface rounded-[2rem] p-6 md:p-8">
            {!showPreferences ? (
              <>
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center">
                    <Cookie className="w-6 h-6 text-coral" />
                  </div>
                  <div className="flex-1">
                    <h3 id="cookie-consent-title" className="font-display text-xl font-semibold text-text-primary dark:text-white mb-2">
                      We use cookies
                    </h3>
                    <p id="cookie-consent-description" className="text-text-secondary dark:text-white/70 text-sm leading-relaxed">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                      By clicking "Accept All", you consent to our use of cookies.{' '}
                      <a
                        href="/cookie-policy"
                        className="text-coral hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPreferences(true);
                        }}
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
                    aria-label="Close cookie consent"
                  >
                    <X className="w-5 h-5 text-text-secondary" />
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAcceptAll}
                    size="md"
                    className="flex-1"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={() => setShowPreferences(true)}
                    variant="outline"
                    size="md"
                    className="flex-1"
                  >
                    Customize
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    size="md"
                    className="flex-1"
                  >
                    Reject All
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-display text-xl font-semibold text-text-primary dark:text-white mb-4">
                    Cookie Preferences
                  </h3>
                  <div className="space-y-4">
                    {/* Essential Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary dark:text-white mb-1">Essential Cookies</h4>
                        <p className="text-sm text-text-secondary dark:text-white/70">
                          Required for the website to function properly. Cannot be disabled.
                        </p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.essential}
                          disabled
                          className="w-5 h-5 rounded accent-coral cursor-not-allowed"
                          aria-label="Essential cookies (required)"
                        />
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary dark:text-white mb-1">Analytics Cookies</h4>
                        <p className="text-sm text-text-secondary dark:text-white/70">
                          Help us understand how visitors interact with our website.
                        </p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="w-5 h-5 rounded accent-coral cursor-pointer"
                          aria-label="Analytics cookies"
                        />
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-xl bg-black/5 dark:bg-white/5">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary dark:text-white mb-1">Marketing Cookies</h4>
                        <p className="text-sm text-text-secondary dark:text-white/70">
                          Used to deliver personalized ads and track campaign performance.
                        </p>
                      </div>
                      <div className="ml-4">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="w-5 h-5 rounded accent-coral cursor-pointer"
                          aria-label="Marketing cookies"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAcceptSelected}
                    size="md"
                    className="flex-1"
                  >
                    Save Preferences
                  </Button>
                  <Button
                    onClick={() => setShowPreferences(false)}
                    variant="outline"
                    size="md"
                    className="flex-1"
                  >
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CookieConsent.displayName = 'CookieConsent';

export default CookieConsent;

