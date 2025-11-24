
import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface CareersPageProps {
  onBack: () => void;
}

const OPENINGS = [
  { title: "Senior Performance Marketer", dept: "Growth", loc: "Remote / LA", type: "Full-Time" },
  { title: "Creative Strategist", dept: "Creative", loc: "Santa Monica", type: "Full-Time" },
  { title: "React/Next.js Developer", dept: "Engineering", loc: "Remote", type: "Contract" },
  { title: "Account Executive", dept: "Sales", loc: "New York", type: "Full-Time" },
];

const CareersPage: React.FC<CareersPageProps> = ({ onBack }) => {
  return (
    <div className="bg-ivory min-h-screen pt-32 pb-20 animate-in fade-in duration-500">
      <div className="container mx-auto px-6">
        
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-coral transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back Home
        </button>

        <div className="max-w-4xl mb-24">
            <span className="text-coral font-bold uppercase tracking-widest text-sm mb-4 block">Join the Elite</span>
            <h1 className="font-display text-6xl md:text-8xl font-medium leading-none mb-8">
              Build the Future <br/> of Growth.
            </h1>
            <p className="text-2xl text-text-secondary font-light max-w-2xl">
              We don't hire employees. We hire owners. If you're obsessed with excellence and allergic to average, you belong here.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-5xl">
            {OPENINGS.map((job, i) => (
                <div key={i} className="group bg-white p-8 rounded-2xl border border-black/5 hover:border-coral/50 transition-all duration-300 hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer">
                    <div>
                        <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-coral transition-colors">{job.title}</h3>
                        <div className="flex gap-4 mt-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
                            <span>{job.dept}</span>
                            <span className="w-px h-3 bg-black/20 self-center" />
                            <span>{job.loc}</span>
                            <span className="w-px h-3 bg-black/20 self-center" />
                            <span>{job.type}</span>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text-primary group-hover:translate-x-1 transition-transform">
                            Apply Now <ArrowUpRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            ))}
        </div>
        
        <div className="mt-20 p-12 bg-black text-white rounded-3xl text-center">
            <h3 className="font-display text-3xl font-medium mb-4">Don't see your role?</h3>
            <p className="text-white/60 mb-8">We are always looking for top talent. Send us your portfolio.</p>
            <RippleButton className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase tracking-widest" rippleColor="#000">
                Email Recruiting
            </RippleButton>
        </div>

      </div>
    </div>
  );
};

export default CareersPage;
