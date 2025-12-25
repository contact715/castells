import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Home, HelpCircle } from 'lucide-react';

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  onSearchOpen?: () => void;
  onHomeNavigate?: () => void;
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = React.memo(({
  onSearchOpen,
  onHomeNavigate,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      // Escape key - close modals/help
      if (e.key === 'Escape') {
        setShowHelp(false);
        // Close any open modals (can be extended)
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach((modal) => {
          (modal as HTMLElement).style.display = 'none';
        });
      }

      // Slash (/) - open search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onSearchOpen?.();
      }

      // Home key - go to home
      if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onHomeNavigate?.();
      }

      // Question mark (?) - show help
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault();
        setShowHelp(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSearchOpen, onHomeNavigate]);

  const shortcuts: Shortcut[] = [
    { key: '/', description: 'Open search', action: () => onSearchOpen?.() },
    { key: 'Esc', description: 'Close modals', action: () => setShowHelp(false) },
    { key: 'Home', description: 'Go to homepage', action: () => onHomeNavigate?.() },
    { key: '?', description: 'Show keyboard shortcuts', action: () => setShowHelp(true) },
  ];

  return (
    <AnimatePresence>
      {showHelp && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowHelp(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-surface rounded-[2rem] p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-coral" />
                  <h2 className="font-display text-2xl font-semibold text-text-primary">
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="text-text-secondary">{shortcut.description}</span>
                    <kbd className="px-3 py-1 bg-black/5 dark:bg-white/5 rounded-lg text-sm font-mono font-semibold text-text-primary">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <p className="text-xs text-text-secondary mt-6 text-center">
                Press <kbd className="px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded text-xs">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

KeyboardShortcuts.displayName = 'KeyboardShortcuts';

export default KeyboardShortcuts;

