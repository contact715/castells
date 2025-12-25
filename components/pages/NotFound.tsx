import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, FileText, Briefcase, Users, Mail } from 'lucide-react';
import { PageView } from '../../App';
import SEO from '../ui/SEO';
import AnimatedHeading from '../ui/AnimatedHeading';
import { PageHeader } from '../ui/PageHeader';
import type { NavigateFn } from '../../types';

interface NotFoundProps {
  onNavigate?: NavigateFn;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  const handleNavigate = (page: PageView) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.href = '/';
    }
  };

  const popularPages = [
    { name: 'Services', page: 'services' as PageView, icon: Briefcase, description: 'Our marketing services' },
    { name: 'Work', page: 'work' as PageView, icon: FileText, description: 'Case studies & portfolio' },
    { name: 'About', page: 'about' as PageView, icon: Users, description: 'Learn about us' },
    { name: 'Contact', page: 'contact' as PageView, icon: Mail, description: 'Get in touch' },
  ];

  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20 font-sans selection:bg-coral selection:text-white transition-colors duration-500">
      <SEO
        title="404 | Page not found"
        description="The page you're looking for doesn't exist."
        canonical="/404"
        robots="noindex, nofollow"
      />

      <div className="container mx-auto px-6 pt-4 md:pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
              404
            </span>
          </div>

          {/* Main Content Card */}
          <div className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12 lg:p-16 mb-12">
            {/* Large 404 Number */}
            <div className="text-center mb-8">
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="font-display text-[8rem] md:text-[12rem] lg:text-[16rem] font-semibold leading-none text-coral/20 dark:text-coral/10 mb-4"
              >
                404
              </motion.h1>
            </div>

            {/* Heading */}
            <AnimatedHeading
              as="h2"
              className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-4 text-center"
              delay={0.3}
            >
              Page Not Found
            </AnimatedHeading>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-text-secondary text-center mb-8 max-w-2xl mx-auto"
            >
              The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find what you need.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Button
                onClick={() => handleNavigate('home')}
                size="lg"
                variant="primary"
                className="group"
              >
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
              <Button
                onClick={() => window.history.back()}
                size="lg"
                variant="outline"
                className="group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </Button>
            </motion.div>
          </div>

          {/* Popular Pages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <div className="flex items-center gap-2 justify-center mb-3">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Popular Pages
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-text-primary mb-2">
                Or explore these pages
              </h3>
              <p className="text-text-secondary">
                Find what you're looking for on our most popular pages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularPages.map((page, index) => {
                const Icon = page.icon;
                return (
                  <motion.button
                    key={page.name}
                    onClick={() => handleNavigate(page.page)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white dark:bg-surface rounded-[2rem] p-6 hover:-translate-y-1 transition-all duration-300 text-left group"
                  >
                    <div className="w-12 h-12 rounded-[2rem] bg-coral/10 dark:bg-coral/20 flex items-center justify-center mb-4 group-hover:bg-coral dark:group-hover:bg-coral transition-colors">
                      <Icon className="w-6 h-6 text-coral dark:text-coral group-hover:text-white dark:group-hover:text-black transition-colors" />
                    </div>
                    <h4 className="font-display text-xl font-semibold text-text-primary mb-2 group-hover:text-coral transition-colors">
                      {page.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {page.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="bg-black/5 dark:bg-white/5 rounded-[2rem] p-6 md:p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Search className="w-5 h-5 text-coral" />
              <h3 className="font-display text-xl font-semibold text-text-primary">
                Can't find what you're looking for?
              </h3>
            </div>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Try using the search function in the navigation bar or contact us directly for assistance.
            </p>
            <Button
              onClick={() => handleNavigate('contact')}
              size="md"
              variant="outline"
              className="group"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
