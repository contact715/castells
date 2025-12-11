
import React, { useState, useEffect, Suspense } from 'react';
import { LazyMotion, domMax } from "framer-motion";
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Lazy load components for performance
import Hero from './components/Hero';
const Services = React.lazy(() => import('./components/Services'));
const Work = React.lazy(() => import('./components/Work'));
const WhyChoose = React.lazy(() => import('./components/WhyChoose'));
const Industries = React.lazy(() => import('./components/Industries'));
const TrustedBy = React.lazy(() => import('./components/TrustedBy'));
const Team = React.lazy(() => import('./components/Team'));
const CTA = React.lazy(() => import('./components/CTA'));
const Testimonials = React.lazy(() => import('./components/Testimonials'));
const Process = React.lazy(() => import('./components/Process'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Blog = React.lazy(() => import('./components/Blog'));
const AILab = React.lazy(() => import('./components/AILab'));
const CaseStudyDetail = React.lazy(() => import('./components/CaseStudyDetail'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const CareersPage = React.lazy(() => import('./components/CareersPage'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-ivory dark:bg-black">
    <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export type PageView = 'home' | 'case-study' | 'about' | 'careers' | 'blog' | 'contact';

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
    <LazyMotion features={domMax}>
      <div className="bg-ivory min-h-screen text-text-primary selection:bg-coral selection:text-white font-sans relative">
        <div className="relative z-10">
          <NavBar onNavigate={navigateTo} />

          <main>
            <Suspense fallback={<PageLoader />}>
              {currentPage === 'home' && (
                <>
                  <Hero />
                  <TrustedBy />
                  <Work onNavigate={navigateTo} />
                  <Industries />
                  <WhyChoose />
                  <Services />
                  <Process />
                  <AILab />
                  <Testimonials />
                  <Team />
                  <FAQ />
                  <Blog />
                  <CTA />
                </>
              )}

              {currentPage === 'case-study' && (
                <CaseStudyDetail
                  onBack={() => navigateTo('home')}
                  project={selectedProject}
                />
              )}

              {currentPage === 'about' && (
                <AboutPage onBack={() => navigateTo('home')} />
              )}

              {currentPage === 'careers' && (
                <CareersPage onBack={() => navigateTo('home')} />
              )}
            </Suspense>
          </main>

          <Footer onNavigate={navigateTo} />
        </div>
      </div>
    </LazyMotion>
  );
}

export default App;
