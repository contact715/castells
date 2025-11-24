
import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Services from './components/Services';
import Work from './components/Work';
import Footer from './components/Footer';
import WhyChoose from './components/WhyChoose';
import Industries from './components/Industries';
import Team from './components/Team';
import CTA from './components/CTA';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import AILab from './components/AILab';
import CaseStudyDetail from './components/CaseStudyDetail';
import AboutPage from './components/AboutPage';
import CareersPage from './components/CareersPage';

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
    <div className="bg-ivory min-h-screen text-text-primary selection:bg-coral selection:text-white font-sans relative">
      <div className="relative z-10">
        <NavBar onNavigate={navigateTo} />
        
        <main>
          {currentPage === 'home' && (
            <>
              <Hero />
              <Work onNavigate={navigateTo} />
              <WhyChoose />
              <Process />
              <Industries />
              <Services />
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
        </main>
        
        <Footer onNavigate={navigateTo} />
      </div>
    </div>
  );
}

export default App;
