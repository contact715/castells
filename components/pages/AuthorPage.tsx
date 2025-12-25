import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Linkedin, Twitter, Briefcase, User } from 'lucide-react';
import { Button } from '../ui/Button';
import SEO from '../ui/SEO';
import SchemaMarkup from '../ui/SchemaMarkup';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import AnimatedHeading from '../ui/AnimatedHeading';
import { findAuthorById, type Author } from '../../data/authors';
import { CASE_STUDIES } from '../../constants';
import type { NavigateFn } from '../../types';

interface AuthorPageProps {
  onBack: () => void;
  onNavigate: NavigateFn;
  authorId?: string;
}

const AuthorPage: React.FC<AuthorPageProps> = ({ onBack, onNavigate, authorId }) => {
  const author = authorId ? findAuthorById(authorId) : null;

  if (!author) {
    return (
      <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
        <div className="container mx-auto px-6 pt-4 md:pt-6">
          <div className="text-center">
            <h1 className="font-display text-4xl font-semibold text-text-primary mb-4">Author not found</h1>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const relatedCaseStudies = author.caseStudies
    ? CASE_STUDIES.filter(cs => author.caseStudies?.includes(cs.id))
    : [];

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://castells.agency';

  return (
    <div className="min-h-screen bg-ivory dark:bg-[#191919] pt-16 md:pt-20 pb-20">
      <SEO
        title={`${author.name} | Castells Agency Team`}
        description={author.bio}
        canonical={`/team/${author.id}`}
        keywords={`${author.name}, ${author.role}, Castells Agency team, ${author.expertise.join(', ')}`}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { name: 'Home', item: `${siteUrl}/` },
            { name: 'Team', item: `${siteUrl}/team` },
            { name: author.name, item: `${siteUrl}/team/${author.id}` }
          ]
        }}
      />
      <div className="container mx-auto px-6 pt-4 md:pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', action: () => onNavigate('home') },
            { label: 'Team', action: () => onNavigate('team') },
            { label: author.name }
          ]}
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2rem] overflow-hidden bg-white dark:bg-surface">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                  Team Member
                </span>
              </div>
              <AnimatedHeading
                as="h1"
                className="font-display text-4xl md:text-5xl font-semibold text-text-primary mb-2"
                delay={0.1}
              >
                {author.name}
              </AnimatedHeading>
              <p className="text-xl text-coral font-semibold mb-6">{author.role}</p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {author.twitter && (
                  <a
                    href={author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-coral hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12 mb-8">
            <h2 className="font-display text-2xl font-semibold text-text-primary mb-4">About</h2>
            <p className="text-lg text-text-secondary leading-relaxed">{author.bio}</p>
          </div>

          {/* Expertise */}
          <div className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12 mb-8">
            <h2 className="font-display text-2xl font-semibold text-text-primary mb-6 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-coral" />
              Expertise
            </h2>
            <div className="flex flex-wrap gap-3">
              {author.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-ivory dark:bg-[#191919] rounded-[2rem] text-text-primary font-medium text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <div className="bg-white dark:bg-surface rounded-[2rem] p-8 md:p-12 mb-8">
              <h2 className="font-display text-2xl font-semibold text-text-primary mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-coral" />
                Case Studies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCaseStudies.map((cs) => (
                  <motion.a
                    key={cs.id}
                    href={`/case-studies/${cs.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('case-study', { id: cs.id, name: cs.client });
                    }}
                    className="group relative rounded-[2rem] overflow-hidden hover:-translate-y-1 transition-all"
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={cs.image}
                        alt={cs.client}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
                    </div>
                    <div className="relative p-6 pt-24">
                      <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-coral transition-colors">
                        {cs.client}
                      </h3>
                      <p className="text-sm text-white/70 line-clamp-2">{cs.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center">
            <Button onClick={onBack} variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Team
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthorPage;

