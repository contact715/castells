import React from 'react';
import { Share2, Facebook, Twitter, Linkedin, Mail, Link2, Check } from 'lucide-react';
import { Button } from './Button';
import { trackOutboundLink } from '../../lib/analytics';

interface ShareButtonsProps {
  url?: string;
  title: string;
  description?: string;
  className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = React.memo(({
  url,
  title,
  description,
  className = '',
}) => {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = description || title;

  const [copied, setCopied] = React.useState(false);

  const handleShare = async (platform: string, shareUrl: string) => {
    trackOutboundLink(shareUrl, platform);
    
    switch (platform) {
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareUrl + '\n\n' + shareText)}`;
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
        break;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-text-secondary dark:text-white/60 mr-2">Share:</span>
      
      <button
        onClick={() => handleShare('facebook', shareUrl)}
        className="p-2 rounded-xl bg-white dark:bg-surface hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Share on Facebook"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4 text-text-primary dark:text-white" />
      </button>

      <button
        onClick={() => handleShare('twitter', shareUrl)}
        className="p-2 rounded-xl bg-white dark:bg-surface hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Share on Twitter"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4 text-text-primary dark:text-white" />
      </button>

      <button
        onClick={() => handleShare('linkedin', shareUrl)}
        className="p-2 rounded-xl bg-white dark:bg-surface hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 text-text-primary dark:text-white" />
      </button>

      <button
        onClick={() => handleShare('email', shareUrl)}
        className="p-2 rounded-xl bg-white dark:bg-surface hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Share via Email"
        title="Share via Email"
      >
        <Mail className="w-4 h-4 text-text-primary dark:text-white" />
      </button>

      <button
        onClick={() => handleShare('copy', shareUrl)}
        className="p-2 rounded-xl bg-white dark:bg-surface hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Copy link"
        title="Copy link"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Link2 className="w-4 h-4 text-text-primary dark:text-white" />
        )}
      </button>
    </div>
  );
});

ShareButtons.displayName = 'ShareButtons';

export default ShareButtons;

