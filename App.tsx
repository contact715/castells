import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { LazyMotion, domAnimation } from "framer-motion";
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import SEO from './components/ui/SEO';
import SchemaMarkup from './components/ui/SchemaMarkup';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SmoothScroll from './components/effects/SmoothScroll';

import type { NavigationData, PageView } from './types';
export type { PageView } from './types';
import { pathnameFromRoute, routeFromPathname } from './lib/routes';

// Lazy load components for performance
const Hero = React.lazy(() => import('./components/sections/Hero'));
const Services = React.lazy(() => import('./components/sections/Services'));
const Work = React.lazy(() => import('./components/sections/Work'));
const WhyChoose = React.lazy(() => import('./components/sections/WhyChoose'));
const Industries = React.lazy(() => import('./components/sections/Industries'));

const Team = React.lazy(() => import('./components/sections/Team'));

const CTA = React.lazy(() => import('./components/sections/CTA'));
const CasesGrid = React.lazy(() => import('./components/sections/CasesGrid'));
const Process = React.lazy(() => import('./components/sections/Process'));
const FAQ = React.lazy(() => import('./components/sections/FAQ'));
const Blog = React.lazy(() => import('./components/sections/Blog'));

const CaseStudyDetail = React.lazy(() => import('./components/pages/CaseStudyDetail'));
const WorkPage = React.lazy(() => import('./components/pages/WorkPage'));
const AboutPage = React.lazy(() => import('./components/pages/AboutPage'));
const CareersPage = React.lazy(() => import('./components/pages/CareersPage'));
const NotFound = React.lazy(() => import('./components/pages/NotFound'));
const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));
const TeamPage = React.lazy(() => import('./components/pages/TeamPage'));
const BlogPage = React.lazy(() => import('./components/pages/BlogPage'));
const BlogPostDetail = React.lazy(() => import('./components/pages/BlogPostDetail'));
const ServicePage = React.lazy(() => import('./components/pages/ServicePage'));
const IndustryPage = React.lazy(() => import('./components/pages/IndustryPage'));
const AllServicesPage = React.lazy(() => import('./components/pages/AllServicesPage'));
const AllIndustriesPage = React.lazy(() => import('./components/pages/AllIndustriesPage'));
const CompanyPage = React.lazy(() => import('./components/pages/CompanyPage'));
const ThankYouPage = React.lazy(() => import('./components/pages/ThankYouPage'));
// NOTE: keep explicit extensions here to satisfy TS bundler resolution in some setups
const PrivacyPolicyPage = React.lazy(() => import('./components/pages/PrivacyPolicyPage.tsx'));
const TermsOfServicePage = React.lazy(() => import('./components/pages/TermsOfServicePage.tsx'));
const CookiePolicyPage = React.lazy(() => import('./components/pages/CookiePolicyPage.tsx'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-[#191919]">
    <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const initialRoute = routeFromPathname(window.location.pathname);
  const [currentPage, setCurrentPage] = useState<PageView>(initialRoute.page);
  const [selectedProject, setSelectedProject] = useState<NavigationData | null>(initialRoute.data ?? null);


  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);



  const navigateTo = useCallback((page: PageView, data?: NavigationData) => {
    if (data) setSelectedProject(data);
    setCurrentPage(page);

    const nextPath = pathnameFromRoute(page, data);
    if (nextPath && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
  }, []);

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



  return (
    <ErrorBoundary>
      <div className="bg-ivory dark:bg-[#191919] min-h-screen text-text-primary selection:bg-coral selection:text-white font-sans relative">
        <SEO />
        <SchemaMarkup type="Organization" />
        <SchemaMarkup type="WebSite" />
        

        
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-coral focus:text-white focus:rounded-lg focus:font-bold"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        
        <div className="relative z-10">
          <LazyMotion features={domAnimation}>
            {currentPage !== 'not-found' && currentPage !== 'thank-you' && <NavBar onNavigate={navigateTo} />}

            <main id="main-content" role="main">
              <Suspense fallback={<PageLoader />}>
              {currentPage === 'home' && (
                <>
                  <SmoothScroll />
                  <Hero />

                  <Work onNavigate={navigateTo} />
                  <Industries />
                  <WhyChoose />
                  <Services />
                  <Process />

                  <Team onNavigate={navigateTo} />

                  <FAQ />
                  <Blog onNavigate={navigateTo} />
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

            {currentPage !== 'not-found' && currentPage !== 'thank-you' && <Footer onNavigate={navigateTo} />}
          </LazyMotion>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
