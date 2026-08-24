import React, { useState, useEffect, Suspense, useCallback, useTransition, useMemo } from 'react';
import { LazyMotion, domAnimation } from "framer-motion";
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import SEO from './components/ui/SEO';
import SchemaMarkup from './components/ui/SchemaMarkup';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SmoothScroll from './components/effects/SmoothScroll';
import LazySection from './components/ui/LazySection';
import Analytics from './components/ui/Analytics';
import SkipToContent from './components/ui/SkipToContent';
import CookieConsent from './components/ui/CookieConsent';
import ReadingProgress from './components/ui/ReadingProgress';
import BackToTop from './components/ui/BackToTop';
import KeyboardShortcuts from './components/ui/KeyboardShortcuts';
import { lazyWithRetry } from './lib/lazyWithRetry';
import { initWebVitals } from './lib/webVitals';
import { initABTesting } from './lib/abTesting';
import { initI18n } from './lib/i18n';

import type { NavigationData, PageView } from './types';
export type { PageView } from './types';
import { pathnameFromRoute, routeFromPathname } from './lib/routes';
import { useScrollTracking } from './lib/hooks/useScrollTracking';
import { useTimeOnPage } from './lib/hooks/useTimeOnPage';

// Lazy load components for performance
const Hero = lazyWithRetry(() => import('./components/sections/Hero'));
const Services = lazyWithRetry(() => import('./components/sections/Services'));
const ServicesConstellation = lazyWithRetry(() => import('./components/sections/ServicesConstellationSection'));
const Work = lazyWithRetry(() => import('./components/sections/Work'));
const Industries = lazyWithRetry(() => import('./components/sections/Industries'));

const Team = lazyWithRetry(() => import('./components/sections/Team'));
const TrustSection = lazyWithRetry(() => import('./components/sections/TrustSection'));

const CTA = lazyWithRetry(() => import('./components/sections/CTA'));
const CasesGrid = lazyWithRetry(() => import('./components/sections/CasesGrid'));
const FAQ = lazyWithRetry(() => import('./components/sections/FAQ'));
const Blog = lazyWithRetry(() => import('./components/sections/Blog'));

const CaseStudyDetail = lazyWithRetry(() => import('./components/pages/CaseStudyDetail'));
const WorkPage = lazyWithRetry(() => import('./components/pages/WorkPage'));
const AboutPage = lazyWithRetry(() => import('./components/pages/AboutPage'));
const CareersPage = lazyWithRetry(() => import('./components/pages/CareersPage'));
const NotFound = lazyWithRetry(() => import('./components/pages/NotFound'));
const ContactPage = lazyWithRetry(() => import('./components/pages/ContactPage'));
const TeamPage = lazyWithRetry(() => import('./components/pages/TeamPage'));
const AuthorPage = lazyWithRetry(() => import('./components/pages/AuthorPage'));
const BlogPage = lazyWithRetry(() => import('./components/pages/BlogPage'));
const BlogPostDetail = lazyWithRetry(() => import('./components/pages/BlogPostDetail'));
const ServicePage = lazyWithRetry(() => import('./components/pages/ServicePage'));
const IndustryPage = lazyWithRetry(() => import('./components/pages/IndustryPage'));
const AllServicesPage = lazyWithRetry(() => import('./components/pages/AllServicesPage'));
const RosevillePage = lazyWithRetry(() => import('./components/pages/RosevillePage'));
const AnswersPage = lazyWithRetry(() => import('./components/pages/AnswersPage'));
const AnswerPage = lazyWithRetry(() => import('./components/pages/AnswerPage'));
const PricingPage = lazyWithRetry(() => import('./components/pages/PricingPage'));
const AllIndustriesPage = lazyWithRetry(() => import('./components/pages/AllIndustriesPage'));
const CompanyPage = lazyWithRetry(() => import('./components/pages/CompanyPage'));
const ThankYouPage = lazyWithRetry(() => import('./components/pages/ThankYouPage'));
// NOTE: keep explicit extensions here to satisfy TS bundler resolution in some setups
const PrivacyPolicyPage = lazyWithRetry(() => import('./components/pages/PrivacyPolicyPage.tsx'));
const TermsOfServicePage = lazyWithRetry(() => import('./components/pages/TermsOfServicePage.tsx'));
const CookiePolicyPage = lazyWithRetry(() => import('./components/pages/CookiePolicyPage.tsx'));
const LeadFormPage = lazyWithRetry(() => import('./components/pages/LeadFormPage'));
const LeadThankYouPage = lazyWithRetry(() => import('./components/pages/LeadThankYouPage'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-[#191919]">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const initialRoute = useMemo(() => routeFromPathname(window.location.pathname), []);
  const [currentPage, setCurrentPage] = useState<PageView>(initialRoute.page);
  const [selectedProject, setSelectedProject] = useState<NavigationData | null>(initialRoute.data ?? null);
  const [isPending, startTransition] = useTransition();

  // Track scroll depth and time on page
  useScrollTracking();
  useTimeOnPage();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const navigateTo = useCallback((page: PageView, data?: NavigationData) => {
    // Use transition for non-critical page changes to keep UI responsive
    startTransition(() => {
      if (data) setSelectedProject(data);
      setCurrentPage(page);

      const nextPath = pathnameFromRoute(page, data);
      if (nextPath && window.location.pathname !== nextPath) {
        window.history.pushState({}, '', nextPath);
      }
    });
  }, [startTransition]);

  // Sync Back/Forward with currentPage
  useEffect(() => {
    const onPopState = () => {
      const route = routeFromPathname(window.location.pathname);
      setCurrentPage(route.page);
      setSelectedProject(route.data ?? null);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Initialize utilities
  useEffect(() => {
    initWebVitals();
    initABTesting();
    initI18n();
  }, []);

  return (
    <ErrorBoundary>
      <Analytics currentPage={currentPage} />
      <div className="bg-ivory dark:bg-[#191919] min-h-screen text-text-primary selection:bg-accent selection:text-white font-sans relative">
        <SEO />
        <SchemaMarkup type="Organization" />
        <SchemaMarkup type="WebSite" />
        

        
        {/* Skip to main content for accessibility */}
        <SkipToContent />
        
        {/* Cookie Consent — hide on standalone pages (lead-form, lead-thank-you) */}
        {currentPage !== 'lead-form' && currentPage !== 'lead-thank-you' && <CookieConsent />}
        
        {/* Reading Progress Bar */}
        <ReadingProgress />
        
        {/* Back to Top Button */}
        <BackToTop />
        
        {/* Keyboard Shortcuts */}
        <KeyboardShortcuts
          onSearchOpen={() => {
            // Trigger search open via global method
            if (typeof window !== 'undefined' && (window as any).__openSearch) {
              (window as any).__openSearch();
            }
          }}
          onHomeNavigate={() => navigateTo('home')}
        />
        
        <div className="relative z-10">
          <LazyMotion features={domAnimation}>
            {currentPage !== 'not-found' && currentPage !== 'thank-you' && currentPage !== 'lead-form' && currentPage !== 'lead-thank-you' && <NavBar onNavigate={navigateTo} />}

            <main id="main-content" role="main">
              <Suspense fallback={<PageLoader />}>
              {currentPage === 'home' && (
                <>
                  <SmoothScroll />
                  <Suspense fallback={<PageLoader />}>
                    <Hero onNavigate={navigateTo} />
                  </Suspense>

                  <Suspense fallback={<PageLoader />}>
                    <Work onNavigate={navigateTo} />
                  </Suspense>
                  <LazySection rootMargin="300px">
                    <Suspense fallback={null}>
                      <TrustSection />
                    </Suspense>
                  </LazySection>
                  <LazySection rootMargin="300px">
                    <Suspense fallback={null}>
                      <Industries />
                    </Suspense>
                  </LazySection>
                  <LazySection rootMargin="300px">
                    <Suspense fallback={null}>
                      <ServicesConstellation onNavigate={navigateTo} />
                    </Suspense>
                  </LazySection>

                  {/* HIDDEN: Team section — uncomment when ready */}
                  {/* <LazySection rootMargin="300px">
                    <Suspense fallback={null}>
                      <Team onNavigate={navigateTo} />
                    </Suspense>
                  </LazySection> */}

                  <LazySection rootMargin="300px">
                    <Suspense fallback={null}>
                      <FAQ />
                    </Suspense>
                  </LazySection>

                  {/* HIDDEN: Blog section — uncomment when ready */}
                  {/* <LazySection rootMargin="300px">
                    <Suspense fallback={null}>
                      <Blog onNavigate={navigateTo} />
                    </Suspense>
                  </LazySection> */}
                </>
              )}

              {currentPage === 'case-study' && (
                <CaseStudyDetail
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                  project={selectedProject?.id != null ? { id: String(selectedProject.id) } : undefined}
                />
              )}

              {currentPage === 'work' && (
                <WorkPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'careers' && (
                <CareersPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'contact' && (
                <ContactPage onNavigate={navigateTo} />
              )}

              {currentPage === 'team' && (
                <TeamPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'author' && (
                <AuthorPage
                  onBack={() => navigateTo('team')}
                  onNavigate={navigateTo}
                  authorId={selectedProject?.id ? String(selectedProject.id) : undefined}
                />
              )}

              {currentPage === 'blog' && (
                <BlogPage onNavigate={navigateTo} />
              )}

              {currentPage === 'blog-post' && (
                <BlogPostDetail
                  onBack={() => navigateTo('blog')}
                  onNavigate={navigateTo}
                  postId={
                    typeof selectedProject?.id === 'number'
                      ? selectedProject.id
                      : selectedProject?.id
                        ? Number(selectedProject.id)
                        : undefined
                  }
                />
              )}

              {currentPage === 'service' && (
                <ServicePage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                  serviceName={selectedProject?.name}
                  serviceId={selectedProject?.id ? String(selectedProject.id) : undefined}
                />
              )}

              {currentPage === 'industry' && (
                <IndustryPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                  industryName={selectedProject?.name}
                  industryId={selectedProject?.id ? String(selectedProject.id) : undefined}
                />
              )}

              {currentPage === 'services' && (
                <AllServicesPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'pricing' && (
                <PricingPage onNavigate={navigateTo} />
              )}

              {currentPage === 'roseville' && (
                <RosevillePage onNavigate={navigateTo} />
              )}

              {currentPage === 'learn' && (
                <AnswersPage onNavigate={navigateTo} />
              )}

              {currentPage === 'answer' && (
                <AnswerPage slug={selectedProject?.id ? String(selectedProject.id) : undefined} onNavigate={navigateTo} />
              )}

              {currentPage === 'industries' && (
                <AllIndustriesPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'company' && (
                <CompanyPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'privacy-policy' && (
                <PrivacyPolicyPage onNavigate={navigateTo} />
              )}

              {currentPage === 'terms' && (
                <TermsOfServicePage onNavigate={navigateTo} />
              )}

              {currentPage === 'cookie-policy' && (
                <CookiePolicyPage onNavigate={navigateTo} />
              )}

              {currentPage === 'lead-form' && (
                <LeadFormPage onNavigate={navigateTo} />
              )}

              {currentPage === 'lead-thank-you' && (
                <LeadThankYouPage />
              )}

              {currentPage === 'thank-you' && (
                <ThankYouPage
                  onNavigate={navigateTo}
                  type={selectedProject?.name as 'contact' | 'newsletter' | 'booking' | 'general'}
                />
              )}

              {currentPage === 'not-found' && (
                <NotFound onNavigate={navigateTo} />
              )}
            </Suspense>
          </main>

            {currentPage !== 'not-found' && currentPage !== 'thank-you' && currentPage !== 'lead-form' && currentPage !== 'lead-thank-you' && <Footer onNavigate={navigateTo} />}
          </LazyMotion>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
