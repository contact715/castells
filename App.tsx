import React, { useState, useEffect, Suspense } from 'react';
import { LazyMotion, domAnimation } from "framer-motion";
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';

import SEO from './components/ui/SEO';
import SmoothScroll from './components/effects/SmoothScroll';

// Lazy load components for performance
import Hero from './components/sections/Hero';
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

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-black">
    <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export type PageView = 'home' | 'case-study' | 'work' | 'about' | 'careers' | 'blog' | 'contact' | 'not-found' | 'team' | 'service' | 'industry';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: PageView, data?: any) => {
    if (data) setSelectedProject(data);
    setCurrentPage(page);
  };

  return (
    <div className="bg-ivory min-h-screen text-text-primary selection:bg-coral selection:text-white font-sans relative">
      <SEO />
      <div className="relative z-10">
        <LazyMotion features={domAnimation}>
          {currentPage !== 'not-found' && <NavBar onNavigate={navigateTo} />}

          <main>
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

              {currentPage === 'not-found' && (
                <NotFound />
              )}
            </Suspense>
          </main>

          {currentPage !== 'not-found' && <Footer onNavigate={navigateTo} />}
        </LazyMotion>
      </div>
    </div>
  );
}

export default App;
