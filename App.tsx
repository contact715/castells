import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { LazyMotion, domAnimation } from "framer-motion";
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import SEO from './components/ui/SEO';
import SchemaMarkup from './components/ui/SchemaMarkup';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SmoothScroll from './components/effects/SmoothScroll';
import { LayoutPreloader } from './components/ui/layout-preloader';
import { NavigationData } from './types';

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
const ServicePage = React.lazy(() => import('./components/pages/ServicePage'));
const IndustryPage = React.lazy(() => import('./components/pages/IndustryPage'));
const AllServicesPage = React.lazy(() => import('./components/pages/AllServicesPage'));
const AllIndustriesPage = React.lazy(() => import('./components/pages/AllIndustriesPage'));
const CompanyPage = React.lazy(() => import('./components/pages/CompanyPage'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-[#191919]">
    <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export type PageView = 'home' | 'case-study' | 'work' | 'about' | 'careers' | 'blog' | 'contact' | 'not-found' | 'team' | 'service' | 'industry' | 'services' | 'industries' | 'company';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<NavigationData | null>(null);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Check if preloader was already shown (using sessionStorage)
  useEffect(() => {
    const hasSeenPreloader = sessionStorage.getItem('preloader-shown');
    if (hasSeenPreloader) {
      setIsPreloaderComplete(true);
    }
  }, []);

  const navigateTo = useCallback((page: PageView, data?: NavigationData) => {
    if (data) setSelectedProject(data);
    setCurrentPage(page);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true);
    sessionStorage.setItem('preloader-shown', 'true');
  }, []);

  return (
    <ErrorBoundary>
      <div className="bg-ivory dark:bg-[#191919] min-h-screen text-text-primary selection:bg-coral selection:text-white font-sans relative">
        <SEO />
        <SchemaMarkup type="Organization" />
        <SchemaMarkup type="WebSite" />
        
        {/* Preloader - only show on first visit */}
        {!isPreloaderComplete && (
          <LayoutPreloader onComplete={handlePreloaderComplete} />
        )}
        
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
            {currentPage !== 'not-found' && <NavBar onNavigate={navigateTo} />}

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

                  <Team />

                  <FAQ />
                  <Blog />
                </>
              )}

              {currentPage === 'case-study' && (
                <CaseStudyDetail
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                  project={selectedProject}
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
                <BlogPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'service' && (
                <ServicePage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                  serviceName={selectedProject?.name}
                  serviceId={selectedProject?.id}
                />
              )}

              {currentPage === 'industry' && (
                <IndustryPage
                  onBack={() => navigateTo('home')}
                  onNavigate={navigateTo}
                  industryName={selectedProject?.name}
                  industryId={selectedProject?.id}
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

              {currentPage === 'not-found' && (
                <NotFound />
              )}
            </Suspense>
          </main>

            {currentPage !== 'not-found' && <Footer onNavigate={navigateTo} />}
          </LazyMotion>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
